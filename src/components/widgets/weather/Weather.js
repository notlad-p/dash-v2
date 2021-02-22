import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { motion } from 'framer-motion';
import styled, { ThemeContext } from 'styled-components';
import { Location } from '@styled-icons/ionicons-outline/Location';
import { ArrowForward } from '@styled-icons/material-rounded/ArrowForward';
import Lockr from 'lockr';
import Widget from '../Widget';
import WeatherIcons from  './WeatherIcons';

const WeatherWidget = styled(Widget)`
  flex-direction: column;
`;

const CityForm = styled.form`
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 5px;
`;

const CityInput = styled.input`
  height: 100%;
  width: 80%;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  color: ${({ theme }) => theme.color};
  border: none;
  font-size: 1rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color};
  }
`;

const CityArrowContainer = styled(motion.button)`
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 20%;
  border-radius: 5px;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  cursor: pointer;
`;

const CityArrow = styled(ArrowForward)`
  color: ${({ theme }) => theme.color};
`;

const CurrentLocation = styled(motion.div)`
  width: 80%;
  height: 40px; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 8px;
  border-radius: 5px;
  color: ${({ theme }) => theme.color};
  cursor: pointer;

  & p {
    width: 77.5%;
    padding: 8px;
  }
`;

const LocationIcon = styled(Location)`
  color: ${({ theme }) => theme.color};
  width: 22.5%;
`;

const CityHeading = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.color};
  font-size: 2rem;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 55%;
`;

const TempIconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100px;
`;

const Temperature = styled.p`
  position: relative;
  margin: 0;
  color: ${({ theme }) => theme.color};
  font-size: 1.5rem;

  & span {
    position: absolute;
    top: 2px;
    right: -16px;
    font-size: 1rem;
  }
`;

const LoadAnimation = styled(motion.div)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;

  & div {
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.color};
    border-radius: 100%;
  }
