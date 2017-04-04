// @flow
import {StyleSheet} from 'react-native';

import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
  PARAGRAPH_LINE_HEIGHT,
} from 'constants/text';

const THEME_COLOR = '#fd8224';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 22,
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
    marginBottom: 10,
  },
  bold: {
    fontWeight: FONT_BOLD,
    fontSize: DEFAULT_FONT_SIZE + 1,
  },
  slideContainer: {
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  imageSlide: {
    width: 125,
    height: 125,
  },
  titleSlide: {
    paddingTop: 5,
    marginBottom: 5,
    fontWeight: FONT_BOLD,
    fontSize: DEFAULT_FONT_SIZE,
    color: THEME_COLOR,
    textAlign: 'center',
  },
});

export default styles;
