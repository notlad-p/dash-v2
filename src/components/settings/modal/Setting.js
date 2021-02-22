import { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import { StyledIconBase } from '@styled-icons/styled-icon';
import { CaretDownFill } from '@styled-icons/bootstrap/CaretDownFill'

const Title = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  margin: 8px 0px;
  padding: 8px 0;
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  cursor: pointer;
`;

export const SettingIconWrapper = styled.div`
  ${StyledIconBase} {
    margin: 0px 16px 0px 8px;
  }
`;

const Caret = styled(CaretDownFill)`
  color: ${({ theme }) => theme.color};
  opacity: 0.87;
`;

const SettingTitle = ({ title, onClick, show, icon, open }) => {
  return (
    <Title onClick={onClick} show={show} >
      <SettingIconWrapper>
        {icon}
      </SettingIconWrapper>
      {title}
      <motion.div
        animate={{
          rotate: open ? 180 : 0,
          y: open ? 2.5 : 0,
        }}
        style={{
          position: 'absolute',
          right: '16px',
          top: '8px',
        }}
      >
        <Caret
          size='22'
        />
      </motion.div>
    </Title>
  )
}

const SettingSection = styled(motion.div)`
  overflow: hidden;
`;

const settingVariants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 }
    },
  },
  closed: {
    x: 75,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 }
    },
  }
}

const Setting = ({ title, section, icon }) => {
  const [open, setOpen] = useState(false);

  const theme = useContext(ThemeContext); 

  return (
    <motion.div variants={settingVariants} >
      <motion.div 
        onClick={() => setOpen(state => !state)} 
        whileHover={{
          scale: 1.04,
          backgroundColor: theme.highlight,
        }}
        style={{ borderRadius: '5px', }}
      >
        <SettingTitle  
          title={title} 
          icon={icon}
          open={open}
        />
      </motion.div>
      <SettingSection 
        animate={{
          height: open ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, }}
      >
        {section}
      </SettingSection>
    </motion.div>
    
  )
}

export default Setting;