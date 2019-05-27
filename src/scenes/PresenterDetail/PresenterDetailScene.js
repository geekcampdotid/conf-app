// @flow

import React from 'react';
import {ScrollView} from 'react-native';

import {TabBar, PresenterDetailAvatar} from '../../components';
import PresenterProfileInfoScene from './PresenterProfileInfoScene';
import SessionInfoScene from './SessionInfoScene';

import type {NavigationScreenProp} from 'react-navigation';
import type {Presenter} from '../../data/presenter/Presenter-type';

type Props = {
  navigation: NavigationScreenProp<{
    params: {
      presenter?: Presenter,
    },
  }>,
};

export default function PresenterDetailScene(props: Props) {
  let {navigation} = props;
  let {presenter} = navigation.state.params;
  const TabMenu = {
    Profile: {
      tabBarTitle: 'Profile',
      scene: PresenterProfileInfoScene,
      sceneProps: {presenter},
    },
    Sessions: {
      tabBarTitle: 'Sessions',
      scene: SessionInfoScene,
      sceneProps: {presenter, navigation},
    },
  };
  if (presenter == null) {
    return null;
  }
  return (
    <ScrollView>
      <PresenterDetailAvatar
        profilePictureUri={presenter.profilePictureUri}
        name={presenter.name}
      />
      <TabBar style={{marginTop: 20}} tabMenu={TabMenu} />
    </ScrollView>
  );
}

PresenterDetailScene.navigationOptions = ({navigation}) => ({
  title: `${navigation.state.params.presenter.name}`,
});