`;

const loadAnimationVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2
    },
  },
}

const loadCircleTransition = {
  duration: 0.5,
  yoyo: Infinity,
  ease: 'easeInOut',
}

const loadCircleVariants = {
  start: {
    y: '0%',
  }, 
  end: {
    y: '100%',
  },
}

const useFetch = (url, display) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState(undefined);

  console.log(status);

  // initial weather api fetch
  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setStatus('fetching');

      const response = await fetch(url);

      const data = await response.json();
      setData(data);
      console.log(data);
      setStatus('fetched');
    }

    fetchData();
  }, [url]);
    
  // setInterval to check if weather has been updated in the last 15mins
  useEffect(() => {
    const updateInterval = setInterval(() => {
      console.log('check api time diff')
      const apiTime = Lockr.get(`currentWeather-apiTime`, undefined);
      const timeDiff = apiTime && Math.round((Date.now() - apiTime) / 1000);

      // set url to city by default
      const city = Lockr.get(`city-${display}`, undefined);
      const defaultUrl = url ?  url : `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=42ebabdd4868e27ab24302546199950b`;

      const fetchData = async () => {
        setStatus('fetching');
  
        const response = await fetch(defaultUrl);
  
        const data = await response.json();
        setData(data);
        console.log(data);
        setStatus('fetched');
      }

      if(timeDiff >= 900) {
        console.log('update weather');
        fetchData();
        Lockr.set('currentWeather-apiTime', Date.now());
      }

    }, 10000);

    return () => {
      clearInterval(updateInterval);
    }
  });

  return { status, data };
}

// USE PRCESS.ENV FOR API KEY

// FIX USEEFFECT MISSING DEPENDENCIES

// -------------------------
// FIX API CALL EVERY 15MINS
// -------------------------

// remove state in display?

// USE LOADING ANIMATION FOR WEATHER FETCH
  // https://www.robinwieruch.de/react-hooks-fetch-data


const Weather = () => {
  const [display] = useState(parseInt(_.uniqueId(), 10) / 2);
  // const [weatherData, setWeatherData] = useState({
  //   city: Lockr.get(`city-${display}`, undefined),
  //   temp: Lockr.get(`temp-${display}`, undefined),
  //   icon: Lockr.get(`icon-${display}`, undefined),
  // });
  const [weatherData, setWeatherData] = useState(Lockr.get(`currentWeather-${display}`, undefined));
  const [city, setCity] = useState('');
  // if geolocation true
    // use lat and long
  // else use city
  const [url, setUrl] = useState();

  const theme = useContext(ThemeContext);

  // use status in return - 
    //idle for inputs, fetching for load, fetched for data render
  // use data for weatherData state & LS values
  // setInterval using apiTime state
  const geoLocation = Lockr.get(`geoLocation-${display}`);
  const { status, data } = useFetch(url, geoLocation, display);

  useEffect(() => {
    const renderWeatherData = () => {
      if (!data) return;
      // update weatherData state
      setWeatherData({
        city: data.name,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon,
      });

      // Set LS values
      // Lockr.set(`currentWeather-apiTime`, Date.now());
      // Lockr.set(`city-${display}`, data.name);
      // Lockr.set(`temp-${display}`, Math.round(data.main.temp));
      // Lockr.set(`icon-${display}`, data.weather[0].icon);
      Lockr.set(`currentWeather-${display}`, {
        city: data.name,
        temp: Math.round(data.main.temp),
        icon: data.weather[0].icon,
      });
      // Lockr.set(`currentWeather-${display}`, {
      //   city: data.name,
      //   temp: Math.round(data.main.temp),
      //   icon: data.weather[0].icon,
      // });
      console.log('updated weather')
    }

    renderWeatherData();
  }, [data]);

  function getGeolocation() {
    navigator.permissions.query({
      name: 'geolocation'
    }).then((result) => { 
      if (result.state === 'denied') {
        alert('Enable location permission to use current location');
      }
    });

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // get coords
        const long = position.coords.longitude;
        const lat = position.coords.latitude;

        Lockr.set(`geoLocation-${display}`, true);

        // use coords in api link state
        setUrl(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=42ebabdd4868e27ab24302546199950b`);
      });
    }
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleCitySubmit = (e) => {
    e.preventDefault();
    if(city === '') return;
    setUrl(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=42ebabdd4868e27ab24302546199950b`);
  }

  return (
    <WeatherWidget>
      {
        status === 'fetching' ?
        <LoadAnimation
          variants={loadAnimationVariants}
          initial='start'
          animate='end'
        >
          <motion.div 
            variants={loadCircleVariants}
            transition={loadCircleTransition}
          />
          <motion.div 
            variants={loadCircleVariants}
            transition={loadCircleTransition}
          />
          <motion.div 
            variants={loadCircleVariants}
            transition={loadCircleTransition}
          />
        </LoadAnimation> :
        weatherData ? 
        <WeatherContainer>
          <CityHeading>{weatherData.city}</CityHeading>
          <TempIconContainer>
            <Temperature>{weatherData.temp}<span>&#176;F</span></Temperature>
            <WeatherIcons icon={weatherData.icon} />
          </TempIconContainer>
        </WeatherContainer> :
        <>
          <CityForm
            onSubmit={handleCitySubmit}
          >
            <CityInput 
              type='text' 
              placeholder='Enter a city' 
              onChange={handleCityChange}
              value={city}
            />
            <CityArrowContainer 
              type='submit'
              whileHover={{
                backgroundColor: theme.highlight,
              }}
              whileTap={{
                scale: .95,
              }}
            >
              <CityArrow size='24' />
            </CityArrowContainer>
          </CityForm>
          <CurrentLocation
            onClick={() => getGeolocation()} // handleLocationClick
            whileHover={{
              backgroundColor: theme.highlight,
            }}
            whileTap={{
              scale: .95,
            }}
          >
            <p>Use current location</p>
            <LocationIcon size='30' />
          </CurrentLocation>
        </>
      }
    </WeatherWidget>
  )
};

export default Weather;