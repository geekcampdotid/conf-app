// @flow

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';

import {configureNavigationHeader} from '../../helpers';
import Navbar from '../navBar/NavbarRouter';
import DrawerContent from '../drawer/DrawerContent';

import AboutUsScene from '../../scenes/AboutUs/AboutUsScene';
import ContactInfoScene from '../../scenes/ContactInfo/ContactInfoScene';
import SponsorsScene from '../../scenes/Sponsors/SponsorsScene';
import PresenterDetailScene from '../../scenes/PresenterDetail/PresenterDetailScene';
import ScheduleDetailScene from '../../scenes/ScheduleDetail/ScheduleDetailScene';
import ExhibitorDetailScene from '../../scenes/ExhibitorDetail/ExhibitorDetailScene';
import BookmarkScheduleScene from '../../scenes/BookmarkSchedule/BookmarkScheduleScene';

const MainStackNav = createStackNavigator(
  {
    Navbar: {screen: Navbar},

    // drawer screens
    AboutUsScene: {
      screen: AboutUsScene,
      navigationOptions: {title: 'About Us'},
    },
    ContactInfoScene: {
      screen: ContactInfoScene,
      navigationOptions: {title: 'Contact Us'},
    },
    SponsorsScene: {
      screen: SponsorsScene,
      navigationOptions: {title: 'Sponsors'},
    },

    // other screens
    PresenterDetailScene: {
      screen: PresenterDetailScene,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.presenter.name}`,
      }),
    },
    ScheduleDetailScene: {
      screen: ScheduleDetailScene,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.schedule.talkTitle}`,
      }),
    },
    ExhibitorDetailScene: {
      screen: ExhibitorDetailScene,
      navigationOptions: ({navigation}) => ({
        title: `${navigation.state.params.exhibitor.name}`,
      }),
    },
    BookmarkScheduleScene: {
      screen: BookmarkScheduleScene,
      navigationOptions: {
        title: 'My Schedule',
      },
    },
  },
  ({
    navigationOptions: ({navigation}) => ({
      ...configureNavigationHeader(navigation),
      headerBackTitle: null,
    }),
  }: any),
);

const DrawerNav = createDrawerNavigator(
  {
    Main: {
      screen: MainStackNav,
    },
  },
  ({
    contentComponent: DrawerContent,
    navigationOptions: ({navigation}) => {
      return {
        header: null,
        drawerLockMode:
          navigation.state.index > 0 ? 'locked-closed' : 'unlocked',
      };
    },
  }: any),
);

export default createAppContainer(DrawerNav);
