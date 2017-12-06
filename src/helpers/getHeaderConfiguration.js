// @flow
import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

import {SCALE_RATIO} from '../constants/layout';

import type {NavigationState} from '../data/navigation/Navigation-type';
import type {Dispatch} from '../types';

type NavigationArgs = {
  dispatch: Dispatch,
  state: NavigationState,
  goBack: () => void,
  styles: StyleSheetTypes,
  iconColor: string,
};

const ICON_LEFT_SIZE = SCALE_RATIO * 24;
const DEFAULT_HIT_SLOP = {top: 20, bottom: 20, left: 20, right: 20};

// TODO: test this
export default function getHeaderConfiguration(args: NavigationArgs) {
  let {state, goBack, styles, iconColor, dispatch} = args;
  let left = (
    <View style={styles.icon}>
      <Icon
        name="dehaze"
        color={iconColor}
        underlayColor="transparent"
        size={ICON_LEFT_SIZE}
        onPress={() => {
          dispatch({
            type: 'SIDE_DRAWER_OPENED',
          });
        }}
        hitSlop={DEFAULT_HIT_SLOP}
      />
    </View>
  );
  if (state.key !== 'Init') {
    left = (
      <View style={styles.icon}>
        <Icon
          name="ios-arrow-back"
          color={iconColor}
          type="ionicon"
          underlayColor="transparent"
          size={ICON_LEFT_SIZE}
          hitSlop={DEFAULT_HIT_SLOP}
          onPress={() => goBack()}
        />
      </View>
    );
  }
  let right = <View style={styles.icon} />;
  return {
    left,
    right,
  };
}
