import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Snow } from '@styled-icons/ionicons-outline/Snow'
import { WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy, WiCloud, WiShowers, WiDayStormShowers, WiNightAltStormShowers, WiFog } from 'weather-icons-react';

const WeatherIcons = ({ icon }) => {
  const theme = useContext(ThemeContext);
  const color = theme.color;

  let WeatherIcon;

  switch (icon) {
    case '01d':
      WeatherIcon = <WiDaySunny size={45} color={color} />
      break;
    case '01n':
      WeatherIcon = <WiNightClear size={45} color={color} />
      break;
    case '02d':
      WeatherIcon = <WiDayCloudy size={45} color={color} />
      break
    case '02n':
      WeatherIcon = <WiNightAltCloudy size={45} color={color} />
      break
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      WeatherIcon = <WiCloud size={45} color={color} />
      break
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      WeatherIcon = <WiShowers size={45} color={color} />
      break
    case '11d':
      WeatherIcon = <WiDayStormShowers size={45} color={color} />
      break
    case '11n':
      WeatherIcon = <WiNightAltStormShowers size={45} color={color} />
      break
    case '13d':
    case '13n':
      WeatherIcon = <Snow size={28} color={color} />
      break
    case '50d':
    case '50n':
      WeatherIcon = <WiFog size={45} color={color} />
      break
    default: 
      WeatherIcon = null
  };

  return WeatherIcon;
}

export default WeatherIcons;