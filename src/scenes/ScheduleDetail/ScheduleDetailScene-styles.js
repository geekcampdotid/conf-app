// @flow
import {StyleSheet} from 'react-native';

import {FONT_BOLD} from 'constants/text';
import {THEME_COLOR} from 'constants/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  title: {
    fontWeight: FONT_BOLD,
    color: THEME_COLOR,
    fontSize: 28,
  },
  section: {
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  scheduleDetailContainer: {
    flex: 1,
  },
  scheduleDetailSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  scheduleDetailSectionField: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scheduleDetailIcon: {
    marginRight: 10,
  },
  textStage: {
    fontSize: 12,
  },
  scheduleDetail: {
    marginVertical: 0,
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  bookmarkContainer: {
    position: 'absolute',
    opacity: 0,
    right: 10,
    zIndex: 2,
  },
});

export default styles;
