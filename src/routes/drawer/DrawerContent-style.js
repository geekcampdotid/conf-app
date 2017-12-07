// @flow

import {StyleSheet, Platform} from 'react-native';

import {DARK_GREY, WHITE} from '../../constants/colors';
import {DEFAULT_FONT_SIZE} from '../../constants/text';
import {SCALE_RATIO} from '../../constants/layout';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  root: {
    flex: 1,
    backgroundColor: WHITE,
    paddingHorizontal: SCALE_RATIO * 8,
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  logoContainer: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  menuContainer: {
    flex: 1,
    backgroundColor: WHITE,
  },
  menuListView: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginTop: 10,
  },
  menuListItem: {
    borderBottomWidth: 0,
    marginVertical: 7.5,
  },
  menuText: {
    fontSize: DEFAULT_FONT_SIZE,
    color: DARK_GREY,
  },
  footerContainer: {
    justifyContent: 'center',
    paddingBottom: 10,
  },
  footerText: {
    fontSize: DEFAULT_FONT_SIZE,
    textAlign: 'center',
  },
  footerLogoContainer: {
    paddingHorizontal: 70,
    paddingTop: 10,
  },
});

export default styles;
