// @flow

import React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {connect} from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';

import MainRouter from './main/MainRouter';
// import SideDrawerContent from './components/SideDrawerContent';
import {STATUS_BAR_COLOR} from '../constants/colors';

import type {RootState, Dispatch} from '../types';
import type {NavigationState} from '../data/navigation/Navigation-type';

type Props = {
  dispatch: Dispatch,
  navigation: NavigationState,
};

export function Router(props: Props) {
  let {navigation, dispatch} = props;

  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'android' ? 24 : 0}}>
      <StatusBar barStyle="dark-content" backgroundColor={STATUS_BAR_COLOR} />
      <MainRouter
        navigation={addNavigationHelpers({
          dispatch,
          state: navigation,
        })}
      />
    </View>
  );
}

function mapStateToProps(state: RootState) {
  return {
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(Router);
