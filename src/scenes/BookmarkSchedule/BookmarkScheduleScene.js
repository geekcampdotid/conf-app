// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {ButtonGroup, List} from 'react-native-elements';

import {View} from '../../components/core-components';
import {NoItemFound} from '../../components/components';
import HourListItem from '../navbar/Schedule/HourListItem';
import formatDateTime, {getTimeObject} from '../../helpers/formatDateTime';
import {getScheduleHours} from '../../helpers/scheduleFilter';
import convertArrayToMap from '../../helpers/convertArrayToMap';

import {THEME_COLOR} from '../../constants/colors';
import styles, {CONTAINER_BORDER_RADIUS} from './BookmarkScheduleScene-style';

import type {Navigation} from '../../data/navigation/Navigation-type';
import type {Schedule} from '../../data/schedule/Schedule-type';
import type {RootState} from '../../types';

const STAGE1 = 'The Hall';
const STAGE2 = 'SCTV Studio';
const ALLSTAGE = 'All Stages';

const TAB_MENU = [ALLSTAGE, STAGE1, STAGE2];

const DEFAULT_SELECTED_TAB_INDEX = 0;

type Props = {
  navigation: Navigation,
  bookmarkList: Array<string>,
  scheduleList: Map<string, Schedule>,
};

type State = {
  selectedTabIndex: number,
  selectedStageFilter: string,
};

export class BookmarkScheduleScene extends Component<Props, State> {
  _flatList: ?Object;
  static navigationOptions = {
    title: 'My Schedule',
  };
  constructor() {
    super(...arguments);

    this.state = {
      selectedTabIndex: DEFAULT_SELECTED_TAB_INDEX,
      selectedStageFilter: TAB_MENU[DEFAULT_SELECTED_TAB_INDEX],
    };
  }

  render() {
    let {selectedTabIndex, selectedStageFilter} = this.state;
    let {scheduleList, bookmarkList, navigation} = this.props;
    let bookmarkScheduleList = Array.from(scheduleList.values()).filter(
      (schedule) => {
        if (selectedStageFilter !== TAB_MENU[0]) {
          let {stage} = schedule;
          return (
            bookmarkList.includes(schedule.id) &&
            (stage && stage === selectedStageFilter)
          );
        } else {
          return bookmarkList.includes(schedule.id);
        }
      },
    );

    let bookmarkScheduleListMap = convertArrayToMap(bookmarkScheduleList);
    let data = getScheduleHours(bookmarkScheduleListMap);

    let listComponent;
    if (bookmarkScheduleList.length > 0) {
      listComponent = (
        <FlatList
          ref={(flatList) => {
            this._flatList = flatList;
          }}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({item, index}) => {
            let scheduleList = bookmarkScheduleList.filter((schedule) => {
              return (
                formatDateTime(schedule.dateString, 'DATE_TIME') ===
                formatDateTime(item, 'DATE_TIME')
              );
            });
            return (
              <HourListItem
                time={getTimeObject(item)}
                scheduleList={scheduleList}
                navigation={navigation}
                showBottomBorder={!(index === data.length - 1)}
              />
            );
          }}
          keyExtractor={(item) => item}
        />
      );
    } else {
      listComponent = (
        <NoItemFound
          text={`No Bookmarks to Show`}
          iconName="bookmark"
          iconType="material"
        />
      );
    }
    return (
      <View style={styles.root}>
        <View style={styles.buttonGroupContainer}>
          <ButtonGroup
            buttons={TAB_MENU}
            selectedIndex={selectedTabIndex}
            onPress={(newIndex: number) => {
              this.setState(
                {
                  selectedTabIndex: newIndex,
                  selectedStageFilter: TAB_MENU[newIndex],
                },
                () => {
                  this._flatList &&
                    this._flatList.scrollToOffset({
                      x: 0,
                      y: 0,
                      animated: false,
                    });
                },
              );
            }}
            containerStyle={styles.tabBar}
            selectedBackgroundColor={THEME_COLOR}
            textStyle={styles.tabTextDefault}
            selectedTextStyle={styles.tabTextActive}
            underlayColor="rgba(0, 0, 0, 0.3)"
            containerBorderRadius={CONTAINER_BORDER_RADIUS}
          />
        </View>
        <List containerStyle={styles.scheduleListContainer}>
          {listComponent}
        </List>
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    bookmarkList: state.schedule.bookmarkedScheduleList,
    scheduleList: state.schedule.scheduleList,
  };
}

export default connect(mapStateToProps)(BookmarkScheduleScene);
