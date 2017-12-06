// @flow

import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
// import Drawer from 'react-native-drawer';

import MainRouteComponent from './components/MainRouteComponent';
// import SideDrawerContent from './components/SideDrawerContent';
// import {statusBarHeight} from '../constants/layout';
import {STATUS_BAR_COLOR} from '../constants/colors';

import type {RootState, Dispatch} from '../types';
import type {
  NavigationState,
  // NavigationObject,
} from '../data/navigation/Navigation-type';
import type {SideDrawerState} from '../data/sideDrawer/SideDrawer-type';

type Props = {
  dispatch: Dispatch,
  navigation: NavigationState,
  sideDrawer: SideDrawerState,
  onSideDrawerClose: () => void,
};

export function MainRoute(props: Props) {
  let {sideDrawer, navigation, dispatch} = props;

  let navigationObject = addNavigationHelpers({
    dispatch,
    state: navigation,
    index: navigation.index,
  });

  let {isOpened} = sideDrawer;

  return (
    <View style={{flex: 1}}>
      <StatusBar
        hidden={isOpened && Platform.OS === 'ios'}
        barStyle="dark-content"
        backgroundColor={STATUS_BAR_COLOR}
      />
      <MainRouteComponent navigation={navigationObject} />
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    navigation: state.navigation,
    sideDrawer: state.sideDrawer,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    dispatch, //required for the navigation
    onSideDrawerClose: () => {
      dispatch({
        type: 'SIDE_DRAWER_CLOSED',
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainRoute);
