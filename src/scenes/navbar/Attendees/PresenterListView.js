//@flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {FlatList} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';
import {DismissKeyboardView} from '../../../components/core';
import {NoItemFound} from '../../../components';

import styles, {AVATAR_SIZE} from './ListView-style';

import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {NavigationScreenProp} from 'react-navigation';

import DEFAULT_AVATAR from '../../../assets/images/default-profile-pic.png';

type Props = {
  navigation: NavigationScreenProp<*>,
  presenterList: Map<string, Presenter>,
  searchValue: string,
};

type PresenterListItem = {
  item: Presenter,
  index: number,
};

export default class PresenterListView extends Component<Props, void> {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {presenterList, searchValue} = this.props;
    let data = this._getFilteredData(presenterList, searchValue);
    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          ListEmptyComponent={() => {
            return (
              <DismissKeyboardView
                style={[styles.listContainer, styles.noItemFound]}
              >
                <NoItemFound text="No Presenters Found" />
              </DismissKeyboardView>
            );
          }}
          data={data}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
        />
      </List>
    );
  }

  _getFilteredData(data: Map<string, Presenter>, filterValue: string) {
    return Array.from(data.values()).filter((presenter: Presenter) => {
      return presenter.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  _renderItem({item: presenter}: PresenterListItem) {
    let {navigate} = this.props.navigation;
    let avatarProps = presenter.profilePictureUri || DEFAULT_AVATAR;
    return (
      <ListItem
        key={presenter.id}
        roundAvatar
        hideChevron
        title={presenter.name}
        subtitle={`${presenter.jobTitle}, ${presenter.companyName}`}
        avatar={
          <Avatar
            rounded
            source={avatarProps}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            avatarStyle={styles.avatarContainer}
          />
        }
        containerStyle={styles.itemContainer}
        onPress={() => navigate('PresenterDetailScene', {presenter})}
      />
    );
  }
}
