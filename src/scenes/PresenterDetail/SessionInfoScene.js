// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';

import {View} from '../../components/core';
import HourListItem from '../navbar/Schedule/HourListItem';

import {getScheduleHours} from '../../helpers/scheduleFilter';
import formatDateTime, {getTimeObject} from '../../helpers/formatDateTime';

import styles from './SessionInfoScene-style';

import type {Presenter} from '../../data/presenter/Presenter-type';
import type {Schedule} from '../../data/schedule/Schedule-type';
import type {Navigation} from '../../data/navigation/Navigation-type';
import type {RootState} from '../../types';

type Props = {
  presenter: Presenter,
  navigation: Navigation,
  scheduleList: Map<string, Schedule>,
};

export class SessionInfoScene extends Component<Props, void> {
  shownDate: string;

  render() {
    let {presenter, scheduleList, navigation} = this.props;
    let presenterSchedules = new Map();
    for (let schedule of scheduleList.values()) {
      let {presenters} = schedule;
      if (presenters && presenters.includes(presenter.id)) {
        presenterSchedules.set(schedule.id, schedule);
      }
    }

    let data = getScheduleHours(presenterSchedules);

    return (
      <View style={styles.root}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item}) => {
            let filteredPresenterSchedule = Array.from(
              presenterSchedules.values(),
            ).filter((schedule) => {
              return (
                formatDateTime(schedule.dateString, 'DATE_TIME') ===
                formatDateTime(item, 'DATE_TIME')
              );
            });

            return (
              <View>
                <HourListItem
                  time={getTimeObject(item)}
                  scheduleList={filteredPresenterSchedule}
                  navigation={navigation}
                />
              </View>
            );
          }}
          keyExtractor={(item) => item}
        />
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    scheduleList: state.schedule.scheduleList,
  };
}

export default connect(mapStateToProps)(SessionInfoScene);
