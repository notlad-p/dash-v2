import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { AddCircle } from '@styled-icons/ionicons-outline/AddCircle';
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { SettingsContext } from '../../../context/SettingsContext';
import widgetData from '../../../data/widgetData';
import Setting from './Setting';
import AddWidgetItem from './AddWidgetItem';

// const SettingsContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   row-gap: 8px;
//   column-gap: 8px;
//   align-items: center;
//   justify-items: center;
//   margin: 16px 0px;
// `;

const SettingsContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const WidgetSetting = styled(motion.div)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 5px;
  cursor: pointer;
`;

const WidgetHeading = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.color};
`;

const AddIcon = styled(AddCircle)`
  margin: 0 12px 0 16px;
  color: ${({ theme }) => theme.color};
`;

const EditIcon = styled(EditAlt)`
  margin: 0 12px 0 16px;
  color: ${({ theme }) => theme.color};
`;

const Grid = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 16px;
  margin: 16px 0;
  color: ${({ theme }) => theme.color};
`;

const WidgetSettings = () => {
  const theme = useContext(ThemeContext);
  const [, setSettings] = useContext(SettingsContext);

  const handleEditWidgets = () => {
    setSettings({
      drawer: false,
      editWidgets: true,
    });
  }

  return (
    <SettingsContainer>
      <WidgetSetting 
        whileHover={{
          scale: 1.02,
          backgroundColor: theme.highlight,
        }} 
        onClick={handleEditWidgets}
      >
        <EditIcon size='24' />
        <WidgetHeading>Edit Widgets</WidgetHeading>
      </WidgetSetting>
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

      {/* 
        Widget categories & widgets in that category under heading
          Misc, Weather, Productivity
      */}

      {/* {widgetData.map(({ name, display, icon, multiple }, i) => {
        const formatedName = _.startCase(name);
        
        return (
          <Setting 
           key={i}
           display={display} 
           icon={icon}
           formatedName={formatedName}
           multiple={multiple}
           name={name}
          />
        )
      })} */}
    </SettingsContainer>
  )
};

export default WidgetSettings;