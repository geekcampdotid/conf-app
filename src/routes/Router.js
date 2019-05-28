// @flow

import React from 'react';
import {View, StatusBar, Platform} from 'react-native';

import MainRouter from './main/MainRouter';
import {STATUS_BAR_COLOR} from '../constants/colors';

export default function Router() {
  let paddingTop = Platform.OS === 'android' ? 24 : 0;
  return (
    <View style={{flex: 1, paddingTop}}>
      <StatusBar barStyle="dark-content" backgroundColor={STATUS_BAR_COLOR} />
      <MainRouter />
    </View>
  );
}
