// @flow
/* eslint-disable react/display-name */

import React from 'react';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from 'react-navigation';

import Navbar from './Navbar';
import HomeScene from '../../scenes/navbar/Home/HomeScene';
import AttendeesScene from '../../scenes/navbar/Attendees/AttendeesScene';
import ScheduleScene from '../../scenes/navbar/Schedule/ScheduleScene';
import MapScene from '../../scenes/navbar/Maps/MapScene';
import BookmarkScheduleScene from '../../scenes/BookmarkSchedule/BookmarkScheduleScene';

import {INITIAL_SCENE} from '../../constants/navigation';

import {
  ACTIVE_ICON_COLOR,
  INACTIVE_ICON_COLOR,
  NAVBAR_BACKGROUND_COLOR,
} from '../../constants/colors';

import {
  ICON_HOME,
  ICON_MAP,
  ICON_BOOKMARK,
  ICON_SCHEDULE,
  ICON_PRESENTER,
} from '../../constants/icons';

export default createBottomTabNavigator(
  {
    HomeScene: {
      screen: HomeScene,
      navigationOptions: {
        tabBarIcon: () => <Icon name={ICON_HOME} />,
      },
    },
    AttendeesScene: {
      screen: AttendeesScene,
      navigationOptions: {
        tabBarIcon: () => <Icon name={ICON_PRESENTER} />,
      },
    },
    ScheduleScene: {
      screen: ScheduleScene,
      navigationOptions: {
        tabBarIcon: () => <Icon name={ICON_SCHEDULE} />,
      },
    },
    MapScene: {
      screen: MapScene,
      navigationOptions: {
        tabBarIcon: () => <Icon name={ICON_MAP} />,
      },
    },
    BookmarkSchedule: {
      screen: BookmarkScheduleScene,
      navigationOptions: {
        tabBarIcon: () => <Icon name={ICON_BOOKMARK} />,
      },
    },
  },
  {
    tabBarComponent: args => {
      return <Navbar {...args} />;
    },
    tabBarOptions: {
      // iOS
      activeTintColor: ACTIVE_ICON_COLOR,
      activeBackgroundColor: NAVBAR_BACKGROUND_COLOR,
      inactiveBackgroundColor: NAVBAR_BACKGROUND_COLOR,
      inactiveTintColor: INACTIVE_ICON_COLOR,
      showLabel: false,
      // Android
      scrollEnabled: true,
      showIcon: true,
      indicatorStyle: {
        backgroundColor: ACTIVE_ICON_COLOR,
      },
      style: {
        backgroundColor: NAVBAR_BACKGROUND_COLOR,
      },
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    initialRouteName: INITIAL_SCENE,
  },
);
