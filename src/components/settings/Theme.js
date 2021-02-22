import styled from 'styled-components';
import _ from 'lodash';
import Lockr from 'lockr';
import themeData from '../../data/themeData';

// Theme colors

// Theme Mode:
  // Current: Rounded
  // Hex, Neumorphism, Square

const ThemeSelect = styled.select`
  margin-left: 8px;
`;

const Theme = ({ changeTheme, theme }) => {
  const onChange = (e) => {
    changeTheme(e.target.value);
    Lockr.set('theme', e.target.value);
  }

  return (
    <div>
      
      <ThemeSelect
        onChange={onChange}
        defaultValue={theme}
      >
      {Object.keys(themeData).map((themeName) => {
        return <option value={themeName} >{_.startCase(themeName)}</option>
      })}
      </ThemeSelect>
    </div>
  )
}

export default Theme;