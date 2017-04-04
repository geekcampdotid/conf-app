// @flow
import {StyleSheet} from 'react-native';

import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
  PARAGRAPH_LINE_HEIGHT,
} from 'constants/text';
import {THEME_COLOR} from 'constants/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 22,
    minHeight: '100%',
  },
  subtitleText: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
    color: THEME_COLOR,
    textAlign: 'center',
    paddingTop: 10,
  },
  headerSection: {
    paddingTop: 20,
  },
  description: {
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: PARAGRAPH_LINE_HEIGHT,
  },
});

export default styles;
