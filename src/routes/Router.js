// @flow

import React from 'react';
import {View, StatusBar, Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';

import MainRouter from './main/MainRouter';
import {STATUS_BAR_COLOR} from '../constants/colors';

export function Router() {
  return (
    <View style={{flex: 1, paddingTop: Platform.OS === 'android' ? 24 : 0}}>
      <StatusBar barStyle="dark-content" backgroundColor={STATUS_BAR_COLOR} />
      <MainRouter />
    </View>
  );
}

export default createAppContainer(MainRouter);
