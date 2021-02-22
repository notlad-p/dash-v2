import Lockr from 'lockr';
import Search from '../components/widgets/Search';
import { SearchOutline } from '@styled-icons/evaicons-outline/SearchOutline';
import Weather from '../components/widgets/weather/Weather';
import { Cloud } from '@styled-icons/boxicons-regular/Cloud';

// ADD MAX # PROPERTY & ADD TO ADD WIDGET FUNCTION

const widgetData = [
  {
    name: 'search',
    display: Lockr.get('search-display', true),
    el: <Search />,
    layout: {
      x: 0, y: 0, w: 4, h: 2, isResizable: false,
    },
    icon: <SearchOutline size='40' />,
    multiple: false,
  },
  {
    name: 'currentWeather',
    display: Lockr.get('currentWeather-display', 0),
    el: <Weather />,
    layout: {
      x: 0, y: 0, w: 2, h: 4, isResizable: false,
    },
    icon: <Cloud size='40' />,
    multiple: true,
  },
];

export default widgetData;