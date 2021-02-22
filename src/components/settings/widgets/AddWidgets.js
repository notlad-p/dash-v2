import { useContext } from 'react'; 
import _ from 'lodash';
import styled, { ThemeContext } from 'styled-components';
import { Close } from '@styled-icons/evaicons-solid/Close';
import { motion } from 'framer-motion';
import { SettingsContext } from '../../../context/SettingsContext';
import widgetData from '../../../data/widgetData';
import AddWidgetItem from './AddWidgetItem';

// Make AddWidgetItem.js - map widget data & pass multiple as prop

// Settings data with sections & options in the sections

// Map settings data & display sections with options
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // options are previews of the widget!
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


// Logic for options in their own files

// create widget adding ui
  // overlay with widgets by section
    // Misc - Search, Time, Calendar, Email
    // Weather - Current Weather, 7 Day Forecast,
    // Tab Manager - Save All, Select tabs, Custom
    // Feeds - Twitter, YT, Reddit, Twitch 
    // Notes - Add folder, Add page, Add quick note

// Move logic for adding to this file

// -----------------------------------

// create widget editing ui
  // on edit widgets click all widgets indicate they are in edit mode (darken? shake?) with an edit icon & delete icon in top left corner

// Move logic for deleting to EditWidget.js (avoid adding to each individual widget component)
// Add logic for editing widgets to each widget 
  // Search, Weather

const Container = styled(motion.div)`
  position: absolute;
  top: 10%; 
  left: 0;
  right: 0;
  height: 75%;
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background};
  border-radius: 5px;
  z-index: 10;
`;

const CloseAnimationWrapper = styled(motion.div)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
`;

const CloseIcon = styled(Close)`
  color: ${({ theme }) => theme.color};
`;

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 16px;
  margin: 70px 16px 16px 16px;
  color: ${({ theme }) => theme.color};
`;

const AddWidgets = () => {
  const theme = useContext(ThemeContext);
  const [settings, setSettings] = useContext(SettingsContext);

  const handleClose = () => {
    setSettings({
      addWidgets: false,
      drawer: false,
      editWidgets: false,
    })
  }

  return (
    <Container
      initial='invisible'
      animate={settings.addWidgets ? 'visible' : 'invisible'}
      variants={{
        visible: { 
          opacity: 1, 
          display: 'block',
          transition: { delay: .5 }
        },
        invisible: { 
          display: 'none',
          opacity: 0, 
          transition: { delay: 0 }
        }
      }}
    >
      <CloseAnimationWrapper
        whileHover={{
          scale: 1.1,
          backgroundColor: theme.highlight,
        }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClose}
      >
        <CloseIcon size='32' />
      </CloseAnimationWrapper>
      <Grid>
        {
          widgetData.map(({ name, icon, multiple }, i) => {
            return (
              <AddWidgetItem 
                key={i}
                name={name} 
                icon={icon} 
                multiple={multiple}
              />
            )
          })
        }
      </Grid>
    </Container>
  )
};

export default AddWidgets;