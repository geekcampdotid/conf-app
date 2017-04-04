// @flow

import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import Drawer from 'react-native-drawer';

import MainRouteComponent from './components/MainRouteComponent';
import SideDrawerContent from './components/SideDrawerContent';
import {statusBarHeight} from 'constants/layout';
import {STATUS_BAR_COLOR} from 'constants/colors';

import type {Dispatch} from 'types/Dispatch';
import type {RootState} from 'types/RootState';
import type {
  NavigationState,
  NavigationObject,
} from 'data/navigation/Navigation-type';
import type {SideDrawerState} from 'data/sideDrawer/SideDrawer-type';

type Props = {
  dispatch: Dispatch;
  navigation: NavigationState;
  sideDrawer: SideDrawerState;
  onSideDrawerClose: () => void;
};

export function MainRoute(props: Props) {
  let {sideDrawer, navigation, dispatch, onSideDrawerClose} = props;

  let navigationObject: NavigationObject = addNavigationHelpers({
    dispatch,
    state: navigation,
    index: navigation.index,
  });

  let {isOpened} = sideDrawer;

  return (
    <Drawer
      open={isOpened}
      type={Platform.OS === 'ios' ? 'static' : 'overlay'}
      content={
        <SideDrawerContent
          isOpened={isOpened}
          navigation={navigationObject}
          onSideDrawerClose={onSideDrawerClose}
        />
      }
      tapToClose={true}
      tweenEasing="easeOutQuart"
      openDrawerOffset={0.25}
      tweenDuration={200}
      onCloseStart={onSideDrawerClose}
      tweenHandler={(ratio) => ({
        mainOverlay: {backgroundColor: `rgba(0, 0, 0, ${ratio * 0.5})`},
      })}
      styles={{
        ...Platform.select({
          android: {
            // drawer: {marginTop: statusBarHeight},
            main: {paddingTop: statusBarHeight},
          },
          ios: {},
        }),
      }}
      useInteractionManager={true}
    >
      <StatusBar
        hidden={isOpened && Platform.OS === 'ios'}
        barStyle="dark-content"
        backgroundColor={STATUS_BAR_COLOR}
      />
      <MainRouteComponent navigation={navigationObject} />
    </Drawer>
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
