// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import {TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import DateTime from 'immutable-datetime';

import {View, Text, ScrollView} from '../../../components/core';
import {StageLabel, Carousel} from '../../../components';
import formatDateTime, {isToday} from '../../../helpers/formatDateTime';
import openLink from '../../../helpers/openLink';

import {getScheduleBasedOnCurrentTime} from '../../../helpers';
import {DARK_GREY, LIGHT_BLUE} from '../../../constants/colors';
import DEFAULT_PROFILE_PICTURE from '../../../assets/images/default-profile-picture-square.png';
import {mapsUrl} from '../../../constants/url';
import {SCALE_RATIO} from '../../../constants/layout';
import {EVENT_PLACE, EVENT_DATE} from '../../../constants/aboutApp';

import styles from './HomeScene-style';

import type {NavigationScreenProp} from 'react-navigation';
import type {Schedule} from '../../../data/schedule/Schedule-type';
import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {RootState} from '../../../types';

type State = {
  isEventStarted: boolean,
};

type Props = {
  navigation: NavigationScreenProp<*>,
  scheduleList: Map<string, Schedule>,
  presenterList: Map<string, Presenter>,
};

const DEFAULT_CAROUSEL_HEIGHT = 320;
const AVATAR_SIZE = SCALE_RATIO * 110;
// const DEFAULT_UPCOMING_EVENT_MINUTES_DIFFERENCE = 60;

export class HomeScene extends Component<Props, State> {
  state: State;
  props: Props;
  static navigationOptions = {
    title: 'Home',
  };

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      isEventStarted: false,
    };
  }

  render() {
    let {navigation, scheduleList} = this.props;
    let carouselTitle = '';

    let now = Date.now();

    let groupedSchedule = getScheduleBasedOnCurrentTime(
      Array.from(scheduleList.values()),
      now,
    );

    let events = [];
    let onGoingSchedule = groupedSchedule.get('ongoing') || [];
    let upcomingSchedule = groupedSchedule.get('upcoming') || [];
    let pastSchedule = groupedSchedule.get('past') || [];

    // change this logic if event is more than 1 day
    if (isToday(DateTime.fromString(EVENT_DATE))) {
      events = [...onGoingSchedule, ...upcomingSchedule];
    } else if (now > DateTime.fromString(EVENT_DATE).valueOf()) {
      events = pastSchedule;
    } else {
      events = upcomingSchedule;
    }

    let filteredEvents = events.filter((event) => event.presenters).slice(0, 5);

    return (
      <ScrollView style={styles.root}>
        <View style={{paddingVertical: 10}}>
          <Text style={styles.carouselTitle}>{carouselTitle}</Text>
          <Carousel
            height={DEFAULT_CAROUSEL_HEIGHT}
            data={filteredEvents}
            onPress={(schedule) => {
              navigation.navigate('ScheduleDetailScene', {
                schedule,
              });
            }}
            contentRender={this._renderCard}
          />
        </View>
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            style={styles.detailsItem}
            onPress={() => {
              openLink(mapsUrl + EVENT_PLACE.coordinate);
            }}
          >
            <Icon
              name="location-on"
              color={DARK_GREY}
              size={34}
              style={{paddingRight: 10}}
            />
            <View style={styles.detailsItemText}>
              <Text style={styles.detailsItemTitleText}>WHERE</Text>
              <Text style={[styles.contentText, {color: LIGHT_BLUE}]}>
                {EVENT_PLACE.name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.detailsItem}>
            <Icon
              name="today"
              color={DARK_GREY}
              size={34}
              style={{paddingRight: 10}}
            />
            <View style={styles.detailsItemText}>
              <Text style={styles.detailsItemTitleText}>WHEN</Text>
              <Text style={styles.contentText}>
                {formatDateTime(EVENT_DATE, 'DATE')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _renderCard(schedule) {
    if (schedule == null) {
      return null;
    }
    let {presenterList} = this.props;
    let avatarContent = [];
    let {presenters} = schedule;
    if (presenters) {
      let length = presenters.length;
      presenters.forEach((presenterID) => {
        let presenter = presenterList.get(presenterID);
        if (presenter) {
          avatarContent.push(
            <View
              key={presenter.id}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={presenter.profilePictureUri || DEFAULT_PROFILE_PICTURE}
                style={{
                  width: Math.min(AVATAR_SIZE / (length * 0.4), AVATAR_SIZE),
                  height: Math.min(AVATAR_SIZE / (length * 0.4), AVATAR_SIZE),
                  borderRadius:
                    Math.min(AVATAR_SIZE / (length * 0.4), AVATAR_SIZE) / 2,
                }}
              />
            </View>,
          );
        }
      });
    }
    return (
      <View
        key={schedule.id}
        raised
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: 'white',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingBottom: 10,
          }}
        >
          {avatarContent}
        </View>
        <View>
          <Text style={styles.title}>{schedule.talkTitle}</Text>
          <Text style={styles.date}>
            {formatDateTime(schedule.dateString, 'DATE_TIME')}
          </Text>
          <View style={styles.footer}>
            <View style={styles.stageContainer}>
              {schedule.stage ? <StageLabel stage={schedule.stage} /> : null}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    scheduleList: state.schedule.scheduleList,
    presenterList: state.presenterList,
  };
}

export default connect(mapStateToProps)(HomeScene);
