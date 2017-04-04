// @flow

import {Platform} from 'react-native';
import {SHADOW_GREY} from './colors';

export const VIEW_SHADOW = {
  ...Platform.select({
    android: {
      elevation: 8,
    },
    ios: {
      zIndex: 1, // to make the shadow appear at the bottom in iOS
      shadowColor: SHADOW_GREY,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },
  }),
};
