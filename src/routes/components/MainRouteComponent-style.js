// @flow

import {Platform, StyleSheet} from 'react-native';

import {SHADOW_GREY, HEADER_BACKGROUND_COLOR} from 'constants/colors';
import {LARGE_FONT_SIZE} from 'constants/text';
import {SCALE_RATIO} from 'constants/layout';
import {FONT_BOLD} from 'constants/text';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 20 + 44 * SCALE_RATIO : 56;

let platformBasedStyle = Platform.OS === 'android'
  ? {
    shadow: {
      elevation: 3,
    },
  }
  : {
    shadow: {
      shadowColor: SHADOW_GREY,
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowOpacity: 0.2,
      shadowRadius: 30,
    },
  };

export default StyleSheet.create({
  container: {
    backgroundColor: HEADER_BACKGROUND_COLOR,
    flexDirection: 'row',
    alignItems: 'stretch',
    height: HEADER_HEIGHT,
    ...platformBasedStyle.shadow,
  },
  icon: {
    flex: 1,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
    alignSelf: Platform.OS === 'ios' ? 'center' : 'flex-start',
  },
});
