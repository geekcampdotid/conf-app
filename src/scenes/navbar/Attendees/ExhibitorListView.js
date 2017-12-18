//@flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {FlatList} from 'react-native';
import {List, ListItem, Avatar} from 'react-native-elements';

import {DismissKeyboardView} from '../../../components/core';
import {NoItemFound} from '../../../components';

import styles, {AVATAR_SIZE} from './ListView-style';

import type {Exhibitor} from '../../../data/exhibitor/Exhibitor-type';
import type {Navigation} from '../../../data/navigation/Navigation-type';

import DEFAULT_AVATAR from '../../../assets/images/default-company-avatar.png';

type Props = {
  navigation: Navigation,
  exhibitorList: Map<string, Exhibitor>,
  searchValue: string,
};

type ExhibitorListItem = {
  item: Exhibitor,
  index: number,
};

export default class PresenterListView extends Component<Props, void> {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {exhibitorList, searchValue} = this.props;
    let data = this._getFilteredData(exhibitorList, searchValue);
    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          data={data}
          ListEmptyComponent={() => {
            return (
              <DismissKeyboardView
                style={[styles.listContainer, styles.noItemFound]}
              >
                <NoItemFound text="No Exhibitors Found" />
              </DismissKeyboardView>
            );
          }}
          renderItem={this._renderItem}
          keyExtractor={(item) => item.id}
        />
      </List>
    );
  }

  _getFilteredData(data: Map<string, Exhibitor>, filterValue: string) {
    return Array.from(data.values()).filter((exhibitor: Exhibitor) => {
      return exhibitor.name.toLowerCase().includes(filterValue.toLowerCase());
    });
  }

  _renderItem({item: exhibitor}: ExhibitorListItem) {
    let {navigate} = this.props.navigation;
    let avatar = exhibitor.avatarPictureUri || DEFAULT_AVATAR;
    return (
      <ListItem
        key={exhibitor.id}
        roundAvatar
        avatar={
          <Avatar
            rounded
            source={avatar}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
            avatarStyle={styles.avatarContainer}
          />
        }
        title={exhibitor.name}
        hideChevron={true}
        containerStyle={styles.itemContainer}
        onPress={() => {
          navigate('ExhibitorDetailScene', {exhibitor});
        }}
      />
    );
  }
}
