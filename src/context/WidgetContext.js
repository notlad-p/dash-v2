import { createContext, useState } from 'react';
import widgetData from '../data/widgetData';
// consume context in current widgets (CLASS BASED VERSION)

// consume & manipulate context in widget settings (function based version)

const currentWidgets = [];

widgetData.forEach(({ name, display, el, layout, icon, multiple }) => {
  if (multiple) {
    for(let i = 0; i < display; i++) {
      currentWidgets.push({name: `${name}-${i + 1}`, el, layout, icon, multiple });
    }
  } else if (display) {
    currentWidgets.push({name: name, el, layout, icon, multiple });
  }
});

// const WidgetContext = createContext([displayWidgets, () => []]);
export const WidgetContext = createContext();

export const WidgetProvider = (props) => {
  const [widgets, setWidgets] = useState(currentWidgets);

  return (
    <WidgetContext.Provider value={[widgets, setWidgets]}>
      {props.children}
    </WidgetContext.Provider>
  )
}