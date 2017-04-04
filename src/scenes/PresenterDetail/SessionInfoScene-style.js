// @flow
import {StyleSheet} from 'react-native';

import {DARK_DIM} from 'constants/colors';
import {FONT_BOLD} from 'constants/text';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 5,
  },
  dateSection: {
    backgroundColor: DARK_DIM,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    fontWeight: FONT_BOLD,
  },
});

export default styles;
