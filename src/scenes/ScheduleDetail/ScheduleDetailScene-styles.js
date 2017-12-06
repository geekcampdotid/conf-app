// @flow
import {StyleSheet} from 'react-native';

import {themeTextStyle} from '../../constants/text';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  title: themeTextStyle.SCHEDULE_DETAIL_TALK_TITLE,
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
