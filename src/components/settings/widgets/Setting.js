import { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { DeleteOutline } from '@styled-icons/material/DeleteOutline';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';
import { motion } from 'framer-motion';
import _ from 'lodash';
import Lockr from 'lockr';
import widgetData from '../../../data/widgetData';
import { WidgetContext } from '../../../context/WidgetContext';

const SettingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 40px;
  margin: 0 20px;
  padding: 8px;
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  color: ${({ theme }) => theme.color};
`;

const SettingContent = styled.div`
  display: flex;
  justify-content: baseline;
  align-items: center;
`;

const SettingName = styled.p`
  margin: 0;
  margin-left: 16px;
`;

const AddContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
`;

const AddIcon = styled(AddCircle)`
  color: ${({ theme }) => theme.color};
`;

const Add = ({ addWidget, name }) => {
  const theme = useContext(ThemeContext);

  return (
    <AddContainer
      whileHover={{
        backgroundColor: theme.highlight,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onTap={() => addWidget(name)}
    >
      <AddIcon size='32' />
    </AddContainer>
  )
}

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

const MultipleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  & div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 5px;
    margin-bottom: 4px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 5px;
    color: ${({ theme }) => theme.color};

    & p {
      margin: 0;
    }
  }
`;

const Delete = styled(DeleteOutline)`
  color: #dc3545;
`;

const Setting = ({ display, formatedName, multiple, icon, name }) => {

  const [toggled, setToggled] = useState(display);
  const [widgets, setWidgets] = useContext(WidgetContext);

  const toggleWidget = (widgetName) => {
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

  const addWidget = (widgetName) => {
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

  // delete widget function for widgets allowed to have multiple
  const deleteWidget = (widgetName) => {
    // filter out widget by name
    const filteredWidgets = widgets.filter((widget) => widget.name !== widgetName);
    setWidgets(filteredWidgets);

    const deleteRegex = /^[^-]*[^ -]/;
    const toDeleteId = parseInt(widgetName.charAt(widgetName.length - 1), 10);

    widgets.forEach((widget) => {
      // get name before dash & number after dash
      const match = widget.name.match(deleteRegex);
      const widgetId = parseInt(widget.name.charAt(widget.name.length - 1), 10);

      if(widget.name === widgetName) {
        // set widget display to one less
        const currentDisplay = Lockr.get(`${match[0]}-display`);
        Lockr.set(`${match[0]}-display`, currentDisplay - 1);
        // remove widget data in LS
        Lockr.rm(widget.name);
        Lockr.rm(`geoLocation-${widgetId}`);
      } else if (toDeleteId < widgetId) {
        // new name with id of one less
        const newName = `${match}-${widgetId - 1}`;
        // saved data with key of original name
        const oldKey = Lockr.get(widget.name);


        // if saved data exists set key to match name and id
        if (oldKey) {
          Lockr.set(newName, oldKey);
          Lockr.set(widget.name, undefined);
          console.log(Lockr.get(newName));
        }

        console.log(newName);
      }
    });
  }


  const handleToggleTap = () => {
    toggleWidget(name);
    setToggled(state => !state);
  }

  // pass widgets state
    // for displaying list of current widgets & deleting 
    // useContext or LS for city name in list item

    // if widget has multiple true & name included in widget key
      // display list of current widgets in category
    

  return (
    <>
      {console.log(widgets)}
      <SettingContainer>
        <SettingContent>
          {icon}
          <SettingName>{formatedName}</SettingName>
        </SettingContent>
        {multiple ? 
        <Add addWidget={addWidget} name={name} /> :
        <ToggleButton
          animate={{
            backgroundColor: toggled ? '#28a745' : '#dc3545',
            scale: toggled ? 1 : 0.95,
          }}
          onTap={handleToggleTap}
        >
          <ToggleCircle 
            animate={{
              x: toggled ? 10 : -10,
            }}
          />
        </ToggleButton>}
      </SettingContainer>
      {
        multiple && 
        <MultipleList>
          {widgets.map((widget, i) => {
            // name of widget before dash and id
            const widgetRegex = /^[^-]*[^ -]/;
            const widgetString = widget.name.match(widgetRegex);

            if(widget.name.includes(name)) {
              return (
                widget.name.includes('Weather') && Lockr.get(widget.name) !== undefined ?
                <div key={i} >
                  <p>{_.startCase(widgetString)} in {Lockr.get(widget.name).city}</p>
                  <Delete size='24' onClick={() => deleteWidget(widget.name)} />
                </div> :
                <div key={i} >
                  <p>{_.startCase(widget.name)}</p>
                  <Delete size='24' onClick={() => deleteWidget(widget.name)} />
                </div>
              )
            }
          })}
        </MultipleList>
      }
    </>
  )
}

export default Setting;