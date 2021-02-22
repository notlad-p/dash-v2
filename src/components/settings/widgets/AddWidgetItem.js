import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';
import _ from 'lodash';
import Lockr from 'lockr';
import widgetData from '../../../data/widgetData';
import { WidgetContext } from '../../../context/WidgetContext';


const GridItem = styled(motion.div)`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  cursor: pointer;
`;

const ItemHeading = styled.h4`
  margin: 8px 0;
`;

const AddIcon = styled(AddCircle)`
  color: ${({ theme }) => theme.color};
`;

const ToggleButton = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const ToggleCircle = styled(motion.div)`
  width: 26px;
  height: 26px;
  background-color: ${({ theme }) => theme.color};
  border-radius: 50%;
`;

const AddWidgetItem = ({ name, icon, multiple }) => {
  const theme = useContext(ThemeContext);
  const [widgets, setWidgets] = useContext(WidgetContext);
  const [toggled, setToggled] = useState(Lockr.get(`${name}-display`));


  const handleToggleWidget = (widgetName) => {
    const currentWidget = widgetData.filter(widget => widget.name === widgetName);

    if(!currentWidget[0].display) {
      currentWidget[0].display = true;
      Lockr.set(`${currentWidget[0].name}-display`, true);
      setWidgets(state => [...state, ...currentWidget])
    } else {
      currentWidget[0].display = false;
      Lockr.set(`${currentWidget[0].name}-display`, false);
      setWidgets(state => state.filter(widget => widget.name !== currentWidget[0].name));
    }
  }

  const handleAddWidget = (widgetName) => {
    // map widgets to get widget selected to add
    const newWidget = widgetData.map((widget) => {
      if (widget.name === widgetName) {
        widget.display++
        Lockr.set(`${widgetName}-display`, widget.display);
        return {
          ...widget,
          name: `${widgetName}-${widget.display}`,
        };
      } else {
        return undefined;
      }
    }).filter(wid => wid !== undefined);

    setWidgets(state => [...state, ...newWidget]);
  }

  const handleToggleClick = () => {
    handleToggleWidget(name);
    setToggled(state => !state);
  }

  return (
    <GridItem
      whileHover={{
        backgroundColor: theme.highlight,
        scale: 1.025,
      }}
      onClick={() => {
        multiple ?
        handleAddWidget(name) :
        handleToggleClick();
      }}
    >
      {icon}
      <ItemHeading>{_.startCase(name)}</ItemHeading>
      {
        multiple ? 
        <AddIcon size='32' /> :
        <ToggleButton
          animate={{
            backgroundColor: toggled ? '#28a745' : '#dc3545',
            scale: toggled ? 1 : 0.95,
          }}
        >
          <ToggleCircle 
            animate={{
              x: toggled ? 10 : -10,
            }}
          />
        </ToggleButton>
      }
    </GridItem>
  )
}

export default AddWidgetItem;