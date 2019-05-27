// @flow

import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {View, Text} from '../../../components/core';
import {StageLabel} from '../../../components';
import {GREY, LIGHT_GREY} from '../../../constants/colors';
import {FONT_BOLD, DEFAULT_FONT_SIZE} from '../../../constants/text';
import DEFAULT_AVATAR from '../../../assets/images/default-profile-pic.png';

import type {NavigationScreenProp} from 'react-navigation';
import type {Schedule} from '../../../data/schedule/Schedule-type';
import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {RootState} from '../../../types';

type Props = {
  presenterList: Map<string, Presenter>,
  navigation: NavigationScreenProp<*>,
  schedule: Schedule,
  isLastItem: boolean,
};

export function ScheduleListItem(props: Props) {
  let {schedule, isLastItem, navigation, presenterList} = props;
  let presenterPicture = {uri: ''};
  let presenterName = 'Unknown Presenter';
  let lastItemStyle = isLastItem
    ? {borderBottomWidth: 0, marginBottom: 5}
    : {borderBottomWidth: 0.75};

  let presenter =
    schedule.presenters && presenterList.get(schedule.presenters[0]);

  if (!presenter || !schedule.stage) {
    return (
      <View style={[styles.notEventContainer, lastItemStyle]}>
        <View style={[styles.eventContainer, styles.notEvent]}>
          <Text style={styles.eventName}>{schedule.talkTitle}</Text>
        </View>
      </View>
    );
  }
  presenterPicture = presenter.profilePictureUri || DEFAULT_AVATAR;
  presenterName = presenter.name;

  return (
    <TouchableOpacity
      style={[styles.scheduleListContainer, lastItemStyle]}
      onPress={() => {
        let {presenters, stage} = schedule;
        if (presenters && stage) {
          navigation.navigate('ScheduleDetailScene', {schedule});
        }
      }}
    >
      <Avatar
        containerStyle={styles.profilePic}
        width={30}
        height={30}
        rounded
        source={presenterPicture}
      />
      <View style={styles.eventContainer}>
        <Text style={styles.speakerName}>{presenterName}</Text>
        <Text style={styles.eventName}>{schedule.talkTitle}</Text>
        <StageLabel stage={schedule.stage} textStyle={{fontSize: 12}} />
      </View>
    </TouchableOpacity>
  );
}

let mapStateToProps = (state: RootState) => {
  return {
    presenterList: state.presenterList,
  };
};

export default connect(mapStateToProps)(ScheduleListItem);

const styles = StyleSheet.create({
  scheduleListContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,
    borderBottomWidth: 0.75,
    borderBottomColor: LIGHT_GREY,
    marginBottom: 10,
  },
  profilePic: {
    marginRight: 8,
  },
  eventContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  speakerName: {
    marginTop: 2,
    color: GREY,
    fontSize: DEFAULT_FONT_SIZE,
  },
  eventName: {
    fontSize: DEFAULT_FONT_SIZE,
    marginBottom: 4,
    flexWrap: 'wrap',
    fontWeight: FONT_BOLD,
  },
  notEventContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    paddingLeft: 10,
  },
  notEvent: {
    justifyContent: 'center',
    paddingBottom: 15,
    paddingTop: 10,
  },
});
