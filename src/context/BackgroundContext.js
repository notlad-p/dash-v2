import { createContext, useState, useEffect } from 'react';
import Lockr from 'lockr';
import backgroundData from '../data/backgroundData';

export const BackgroundContext = createContext();

export const BackgroundProvider = (props) => {
  const [background, setBackground] = useState();
  const [storedBackground,] = useState(Lockr.get('storedBackground', 0));

  useEffect(() => {
    if(!background) {
      setBackground(backgroundData[0].backgroundEffect()); 
    }

    return () => {
      if(background) background.destroy()
    }
  }, [background]);

  useEffect(() => {
    if(storedBackground) {
      setBackground(backgroundData[storedBackground].backgroundEffect());
    } else {
      Lockr.set('storedBackground', 0);
      setBackground(backgroundData[0].backgroundEffect());
    }
  }, [storedBackground]);

  return (
    <BackgroundContext.Provider value={[background, setBackground]}>
      {props.children}
    </BackgroundContext.Provider>
  )
}