// @flow

import {StyleSheet, PixelRatio} from 'react-native';
import {SCENE_DEFAULT, THEME_COLOR} from '../../../constants/colors';
import {FONT_BOLD, DEFAULT_FONT_SIZE} from '../../../constants/text';

export const CONTAINER_BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
  },
  tabBar: {
    width: 250,
    height: PixelRatio.roundToNearestPixel(35),
    backgroundColor: 'white',
    borderRadius: CONTAINER_BORDER_RADIUS,
  },
  tabTextActive: {
    fontWeight: FONT_BOLD,
    color: 'white',
    fontSize: DEFAULT_FONT_SIZE,
  },
  tabTextDefault: {
    fontWeight: FONT_BOLD,
    color: THEME_COLOR,
    fontSize: DEFAULT_FONT_SIZE,
  },
  searchContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 6,
    backgroundColor: SCENE_DEFAULT,
  },
  searchTextInputContainer: {
    flex: 1,
    height: 40,
  },
  searchTextInput: {
    fontSize: DEFAULT_FONT_SIZE,
  },
});

export default styles;
