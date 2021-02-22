import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Lockr from 'lockr';
import widgetData from '../../data/widgetData';

const ResponsiveGridLayout = WidthProvider(Responsive);

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("widgets")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "widgets",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

const savedLayout = JSON.parse(JSON.stringify(getFromLS("layouts") || {}));

 const CurrentWidgets = () => {
  const [layout, setLayout] = useState(savedLayout);
  
  // onLayout change event
    // saves layout to local storage
    // sets current layout in state

  // saves layouts to local storage

  const onLayoutChange = (layout, layouts) => {
    saveToLS("layouts", layouts);
    setLayout({ layouts });
  }

  return (
    <ResponsiveGridLayout
      className='layout'
      layouts={layout}
      breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={30}
      compactType={null}
      onLayoutChange={(layout, layouts) => onLayoutChange(layout, layouts)}
    >
      {/* <div key='search' >1</div>
      <div key='search2' >2</div> */}
      {widgetData.map(({ display, el, name, layout }) => (
        display && <div key={name} data-grid={layout} >{el}</div>
      ))}
    </ResponsiveGridLayout>
  )
}

export default CurrentWidgets;