// @flow
import React from 'react';
import {ScrollView} from 'components/core-components';
import {TabBar, ExhibitorDetailAvatar} from 'components/components';

import ExhibitorProfileInfoScene from './ExhibitorProfileInfoScene';
import ExhibitorBoothLocation from './ExhibitorBoothLocation';

import type {Exhibitor} from 'data/exhibitor/Exhibitor-type';
import type {NavigateFunction} from 'data/navigation/Navigation-type';

type Navigation = {
  navigate: NavigateFunction;
  state: {
    params: {
      exhibitor: Exhibitor;
    };
  };
};

type Props = {
  navigation: Navigation;
};

export default function ExhibitorDetailScene(props: Props) {
  let {exhibitor} = props.navigation.state.params;
  const TabMenu = {
    Profile: {
      tabBarTitle: 'Profile',
      scene: ExhibitorProfileInfoScene,
      sceneProps: {exhibitor},
    },
    BoothLocation: {
      tabBarTitle: 'Booth Location', // TODO: change it to map
      scene: ExhibitorBoothLocation,
    },
  };

  if (exhibitor == null) {
    return null;
  }
  return (
    <ScrollView>
      <ExhibitorDetailAvatar
        avatarPictureUri={exhibitor.avatarPictureUri}
        name={exhibitor.name}
      />
      <TabBar style={{marginTop: 20}} tabMenu={TabMenu} />
    </ScrollView>
  );
}

ExhibitorDetailScene.navigationOptions = {
  title: ({state}) => {
    return state.params.exhibitor.name;
  },
};
