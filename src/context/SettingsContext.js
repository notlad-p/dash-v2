import { createContext, useState } from 'react';

export const SettingsContext = createContext();

const defaultSettings = {
  drawer: false,
  editWidgets: false,
}

export const SettingsProvider = (props) => {
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={[settings, setSettings]}>
      {props.children}
    </SettingsContext.Provider>
  )
}