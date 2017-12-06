//@flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {FlatList} from 'react-native';
import {List, ListItem} from 'react-native-elements';
import {DismissKeyboardView} from '../../../components/core-components';
import {NoItemFound} from '../../../components/components';

import styles from './ListView-style';

import type {Presenter} from '../../../data/presenter/Presenter-type';
import type {Navigation} from '../../../data/navigation/Navigation-type';

import DEFAULT_AVATAR from '../../../assets/images/default-profile-pic.png';

type Props = {
  navigation: Navigation,
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
    if (data.length === 0) {
      return (
        <DismissKeyboardView style={[styles.listContainer, styles.noItemFound]}>
          <NoItemFound text="No Presenters Found" />
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
        hideChevron={true}
        title={presenter.name}
        subtitle={`${presenter.jobTitle}, ${presenter.companyName}`}
        avatar={avatarProps}
        containerStyle={styles.itemContainer}
        avatarStyle={styles.avatar}
        onPress={() => navigate('PresenterDetailScene', {presenter})}
      />
    );
  }
}
