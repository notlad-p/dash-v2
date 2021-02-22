import { useContext } from 'react';
import { motion } from 'framer-motion';
import styled, { ThemeContext } from 'styled-components';
import { SettingsContext } from '../../context/SettingsContext';
import { TrashAlt } from '@styled-icons/boxicons-regular/TrashAlt'
import { EditAlt } from '@styled-icons/boxicons-regular/EditAlt'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  border-radius: 5px;
`;

const IconContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  cursor: pointer;
`;

const TrashIcon = styled(TrashAlt)``;

const EditIcon = styled(EditAlt)`
  color: ${({ theme }) => theme.color};
`;

const EditButtons = () => {
  const [settings, ] = useContext(SettingsContext);
  const theme = useContext(ThemeContext);

  // if editWidgets is true
    // display red trashcan & gear icon in top left
    return (
      <Container
        style={{
          display: settings.editWidgets ? 'flex' : 'none',
        }}
      >
        <IconContainer
          whileHover={{
            backgroundColor: theme.highlight,
          }}
        >
          <TrashIcon size='36' color='#dc3545' />
        </IconContainer>
        
        <IconContainer
          whileHover={{
            backgroundColor: theme.highlight,
          }}
        >
          <EditIcon size='36' />
        </IconContainer>
      </Container>
    )
    // red trashcan deletes the widget on click

    // gear icon brings up edit overlay (over whole page)
}

export default EditButtons;