// @flow
import {StyleSheet} from 'react-native';
import {SCENE_DEFAULT, THEME_COLOR} from '../../constants/colors';
import {FONT_BOLD, DEFAULT_FONT_SIZE} from '../../constants/text';
import {SCALE_RATIO} from '../../constants/layout';

import getScreenSize from '../../helpers/getScreenSize';

let {width: screenWidth} = getScreenSize();

export const CONTAINER_BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  buttonGroupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    width: screenWidth - 20,
    height: SCALE_RATIO * 35,
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
  selectedDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
  },
  selectedDateText: {
    marginLeft: 10,
    fontWeight: FONT_BOLD,
  },
  scheduleListContainer: {
    marginTop: 0,
    flex: 6.7,
    backgroundColor: SCENE_DEFAULT,
    paddingHorizontal: 20,
    borderColor: 'transparent',
  },
});

export default styles;
