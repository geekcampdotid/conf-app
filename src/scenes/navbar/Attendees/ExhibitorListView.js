//@flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {FlatList} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import {DismissKeyboardView} from 'components/core-components';
import {NoItemFound} from 'components/components';

import styles from './ListView-style';

import type {Exhibitor} from 'data/exhibitor/Exhibitor-type';
import type {Navigation} from 'data/navigation/Navigation-type';

import DEFAULT_AVATAR from 'assets/images/default-company-avatar.png';

type Props = {
  navigation: Navigation;
  exhibitorList: Map<string, Exhibitor>;
  searchValue: string;
};

type ExhibitorListItem = {
  item: Exhibitor;
  index: number;
};

export default class PresenterListView extends Component {
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
  }

  render() {
    let {exhibitorList, searchValue} = this.props;
    let data = this._getFilteredData(exhibitorList, searchValue);
    if (data.length === 0) {
      return (
        <DismissKeyboardView style={[styles.listContainer, styles.noItemFound]}>
          <NoItemFound text="Data not yet available" />
        </DismissKeyboardView>
      );
    }
    return (
      <List containerStyle={styles.listContainer}>
        <FlatList
          data={data}
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
        avatar={avatar}
        avatarStyle={styles.avatar}
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
