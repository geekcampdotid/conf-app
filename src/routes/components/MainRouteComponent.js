// @flow

import NavbarRoute from '../NavbarRoute';
import PresenterDetailScene from '../../scenes/PresenterDetail/PresenterDetailScene';
import ScheduleDetailScene from '../../scenes/ScheduleDetail/ScheduleDetailScene';
import ExhibitorDetailScene from '../../scenes/ExhibitorDetail/ExhibitorDetailScene';
import AboutUsScene from '../../scenes/AboutUs/AboutUsScene';
import ContactInfoScene from '../../scenes/ContactInfo/ContactInfoScene';
import KodefoxProfileScene from '../../scenes/KodefoxProfile/KodefoxProfileScene';
import SponsorsScene from '../../scenes/Sponsors/SponsorsScene';

// import styles from './MainRouteComponent-style';

import {StackNavigator} from 'react-navigation';

// import getHeaderConfiguration from '../../helpers/getHeaderConfiguration';

// import {ACTIVE_ICON_COLOR} from '../../constants/colors';

// import type {NavigationState} from '../../data/navigation/Navigation-type';
// import type {Dispatch} from '../../types';

// type NavigationArgs = {
//   dispatch: Dispatch,
//   state: NavigationState,
//   index: number,
//   goBack: () => void,
// };

// all the navigation routes listed here
const MainNavigator = StackNavigator(
  {
    Main: {screen: NavbarRoute},
    PresenterDetailScene: {screen: PresenterDetailScene},
    ScheduleDetailScene: {screen: ScheduleDetailScene},
    ExhibitorDetailScene: {screen: ExhibitorDetailScene},
    AboutUsScene: {screen: AboutUsScene},
    ContactInfoScene: {screen: ContactInfoScene},
    KodefoxProfileScene: {screen: KodefoxProfileScene},
    SponsorsScene: {screen: SponsorsScene},
  },
  {
    mode: 'modal',
    initialRouteName: 'Main',
  },
);

export default MainNavigator;
