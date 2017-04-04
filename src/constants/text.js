// @flow
import {Platform} from 'react-native';
import {SCALE_RATIO} from './layout';

export const DEFAULT_FONT_SIZE = 14 * SCALE_RATIO;
// Fonts in iOS tend to be thinner.
export const FONT_BOLD = (Platform.OS === 'ios') ? '500' : '700';
export const SMALL_FONT_SIZE = 12 * SCALE_RATIO;
export const LARGE_FONT_SIZE = 18 * SCALE_RATIO;
export const PARAGRAPH_LINE_HEIGHT = 23 * SCALE_RATIO;
