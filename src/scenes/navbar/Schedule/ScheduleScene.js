// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {List, ButtonGroup} from 'react-native-elements';

import styles, {CONTAINER_BORDER_RADIUS} from './ScheduleScene-style';
import HourListItem from './HourListItem';
import formatDateTime, {getTimeObject} from 'helpers/formatDateTime';

import {getScheduleHours} from 'helpers/scheduleFilter';
import {View} from 'components/core-components';
import {NoItemFound} from 'components/components';
import {THEME_COLOR} from 'constants/colors';

import type {Schedule} from 'data/schedule/Schedule-type';
import type {Navigation} from 'data/navigation/Navigation-type';
import type {RootState} from 'types/RootState';

type Props = {
  scheduleList: Map<string, Schedule>;
  navigation: Navigation;
};

type State = {
  selectedTabIndex: number;
  selectedStageFilter: string;
};

const NO_SCHEDULE_MESSAGE = 'No schedule available';
const STAGE1 = 'The Hall';
const STAGE2 = 'SCTV Studio';
const ALLSTAGE = 'All Stages';

const TAB_MENU = [ALLSTAGE, STAGE1, STAGE2];
const DEFAULT_SELECTED_TAB_INDEX = 0;

export class ScheduleScene extends Component {
  state: State;
  props: Props;
  _flatList: Object;
  static navigationOptions = {
    title: 'Schedule',
  };

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      selectedTabIndex: DEFAULT_SELECTED_TAB_INDEX,
      selectedStageFilter: TAB_MENU[DEFAULT_SELECTED_TAB_INDEX],
    };
  }
  render() {
    let {scheduleList, navigation} = this.props;
    let {selectedTabIndex, selectedStageFilter} = this.state;
    let filteredScheduleList = new Map();
    if (selectedStageFilter !== TAB_MENU[0]) {
      for (let schedule of scheduleList.values()) {
        let {stage} = schedule;
        if (stage) {
          if (stage === selectedStageFilter) {
            filteredScheduleList.set(schedule.id, schedule);
          }
        } else {
          filteredScheduleList.set(schedule.id, schedule);
        }
      }
    } else {
      filteredScheduleList = new Map(scheduleList);
    }

    let data = getScheduleHours(filteredScheduleList);

    return (
      <View style={{flex: 1}}>
        <View style={styles.tabBarContainer}>
          <ButtonGroup
            buttons={TAB_MENU}
            selectedIndex={selectedTabIndex}
            onPress={this._onTabPress}
            containerStyle={styles.tabBar}
            selectedBackgroundColor={THEME_COLOR}
            textStyle={styles.tabTextDefault}
            selectedTextStyle={styles.tabTextActive}
            underlayColor="rgba(0, 0, 0, 0.3)"
            containerBorderRadius={CONTAINER_BORDER_RADIUS}
          />
        </View>
        <View style={styles.listContainer}>
          {data.length > 0
            ? <List containerStyle={styles.scheduleContainer}>
                <FlatList
                  ref={(flatList) => {
                    this._flatList = flatList;
                  }}
                  showsVerticalScrollIndicator={false}
                  data={data}
                  renderItem={({item}) => {
                    let scheduleListPerTime = Array.from(
                      filteredScheduleList.values()
                    ).filter((schedule) => {
                      return (
                        formatDateTime(schedule.dateString, 'DATE_TIME') ===
                        formatDateTime(item, 'DATE_TIME')
                      );
                    });
                    return (
                      <HourListItem
                        scheduleList={scheduleListPerTime}
                        time={getTimeObject(item)}
                        navigation={navigation}
                      />
                    );
                  }}
                  keyExtractor={(item) => item}
                />
              </List>
            : <View style={styles.scheduleContainer}>
                <NoItemFound text={NO_SCHEDULE_MESSAGE} />
              </View>}
        </View>
      </View>
    );
  }

  _onTabPress(newIndex: number) {
    let {selectedTabIndex} = this.state;
    if (selectedTabIndex !== newIndex) {
      this.setState({
        selectedTabIndex: newIndex,
        selectedStageFilter: TAB_MENU[newIndex],
      }, () => {
        this._flatList.scrollToOffset({x: 0, y: 0, animated: false});
      });
    }
  }
}

function mapStateToProps(state: RootState) {
  return {
    scheduleList: state.schedule.scheduleList,
  };
}

export default connect(mapStateToProps)(ScheduleScene);
