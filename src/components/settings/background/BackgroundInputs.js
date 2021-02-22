import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lockr from 'lockr';
import _ from 'lodash';
import { ChromePicker,  } from 'react-color'
import backgroundData from '../../../data/backgroundData';

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  height: auto;
  margin-top: 16px;
  color: ${({ theme }) => theme.color};
`;

const ColorBlock = styled.div.attrs(props => ({
  style: {
    backgroundColor: props.backgroundColor
  }
}))`
  height: 24px;
  width: 95%;
  border: 1px solid ${({ theme }) => theme.color};
`;

//background-color: ${props => props.backgroundColor};


const ColorPickerContainer = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  right: -30px;
  display: ${props => props.show ? 'block' : 'none'};
  padding: 30px;
  z-index: 2;
`

// add gear background detection
  // detect background color for background overlay
    //window.VANTA.current.options.backgroundColor
    // google background detect javascript

// background & inputs animate on mount / unmount

const Input = ({ type, name, value, min, max, step, onColorChange, onRangeChange, onRangeMouseUp, onCheckClick, onSelectChange }) => {

  const [colorValue, setColorValue] = useState(value);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setColorValue(value)
  }, [value]);

  const formatedName = _.startCase(name);

  let InputType;

  if (type === 'color') {
    InputType = <div 
                  style={{position: 'relative', height: 'auto', width: '100%'}}
                  onMouseEnter={() => setShowPicker(true)}
                  onMouseLeave={() => setShowPicker(false)}
                >
                  <ColorBlock backgroundColor={colorValue} />
                  <ColorPickerContainer 
                    show={showPicker} 
                    animate={{ opacity: showPicker ? 1 : 0 }} 
                  >
                    <ChromePicker 
                      color={colorValue}
                      disableAlpha={true}
                      onChange={(color) => setColorValue(color.hex)}
                      onChangeComplete={onColorChange}
                    />
                  </ColorPickerContainer>
                </div>
  } else if (type === 'select') {
    InputType = <select
                  onChange={onSelectChange}
                  defaultValue={value}
                  className='backgroundInput'
                >
                  <option value='varianceGradient' >Variance Gradient</option>
                  <option value='variance' >Variance</option>
                  <option value='lerp' >Lerp</option>
                  <option value='lerpGradient' >Lerp Gradient</option>
                </select>
  } else if (type === 'range') {
    InputType = <input 
                  type='range' 
                  min={min} 
                  max={max} 
                  step={step} 
                  defaultValue={value} 
                  onChange={onRangeChange} 
                  onMouseUp={onRangeMouseUp} 
                />
  } else {
    InputType = <input 
                  type='checkbox' 
                  defaultChecked={value} 
                  onClick={onCheckClick}
                />
  }

  return (
    <>
      <label htmlFor={name} style={{textAlign: 'right'}} >{formatedName}</label>
      {InputType}
    </>
  )
}

const BackgroundInputs = ({ storedBackground, background }) => {
  return (
    <InputContainer>
      {backgroundData[storedBackground].options.map(({ type, name, value, restart, min, max, step }, i) => {

        const onColorChange = (color) => {
          background.setOptions({ [name]: color.hex});
          Lockr.set(`${storedBackground}-${name}`, color.hex);
          restart && background.restart();
        }

        const onRangeChange = (e) => {
          Lockr.set(`${storedBackground}-${name}`, parseFloat(e.target.value));
        }

        const onRangeMouseUp = (e) => {
          if(storedBackground === 1 || 4) {
            background.setOptions({ [name]: parseFloat(e.target.value, 10) });
          } else {
            background.setOptions({ [name]: e.target.value });
          }
          restart && background.restart();
        }

        const onSelectChange = (e) => {
          background.setOptions({ [name]: e.target.value });
          Lockr.set(`${storedBackground}-${name}`, e.target.value);
          background.restart();
          console.log(background.options);
        }

        const onCheckClick = () => {
          let checked = Lockr.get(`${storedBackground}-${name}`, true);
          console.log(checked, 10, '10');
          console.log(name);
          background.setOptions({ [name]: checked});
          Lockr.set(`${storedBackground}-${name}`, !checked);
          window.location.reload();
          //name === 'mouseControls' ? window.location.reload() : background.restart();
        }

        return (
          <Input 
            key={i}
            type={type} 
            name={name}
            value={value}
            min={min}
            max={max}
            step={step}
            onColorChange={onColorChange}
            onRangeChange={onRangeChange}
            onRangeMouseUp={onRangeMouseUp}
            onSelectChange={onSelectChange}
            onCheckClick={onCheckClick}
          />
        )
      })}
    </InputContainer>
  )
}

export default BackgroundInputs;