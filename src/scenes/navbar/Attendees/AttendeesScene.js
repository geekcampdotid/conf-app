// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {connect} from 'react-redux';
import {Icon, ButtonGroup} from 'react-native-elements';

import {View, TextInput} from '../../../components/core';
import PresenterListView from './PresenterListView';
import ExhibitorListView from './ExhibitorListView';
import {THEME_COLOR} from '../../../constants/colors';
import styles, {CONTAINER_BORDER_RADIUS} from './AttendeesScene-style';

import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {Exhibitor} from '../../../data/exhibitor/Exhibitor-type';
import type {NavigationScreenProp} from 'react-navigation';
import type {RootState} from '../../../types';

const PRESENTERS = 'Presenters';
const EXHIBITORS = 'Exhibitors';

const TAB_MENU = [PRESENTERS, EXHIBITORS];
const DEFAULT_SELECTED_TAB_INDEX = 0;

type Props = {
  navigation: NavigationScreenProp<*>,
  presenterList: Map<string, Presenter>,
  exhibitorList: Map<string, Exhibitor>,
};

type State = {
  selectedTabIndex: number,
  searchValue: string,
};

export class AttendeesScene extends Component<Props, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      selectedTabIndex: DEFAULT_SELECTED_TAB_INDEX,
      searchValue: '',
    };
  }

  render() {
    let {selectedTabIndex, searchValue} = this.state;
    return (
      <View style={styles.root}>
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
        <View raised style={styles.searchContainer}>
          <Icon raised reverse name="search" color={THEME_COLOR} size={22} />
          <TextInput
            textStyle={styles.searchTextInput}
            style={styles.searchTextInputContainer}
            autoCorrect={false}
            value={searchValue}
            placeholder={`Search ${TAB_MENU[selectedTabIndex]}`}
            onChangeText={(text) => this.setState({searchValue: text})}
          />
        </View>
        <View style={styles.listContainer}>{this._renderListView()}</View>
      </View>
    );
  }

  _onTabPress(newIndex: number) {
    let {selectedTabIndex} = this.state;
    if (selectedTabIndex !== newIndex) {
      this.setState({selectedTabIndex: newIndex, searchValue: ''});
    }
  }

  _renderListView() {
    let {selectedTabIndex, searchValue} = this.state;
    let {presenterList, exhibitorList, navigation} = this.props;

    switch (TAB_MENU[selectedTabIndex]) {
      case PRESENTERS: {
        return (
          <PresenterListView
            presenterList={presenterList}
            searchValue={searchValue}
            navigation={navigation}
          />
        );
      }
      case EXHIBITORS: {
        return (
          <ExhibitorListView
            exhibitorList={exhibitorList}
            searchValue={searchValue}
            navigation={navigation}
          />
        );
      }
      default: {
        return (
          <PresenterListView
            presenterList={presenterList}
            searchValue={this.state.searchValue}
            navigation={navigation}
          />
        );
      }
    }
  }
}

function mapStateToProps(state: RootState) {
  return {
    presenterList: state.presenterList,
    exhibitorList: state.exhibitorList,
  };
}

export default connect(mapStateToProps)(AttendeesScene);
