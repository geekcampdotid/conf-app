// @flow
import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {View} from '../components/core';
import {themeColors} from '../constants/colors';
import {SCALE_RATIO, HIT_SLOP} from '../constants/layout';

import type {NavigationObject} from '../data/navigation/Navigation-type';

const ICON_LEFT_SIZE = SCALE_RATIO * 27;

export default function configureNavigationHeader(
  navigation: NavigationObject,
) {
  let {state, navigate, goBack} = navigation;

  let leftIcon = (
    <Icon
      name="ios-arrow-back"
      color={themeColors.ACTIVE_ICON_COLOR}
      type="ionicon"
      underlayColor="transparent"
      size={ICON_LEFT_SIZE}
      hitSlop={HIT_SLOP}
      onPress={() => goBack()}
    />
  );
  if (state.key.includes('Init')) {
    leftIcon = (
      <Icon
        name="dehaze"
        color={themeColors.ACTIVE_ICON_COLOR}
        underlayColor="transparent"
        size={ICON_LEFT_SIZE}
        onPress={() => navigate('DrawerToggle')}
        hitSlop={HIT_SLOP}
      />
    );
  }

  return {
    headerLeft: <View style={styles.iconContainer}>{leftIcon}</View>,
  };
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 10,
  },
});
