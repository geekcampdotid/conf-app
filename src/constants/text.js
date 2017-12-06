// @flow
import {Platform} from 'react-native';
import {SCALE_RATIO} from './layout';
import {themeColors} from './colors';

export const baseTextStyle = {
  FONT_BOLD: Platform.OS === 'ios' ? '500' : '700',
  SMALL_FONT_SIZE: 12 * SCALE_RATIO,
  LARGE_FONT_SIZE: 18 * SCALE_RATIO,
  PARAGRAPH_LINE_HEIGHT: 23 * SCALE_RATIO,
  DEFAULT_FONT_SIZE: 15,
};

export const themeTextStyle = {
  // here will be custom style, like Header, Title
  SCHEDULE_DETAIL_TALK_TITLE: {
    fontWeight: baseTextStyle.FONT_BOLD,
    color: themeColors.THEME_COLOR,
    fontSize: 28,
  },
};

// TODO: REMOVE THIS ASAPPP

export const DEFAULT_FONT_SIZE = 14 * SCALE_RATIO;
// Fonts in iOS tend to be thinner.
export const FONT_BOLD = Platform.OS === 'ios' ? '500' : '700';
export const SMALL_FONT_SIZE = 12 * SCALE_RATIO;
export const LARGE_FONT_SIZE = 18 * SCALE_RATIO;
export const PARAGRAPH_LINE_HEIGHT = 23 * SCALE_RATIO;
