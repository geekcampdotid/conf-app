// @flow

import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text} from '../../../components/core';
import ScheduleListItem from './ScheduleListItem';
import {GREY} from '../../../constants/colors';
import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
} from '../../../constants/text';

import type {NavigationScreenProp} from 'react-navigation';
import type {Schedule} from '../../../data/schedule/Schedule-type';

type Props = {
  scheduleList: Array<Schedule>,
  navigation: NavigationScreenProp<*>,
  time: {
    hours: string,
    minutes: string,
    periods: string,
  },
};

export default function HourListItem(props: Props) {
  let {scheduleList, navigation, time} = props;
  let {hours, minutes, periods} = time;
  let HourListContent = (
    <View style={[styles.hourListContainer]}>
      <View style={styles.hourTextContainer}>
        <Text style={styles.hourText}>
          {hours}:{minutes}
        </Text>
        <Text style={styles.hourFormat12Text}>{periods}</Text>
      </View>
      <View style={styles.filteredScheduleContainer}>
        {scheduleList.map((schedule, index) => {
          return (
            <ScheduleListItem
              key={schedule.id}
              schedule={schedule}
              isLastItem={index === scheduleList.length - 1}
              navigation={navigation}
            />
          );
        })}
      </View>
    </View>
  );
  return scheduleList.length === 0 ? null : HourListContent;
}

const styles = StyleSheet.create({
  hourListContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  hourTextContainer: {
    flex: 1,
    marginRight: 15,
    alignItems: 'flex-end',
  },
  hourText: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
    color: GREY,
  },
  hourFormat12Text: {
    fontSize: DEFAULT_FONT_SIZE,
    color: GREY,
  },
  filteredScheduleContainer: {
    flex: 4,
  },
});
