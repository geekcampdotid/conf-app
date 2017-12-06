// @flow
import {StyleSheet} from 'react-native';

import {baseColors} from '../../constants/colors';

const styles = StyleSheet.create({
  scheduleDetailContainer: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  scheduleDetailSection: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  scheduleDetailSectionKeyField: {
    flex: 1,
  },
  scheduleDetailIcon: {
    marginRight: 10,
  },
  stageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textStage: {
    fontSize: 12,
  },
  scheduleDetailKey: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  scheduleDetailSectionValueField: {
    flex: 2,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  avatarStyle: {
    borderWidth: 0.5,
    borderColor: baseColors.GREY,
  },
  presenterItemContainer: {
    paddingLeft: 0,
  },
});

export default styles;
