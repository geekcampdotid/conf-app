// @flow
import {StyleSheet} from 'react-native';
import {SCENE_DEFAULT, THEME_COLOR} from 'constants/colors';
import {FONT_BOLD, DEFAULT_FONT_SIZE} from 'constants/text';
import {SCALE_RATIO} from 'constants/layout';

import getScreenSize from 'helpers/getScreenSize';

let {width: screenWidth} = getScreenSize();

export const CONTAINER_BORDER_RADIUS = 5;

const styles = StyleSheet.create({
  tabBarContainer: {
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
  listContainer: {
    flex: 6.7,
    backgroundColor: SCENE_DEFAULT,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderColor: 'transparent',
    marginTop: 0,
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 15,
  },
  filterCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 10,
  },
  dropdownIcon: {
    marginLeft: 5,
    paddingTop: 1,
  },
  filterNameText: {
    flex: 1.4,
    paddingLeft: 5,
  },
  filterValueContainer: {
    flex: 4,
    flexDirection: 'row',
  },
});

export default styles;
