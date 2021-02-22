import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import { Settings as Gear } from '@styled-icons/material/Settings';
import { ArrowForward } from '@styled-icons/material-rounded/ArrowForward';
import { Close as CloseSolid } from '@styled-icons/evaicons-solid/Close';
import { SettingsContext } from '../../../context/SettingsContext';

const GearAnimationWrapper = styled(motion.div)`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 32px;
  height: 32px;
  padding: 8px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`;

const GearIcon = styled(Gear)`
  opacity: 0.87;
  color: ${({ theme }) => theme.color};
`;

const CloseAnimationWrapper = styled(motion.div)`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 50%;
  z-index: 2;
  cursor: pointer;
`;

const CloseIcon = styled(CloseSolid)`
  opacity: 0.87;
  color: ${({ theme }) => theme.color};
`;

const toggleVariants = {
  invisible: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const Open = ({ onClick, animate, sequence, variants }) => {
  const [settings, setSettings] = useContext(SettingsContext);

  const handleOpen = () => {
    setSettings({
      drawer: true,
      editWidgets: false,
    })
  }

  return (
    <GearAnimationWrapper
      onClick={handleOpen}
      initial='closed'
      animate={settings.drawer ? 'invisible' : 'visible'}
      variants={toggleVariants}
      whileHover={{
        rotate: 90,
        scale: 1.1,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <GearIcon 
        size='32'
        color='white'
      />
    </GearAnimationWrapper>
  )
};

const Close = ({ onClick, sequence, animation }) => {
  const theme = useContext(ThemeContext);
  const [settings, setSettings] = useContext(SettingsContext);

  const handleClose = () => {
    setSettings({
      drawer: false,
      editWidgets: false,
    });
  }

  return (
    <CloseAnimationWrapper
      onClick={handleClose}
      initial='invisible'
      animate={settings.drawer ? 'visible' : 'invisible'}
      variants={toggleVariants}
      whileHover={{
        //rotate: 90,
        scale: 1.1,
        backgroundColor: theme.highlight,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ delay: 0 }}
    >
    <motion.div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      }}
    >
      <CloseIcon 
        size='32' 
        color='white'
      />
    </motion.div>
    </CloseAnimationWrapper>
  )
}



export { 
  Open, 
  Close,
};