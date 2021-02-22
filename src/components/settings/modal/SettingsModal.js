import { useRef, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled, { ThemeContext } from 'styled-components';
import { Images } from '@styled-icons/boxicons-regular/Images';
import { ColorSwatch } from '@styled-icons/heroicons-outline/ColorSwatch';
import { Layers } from '@styled-icons/ionicons-outline/Layers';
import { Notepad } from '@styled-icons/boxicons-regular/Notepad';
import _ from 'lodash';
import Setting from './Setting';
import { Open, Close } from './SettingsToggle';
import Background from '../background/Background';
import WidgetSettings from '../widgets/WidgetSettings';
import Theme from '../Theme';
import { SettingsContext } from '../../../context/SettingsContext';
import Tabs from './Tabs';

// Selected state in TabsNav
  // passed down to all tabs & if true render that tab
  // on tab click set selected to that tab name
// Array of tab names passed to TabsNav to map & display

// Change to settings tabs - like notion
  // tabs sidebar on left content on right
// TabsNav.js - tabs sidebar
  // diplay settings sections
  // on click display setting content on right & highlight clicked tab
// Tab.js - tab content
  // Display content on right if props selected is true

const Drawer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  width: 400px;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  overflow-y: scroll;
  z-index: 2
`;

const Container = styled(motion.div)`
  width: 92.5%;
  margin: 0 auto;
  margin-top: 80px;
  overflow: none;
`;

const Test = styled.div`
  color: white;
`;

const settingsData = (themeState, changeTheme) => {
  return (
    [
      {
        title: 'theme',
        panel: <Theme theme={themeState} changeTheme={changeTheme} />,
      },
      {
        title: 'background',
        panel: <Background />,
      },
      {
        title: 'widgets',
        panel: <WidgetSettings />,
      },
      {
        title: 'notes',
        panel: <Test>Test</Test>,
      }
    ]
  )
}

const containerVariants = {
  open: {
    transition: { staggerChildren:  0.1, delayChildren: 0.2, }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
}

const ModalOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.6;
  z-index: 10;
`;

const Modal = styled.div`
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

const PanelContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.highlight};
  overflow-y: auto;
`;

const PanelTitle = styled.p`
  margin: 32px 16px 16px 16px;
  padding: 10px;
  color: ${({ theme }) => theme.color};
  font-size: 1.1rem;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.highlight};
`;

// https://material-ui.com/components/tabs/
// https://codeburst.io/build-responsive-tabs-using-react-js-86cc3514c881
// https://react-bootstrap.github.io/components/tabs/
// https://www.digitalocean.com/community/tutorials/react-tabs-component

        // on tab click render appropriate content on right
          // have state in modal component
          // pass down function to change state

        // depending on state is which settings content is displayed
          // in TabsPannel use tab state to render correct content
            // if statement?
            // map settings data & use title & tab state in if statement


        {/* Tabs Nav */}

        {/* <Tabs>
          <Tab label='Theme' index={0} />
        </Tabs> */}

        {/* Tabs Content */}

        {/* <TabPanel index={0} >
          <ThemeSettings />
        </TabPanel> */}

const SettingsModal = ({ themeState, changeTheme }) => {
  const [settings, setSettings] = useContext(SettingsContext);
  const [selected, setSelected] = useState('theme');
  const modalRef = useRef(null);

  // ---------------------------------------------------
  // Add modal overlay & on click modal is set to false
  // ---------------------------------------------------


   useEffect(() => {
    const handleClickOutside = (e) => {
      if(modalRef.current && modalRef.current === e.target) {
        setSettings({
          addWidgets: false,
          drawer: false,
          editWidgets: false,
        });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [modalRef]);

  return (
    <>
      <Open />
      <ModalOverlay
        ref={modalRef}
        initial='invisible'
        animate={settings.drawer ? 'visible' : 'invisible'}
        variants={{
          visible: { 
            opacity: 1, 
            display: 'block',
            scale: 1,
          },
          invisible: { 
            scale: 0.95,
            opacity: 0, 
            display: 'none',
          }
        }}
      >
        <Modal>
          <Close />
          <Tabs selected={selected} setSelected={setSelected} />
          {settingsData(themeState, changeTheme).map(({ panel, title }) => (
            selected === title &&
            <PanelContainer>
              <PanelTitle>{_.startCase(title)}</PanelTitle>
              {panel}
            </PanelContainer>
          ))}
        </Modal>
      </ModalOverlay>
    </>
  )
}

// const SettingsMenu = ({ themeState, changeTheme }) => {
//   const drawerRef = useRef(null);
//   const theme = useContext(ThemeContext);
//   const [settings, setSettings] = useContext(SettingsContext);


//   // used for click outside of settings menu to close it

//   // useEffect(() => {
//   //   const handleClickOutside = (e) => {
//   //     if(drawerRef.current && !drawerRef.current.contains(e.target)) {
//   //       handleClose();
//   //       gearAnimation.start({ display: 'block', opacity: 1, transition: { delay: 0.7 }});
//   //     }
//   //   }

//   //   document.addEventListener('mousedown', handleClickOutside);

//   //   return () => {
//   //     document.removeEventListener('mousedown', handleClickOutside);
//   //   }
//   // }, [drawerRef, gearAnimation]);

//   return (
//     <>
//       <Open />
//       <Drawer
//         ref={drawerRef}
//         initial='closed'
//         animate={settings.drawer ? 'open' : 'closed'}
//         variants={{
//           open: { x: 0 },
//           closed: { x: 400, transition: { delay: 0.5, x: { stiffness: 500 }}},
//         }}
//         transition={{ ease: 'anticipate', duration: .45 }}
//       >
//         <Close />
//         <Container
//           variants={containerVariants}
//         >
//           {settingsData(theme.color, themeState, changeTheme).map(({ title, icon, section }, i) => (
//             <Setting 
//               key={i}
//               title={title} 
//               icon={icon} 
//               section={section}
//             />
//           ))}
//         </Container>
//       </Drawer>
//     </>
//   )
// };

export default SettingsModal;