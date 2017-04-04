// @flow

import React from 'react';
import {StyleSheet} from 'react-native';

import {View, Text} from 'components/core-components';
import ScheduleListItem from './ScheduleListItem';
import {GREY, LIGHT_GREY} from 'constants/colors';
import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
} from 'constants/text';

import type {Navigation} from 'data/navigation/Navigation-type';
import type {Schedule} from 'data/schedule/Schedule-type';

type Props = {
  scheduleList: Array<Schedule>;
  navigation: Navigation;
  time: {
    hour: string;
    minute: string;
    period: string;
  };
  showBottomBorder?: boolean;
};

export default function HourListItem(props: Props) {
  let {scheduleList, navigation, time, showBottomBorder = true} = props;
  let {hour, minute, period} = time;
  let HourListContent = (
    <View
      style={[
        styles.hourListContainer,
        showBottomBorder ? styles.bottomBorder : null,
      ]}
    >
      <View style={styles.hourTextContainer}>
        <Text style={styles.hourText}>
          {hour}:{minute}
        </Text>
        <Text style={styles.hourFormat12Text}>{period}</Text>
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
  bottomBorder: {
    borderBottomWidth: 0.75,
    borderBottomColor: LIGHT_GREY,
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
