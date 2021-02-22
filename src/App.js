import { useState, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import Lockr from 'lockr';
import SettingsModal from './components/settings/modal/SettingsModal';
import themeData from './data/themeData';
import CurrentWidgets from './components/widgets/CurrentWidgets';
import AddWidgets from './components/settings/widgets/AddWidgets';
import { WidgetProvider } from './context/WidgetContext';
import { SettingsProvider } from './context/SettingsContext';
import { BackgroundProvider } from './context/BackgroundContext';

// MAKE HOOKS
  // ADD WIDGET HOOK
  // FETCH DATA HOOK - updates every 15mins

// make WidgetsSettings toggle buttons if only one allowed
// if multiple allowed show show add button
  //https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/48029d70302039.5ba15c1f0af95.png

// Figure out general grid layout - columns & breakpoints
  // https://github.com/STRML/react-grid-layout

// Make default components:

  // Weather - Current weather, 7 day forecast
    // Increment for multiple weather widgets

  // Quick Links
    // Use api for icons and store in IndexedDB - library?
      // https://www.npmjs.com/package/react-indexed-db
      // or
      // google: indexeddb library

  // Time - Current location or specified location

// use global styles for common styling and THEME
  //https://styled-components.com/docs/api#createglobalsty
  // https://css-tricks.com/theming-and-theme-switching-with-react-and-styled-components/

// FIX SCROLLING WHEN ADDING ELEMENTS
  // Background is fixed & widgets are scrollable

// useContext to solve theme prop drilling??

// Fix widget incrementing when deleting - before reload id is one more than it should be

// New settings UI
  // Top of settings menu: 
    // Add widget - Opens overlay of avalible widgets in categories
      // When adding the menu doesn't close for the abilty to add multiple
      // Add button & Preview Button on single widgets
    // Edit Widgets - Opens overlay of current widgets with gear icon and delete icon in top left corner

    // auto close setting drop down when another drop down is focused

// Retain url bar auto focus when hitting new tab

function App() {
  const [theme, setTheme] = useState(Lockr.get('theme', 'dark'));

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  }

  return (
    <div className='App' id='app'>
      <WidgetProvider >
        <ThemeProvider theme={themeData[theme]} >
          <SettingsProvider>
            <BackgroundProvider>
              <SettingsModal 
                themeState={theme}
                changeTheme={changeTheme} 
              />
            </BackgroundProvider>
            <CurrentWidgets />
            <AddWidgets />
          </SettingsProvider>
        </ThemeProvider>
      </WidgetProvider>
    </div>
  );
}

export default App;