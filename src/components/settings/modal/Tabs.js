import { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import { Images } from '@styled-icons/boxicons-regular/Images';
import { ColorSwatch } from '@styled-icons/heroicons-outline/ColorSwatch';
import { Layers } from '@styled-icons/ionicons-outline/Layers';
import { Notepad } from '@styled-icons/boxicons-regular/Notepad';
import _ from 'lodash';

const TabsContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 5px 0 0 5px;
`;

const Title = styled.p`
  margin: 0;
  padding: 20px;
  color: ${({ theme }) => theme.color};
  opacity: .7;
`;

const Tab = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.highlight};
  }
`;

const TabTitle = styled.p`
  display: inline-block;
  margin: 0;
  margin-left: 5px;
  font-size: 1rem;
`;

const tabsData = (color) => (
  [
    { 
      title: 'theme', 
      icon: <ColorSwatch size='20' color={color} /> 
    },
    {
      title: 'background',
      icon: <Images size='20' color={color} />,
    },
    {
      title: 'widgets',
      icon: <Layers size='20' color={color} />,
    },
    {
      title: 'notes',
      icon: <Notepad size='20' color={color} />,
    },
  ]
);

const Tabs = ({ selected, setSelected }) => {
  const theme = useContext(ThemeContext);

  // map tabs array & create tab for each
  return (
    <TabsContainer>
      <Title>Settings</Title>
      {tabsData(theme.color).map(({ title, icon }) => {
        return (
          <Tab
            style={{
              backgroundColor: selected === title && theme.highlight,
            }}
            onClick={() => setSelected(title)}
          >
            {icon}
            <TabTitle
              style={{
                fontSize: selected === title ? '1.05rem' : '1rem',
              }}
            >
              {_.startCase(title)}
            </TabTitle>
          </Tab>
        )
      })}
    </TabsContainer>
  )
}

export default Tabs;