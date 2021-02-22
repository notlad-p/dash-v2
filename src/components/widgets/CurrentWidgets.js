import React from "react";
import styled from 'styled-components';
import { DragIndicator } from '@styled-icons/material/DragIndicator';
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import { WidthProvider, Responsive } from "react-grid-layout";
import { WidgetContext } from '../../context/WidgetContext';
import EditButtons from './EditButtons';

const DragIcon = styled(DragIndicator)`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  color: ${({ theme }) => theme.color};
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

class CurrentWidgets extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }
  onLayoutChange(layout, layouts) {
    // saveToLS("layouts", layouts);
    this.setState({ layouts });
  }

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{xl: 18, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          breakpoints={{xl: 1950, lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          rowHeight={30}
          layouts={this.state.layouts}
          draggableHandle={'.handle'}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
          compactType={null}
          preventCollision={true}
        >
          {this.context[0].map(({name, display, layout, el}) => (
            //display &&
            <div key={name} data-grid={layout} >
              {el}
              <DragIcon className='handle' size='24' />
              <EditButtons />
            </div>
          )).filter((widget) => widget !== undefined)}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

CurrentWidgets.contextType = WidgetContext;

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

// saves layouts to local storage
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

export default CurrentWidgets;