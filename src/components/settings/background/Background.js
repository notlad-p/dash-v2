import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lockr from 'lockr';
import backgroundData from '../../../data/backgroundData';
import { BackgroundContext } from '../../../context/BackgroundContext';
import BackgroundInputs from './BackgroundInputs';

const BackgroundsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  grid-gap: 16px;
  justify-items: center;
  column-gap: 8px;
  row-gap: 8px;
`;

const BackgroundImage = styled(motion.div)`
  width: 170px;
  height: 100px;
  border-radius: 5px;
  background-image: url(${props => props.img});
  background-size: cover;
  cursor: pointer;
`;

const ImageOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;

  & h2 {
    margin: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: white;
  }
`

const BackgroundTile = ({ img, onClick, name }) => {
  const [hover, setHover] = useState();

  return (
    <BackgroundImage
      img={img} 
      onClick={onClick}
      whileTap={{
        scale: 0.95,
      }}
    >
      <ImageOverlay
        whileHover={{
          opacity: 1,
        }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
      >
        <motion.h2
          animate={{ y: hover ? 30 : 0}}
        >
          {name}
        </motion.h2>
      </ImageOverlay>
    </BackgroundImage>
  )
}

const Background = () => {
  const [background, setBackground] = useContext(BackgroundContext);
  const [storedBackground, setStoredBackground] = useState(Lockr.get('storedBackground', 0));

  return (
    <div>
      <BackgroundsContainer>
        {backgroundData.map(({ name, backgroundEffect, img }, i) => 
          <BackgroundTile 
            key={i}
            img={img}
            name={name}
            onClick={() => {
              setBackground(backgroundEffect());
              Lockr.set('storedBackground', i);
              setStoredBackground(Lockr.get('storedBackground'));
            }}
          />
        )}
      </BackgroundsContainer>
      <BackgroundInputs  background={background} storedBackground={storedBackground} />
    </div>
  )
};

export default Background;