// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';

import {View, Text, ScrollView} from '../../components/core-components';
import ScheduleDetailComponent from './ScheduleDetailComponent';

import styles from './ScheduleDetailScene-styles';
import {VIEW_SHADOW} from '../../constants/genericStyle';
import {themeColors} from '../../constants/colors';

import type {Schedule} from '../../data/schedule/Schedule-type';
import type {Presenter} from '../../data/presenter/Presenter-type';
import type {RootState, Dispatch} from '../../types';
import type {NavigateFunction} from '../../data/navigation/Navigation-type';

type Navigation = {
  navigate: NavigateFunction,
  state: {
    params: {
      schedule?: Schedule,
    },
  },
};

type Props = {
  navigation: Navigation,
  presenterList: Map<string, Presenter>,
  bookmarkList: Array<string>,
  onBookmarkSaved: (scheduleID: string) => void,
  onBookmarkRemoved: (scheduleID: string) => void,
  showSnackBar: (
    textMessage: string,
    actionText: string,
    actionHandler: Function,
  ) => void,
};

type State = {
  bookmarkLayout: Object,
};

export class ScheduleDetailScene extends Component<Props, State> {
  _actionButton: ?Object;
  bookmarkAnimationInterval: number;
  _isBookmarked: boolean;

  static navigationOptions = {
    title: ({state}) => {
      return state.params.schedule.talkTitle;
    },
  };

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      bookmarkLayout: {},
    };

    let {bookmarkList, navigation} = this.props;
    let {schedule} = navigation.state.params;
    this._isBookmarked =
      (schedule && this._checkBookmark(bookmarkList, schedule.id)) || false;
  }

  componentDidMount() {
    if (this._actionButton) {
      if (this.bookmarkAnimationInterval == null) {
        this._actionButton.zoomIn();
      }
      if (!this._isBookmarked) {
        this.bookmarkAnimationInterval = this._setActionButtonAnimationInterval();
      }
    }
  }

  componentWillReceiveProps(newProps: Props) {
    let {bookmarkList, navigation} = newProps;
    let {schedule} = navigation.state.params;
    this._isBookmarked =
      (schedule && this._checkBookmark(bookmarkList, schedule.id)) || false;

    if (this._isBookmarked) {
      clearInterval(this.bookmarkAnimationInterval);
    } else {
      this.bookmarkAnimationInterval = this._setActionButtonAnimationInterval();
    }
  }

  componentWillUnmount() {
    clearInterval(this.bookmarkAnimationInterval);
  }

  render() {
    let {presenterList, navigation} = this.props;
    let {schedule} = navigation.state.params;
    if (schedule == null || !schedule.presenters || !schedule.stage) {
      return null;
    }
    return (
      <View style={styles.root}>
        <ScrollView>
          <View
            onLayout={({nativeEvent: {layout: {height}}}) =>
              this.setState({
                bookmarkLayout: {
                  ...VIEW_SHADOW,
                  top: height - 27,
                  opacity: 1,
                  backgroundColor: 'transparent',
                },
              })
            }
          >
            <View style={styles.section}>
              <Text style={styles.title}>{schedule.talkTitle}</Text>
            </View>
            <View style={[styles.section, {paddingBottom: 15}]}>
              <Text>{schedule.description}</Text>
            </View>
          </View>
          <View style={{backgroundColor: 'white', ...VIEW_SHADOW}}>
            <View style={[styles.section, styles.scheduleDetail]}>
              <ScheduleDetailComponent
                time={schedule.dateString}
                stage={schedule.stage}
                presenters={schedule.presenters}
                presenterList={presenterList}
                navigate={navigation.navigate}
              />
            </View>
          </View>
          <View style={[styles.bookmarkContainer, this.state.bookmarkLayout]}>
            <Animatable.View
              ref={(actionButton) => (this._actionButton = actionButton)}
              useNativeDriver={true}
              style={{backgroundColor: 'transparent'}}
            >
              <Icon
                name="bookmark"
                raised
                reverse
                color={
                  this._isBookmarked
                    ? themeColors.UNBOOKMARK_COLOR
                    : themeColors.BOOKMARK_COLOR
                }
                size={18}
                onPress={() =>
                  schedule && this._onBookmarkButtonPressed(schedule.id)
                }
              />
            </Animatable.View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _checkBookmark(bookmarkList: Array<string>, scheduleID: string) {
    return bookmarkList.includes(scheduleID);
  }

  _setActionButtonAnimationInterval() {
    return setInterval(() => {
      this._actionButton && this._actionButton.pulse();
    }, 3000);
  }

  _onBookmarkButtonPressed(scheduleID: string) {
    let {onBookmarkSaved, onBookmarkRemoved, showSnackBar} = this.props;
    if (this._isBookmarked) {
      onBookmarkRemoved(scheduleID);
      showSnackBar('Bookmark removed', 'Undo', () =>
        onBookmarkSaved(scheduleID),
      );
    } else {
      onBookmarkSaved(scheduleID);
      showSnackBar('Bookmark added', 'Undo', () =>
        onBookmarkRemoved(scheduleID),
      );
    }
    this._actionButton && this._actionButton.bounceIn();
  }
}

function mapStateToProps(state: RootState) {
  return {
    presenterList: state.presenterList,
    bookmarkList: state.schedule.bookmarkedScheduleList,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    showSnackBar: (
      textMessage: string,
      actionText: string,
      actionHandler: Function,
    ) => {
      dispatch({
        type: 'SHOW_SNACKBAR_REQUESTED',
        textMessage,
        actionButton: {
          actionText,
          actionHandler,
        },
      });
    },
    onBookmarkSaved: (scheduleID: string) => {
      dispatch({
        type: 'NEW_BOOKMARK_SELECTED',
        scheduleID,
      });
    },
    onBookmarkRemoved: (scheduleID: string) => {
      dispatch({
        type: 'BOOKMARK_REMOVED',
        scheduleID,
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  ScheduleDetailScene,
);
