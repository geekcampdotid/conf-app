// @flow

import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

import {configureNavigationHeader} from '../../helpers';
import NavbarRouter from '../navBar/NavbarRouter';
import DrawerContent from '../drawer/DrawerContent';

import AboutUsScene from '../../scenes/AboutUs/AboutUsScene';
import ContactInfoScene from '../../scenes/ContactInfo/ContactInfoScene';
import SponsorsScene from '../../scenes/Sponsors/SponsorsScene';
import PresenterDetailScene from '../../scenes/PresenterDetail/PresenterDetailScene';
import ScheduleDetailScene from '../../scenes/ScheduleDetail/ScheduleDetailScene';
import ExhibitorDetailScene from '../../scenes/ExhibitorDetail/ExhibitorDetailScene';
import BookmarkScheduleScene from '../../scenes/BookmarkSchedule/BookmarkScheduleScene';

const MainRouter = createStackNavigator(
  {
    Navbar: {screen: NavbarRouter},
    // drawer navigation
    AboutUsScene: {screen: AboutUsScene},
    ContactInfoScene: {screen: ContactInfoScene},
    SponsorsScene: {screen: SponsorsScene},

    // other screens
    PresenterDetailScene: {screen: PresenterDetailScene},
    ScheduleDetailScene: {screen: ScheduleDetailScene},
    ExhibitorDetailScene: {screen: ExhibitorDetailScene},
    BookmarkScheduleScene: {screen: BookmarkScheduleScene},
  },
  {
    navigationOptions: ({navigation}) => ({
      ...configureNavigationHeader(navigation),
      headerBackTitle: null,
    }),
  },
);

const DrawerRouter = createDrawerNavigator(
  {
    Main: {
      screen: MainRouter,
    },
  },
  {
    contentComponent: DrawerContent,
    navigationOptions: ({navigation}) => {
      return {
        drawerLockMode:
          navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
      };
    },
  },
);

export default createStackNavigator(
  {
    Drawer: {
      screen: DrawerRouter,
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
      header: null,
      gesturesEnabled: false,
    },
  },
);
