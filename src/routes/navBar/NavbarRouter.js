// @flow
/* eslint-disable react/display-name */

import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import HomeScene from '../../scenes/navbar/Home/HomeScene';
import NavbarIcon from './NavbarIcon';
import AttendeesScene from '../../scenes/navbar/Attendees/AttendeesScene';
import ScheduleScene from '../../scenes/navbar/Schedule/ScheduleScene';
import MapScene from '../../scenes/navbar/Maps/MapScene';
import BookmarkScheduleScene from '../../scenes/BookmarkSchedule/BookmarkScheduleScene';

import {INITIAL_SCENE} from '../../constants/navigation';

import {
  themeColors,
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

import {SCALE_RATIO, HIT_SLOP} from '../../constants/layout';

const ICON_LEFT_SIZE = SCALE_RATIO * 27;

type TabBarProps = {
  focused: boolean,
  horizontal: boolean,
  tintColor: string,
};

const routeConfigs = {
  HomeScene: {
    screen: HomeScene,
    navigationOptions: {
      title: 'Home',
      tabBarIcon: (props: TabBarProps) => (
        <NavbarIcon {...props} name={ICON_HOME} />
      ),
    },
  },
  AttendeesScene: {
    screen: AttendeesScene,
    navigationOptions: {
      title: 'Participants',
      tabBarIcon: (props: TabBarProps) => (
        <NavbarIcon {...props} name={ICON_PRESENTER} />
      ),
    },
  },
  ScheduleScene: {
    screen: ScheduleScene,
    navigationOptions: {
      title: 'Schedule',
      tabBarIcon: (props: TabBarProps) => (
        <NavbarIcon {...props} name={ICON_SCHEDULE} />
      ),
    },
  },
  MapScene: {
    screen: MapScene,
    navigationOptions: {
      title: 'Conference Map',
      tabBarIcon: (props: TabBarProps) => (
        <NavbarIcon {...props} name={ICON_MAP} />
      ),
    },
  },
  BookmarkSchedule: {
    screen: BookmarkScheduleScene,
    navigationOptions: {
      title: 'My Schedule',
      tabBarIcon: (props: TabBarProps) => (
        <NavbarIcon {...props} name={ICON_BOOKMARK} />
      ),
    },
  },
};

export default createBottomTabNavigator(
  routeConfigs,
  ({
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
    navigationOptions: ({navigation}) => {
      let {index, routes} = navigation.state;
      let currentRoute = routes[index];
      let routeConfig = routeConfigs[currentRoute.key];
      // This is a super hacky way to get the title, but I can't seem to figure
      // out how to display it otherwise. Nothing else I tried works.
      // TODO: Implement a better way.
      // TODO: Add button to open drawer.
      // TODO: Copy header styles from src/routes/main/MainRouter-style.js
      let title =
        (routeConfig &&
          routeConfig.navigationOptions &&
          routeConfig.navigationOptions.title) ||
        null;
      let headerLeft;
      if (title != null) {
        headerLeft = (
          <Icon
            name="dehaze"
            iconStyle={{paddingLeft: 10}}
            color={themeColors.ACTIVE_ICON_COLOR}
            underlayColor="transparent"
            size={ICON_LEFT_SIZE}
            onPress={() => navigation.toggleDrawer()}
            hitSlop={HIT_SLOP}
          />
        );
      }
      return {
        title,
        headerLeft,
      };
    },
  }: any),
);
