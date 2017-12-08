// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import {TouchableOpacity, Image} from 'react-native';
import {Icon} from 'react-native-elements';

import {View, Text, ScrollView} from '../../../components/core';
import {StageLabel, Carousel} from '../../../components';
import formatDateTime from '../../../helpers/formatDateTime';
import openLink from '../../../helpers/openLink';

import getHighlighTalks from '../../../helpers/getHighlighTalks';
import {DARK_GREY, LIGHT_BLUE} from '../../../constants/colors';
import DEFAULT_PROFILE_PICTURE from '../../../assets/images/default-profile-picture-square.png';
import {mapsUrl} from '../../../constants/url';
import {SCALE_RATIO} from '../../../constants/layout';
import {
  EVENT_PLACE,
  EVENT_DATE,
  FIRST_TALK_TIME,
  LAST_TALK_END,
} from '../../../constants/aboutApp';

import styles from './HomeScene-style';

import type {Schedule} from '../../../data/schedule/Schedule-type';
import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {Navigation} from '../../../data/navigation/Navigation-type';
import type {RootState} from '../../../types';

type State = {
  isEventStarted: boolean,
};

type Props = {
  navigation: Navigation,
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
    title: 'HOME',
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
    let today = new Date();
    let filteredDate = new Date(today);
    let carouselTitle = '';
    if (today.toISOString() < FIRST_TALK_TIME.toISOString()) {
      carouselTitle = new Date('2017-07-15T03:07:20').toISOString();
      filteredDate = new Date(FIRST_TALK_TIME);
    } else if (
      LAST_TALK_END &&
      today.toISOString() >= new Date(LAST_TALK_END).toISOString()
    ) {
      carouselTitle = 'Past Talks';
      filteredDate = new Date(FIRST_TALK_TIME);
    } else {
      carouselTitle = 'Highlighted Talks';
    }
    let highLightEvents = getHighlighTalks(
      scheduleList,
      filteredDate.toISOString(),
    );

    // let upcomingEventDate = new Date(filteredDate);
    // upcomingEventDate.setUTCMinutes(
    //   upcomingEventDate.getUTCMinutes() +
    //     DEFAULT_UPCOMING_EVENT_MINUTES_DIFFERENCE
    // );
    //
    // let upcomingEvents = Array.from(
    //   getCurrentEvent(scheduleList, upcomingEventDate.toISOString()).values()
    // );

    let events = [...highLightEvents];
    if (events.length === 0) {
      filteredDate = new Date(FIRST_TALK_TIME);
      highLightEvents = getHighlighTalks(
        scheduleList,
        filteredDate.toISOString(),
      );
      carouselTitle = 'HighLight Talks';
      events = [...highLightEvents];
    } else if (events.length === 1) {
      events = [...events, ...highLightEvents];
    }

    return (
      <ScrollView style={styles.root}>
        <View style={{paddingVertical: 10}}>
          <Text style={styles.carouselTitle}>{carouselTitle}</Text>
          <Carousel
            height={DEFAULT_CAROUSEL_HEIGHT}
            data={events}
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
                {formatDateTime(EVENT_DATE.toISOString(), 'DATE')}
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

HomeScene.navigationOptions = {
  title: 'Home',
};

function mapStateToProps(state: RootState) {
  return {
    scheduleList: state.schedule.scheduleList,
    presenterList: state.presenterList,
  };
}

export default connect(mapStateToProps)(HomeScene);
