// @flow
import {StyleSheet} from 'react-native';

import {baseColors} from '../../constants/colors';
import {baseTextStyle} from '../../constants/text';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: 5,
  },
  dateSection: {
    backgroundColor: baseColors.DARK_DIM,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    marginLeft: 10,
    fontWeight: baseTextStyle.FONT_BOLD,
  },
});

export default styles;
