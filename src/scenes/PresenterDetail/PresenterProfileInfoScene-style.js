// @flow

import {StyleSheet} from 'react-native';
import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
  PARAGRAPH_LINE_HEIGHT,
} from 'constants/text';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    padding: 22,
  },
  jobTitle: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
  },
  descriptionContainer: {
    paddingTop: 10,
    height: '100%',
  },
  descriptionText: {
    fontSize: DEFAULT_FONT_SIZE,
    lineHeight: PARAGRAPH_LINE_HEIGHT,
  },
});

export default styles;
