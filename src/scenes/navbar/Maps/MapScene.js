// @flow

import React from 'react';
import {connect} from 'react-redux';
import {List, ListItem} from 'react-native-elements';
import {ScrollView, View, Text} from '../../../components/core-components';
import ResponsiveImage from '../../../components/ResponsiveImage';
import conferenceMap from '../../../assets/images/conference-map.png';

import styles from './MapScene-style';

import {THEME_COLOR} from '../../../constants/colors';

import type {Dispatch} from '../../../types';

type Props = {
  onMapClicked: (imageSource: number) => void,
};

export function MapScene(props: Props) {
  let {onMapClicked} = props;
  return (
    <ScrollView style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>VENUE</Text>
      </View>
      <View raised style={styles.mapContainer}>
        <ResponsiveImage
          source={conferenceMap}
          onPress={() => onMapClicked(conferenceMap)}
        />
      </View>
      <List containerStyle={styles.listContainer}>
        <ListItem // TODO: use accordion as an optional ListItem because sometimes places like toilet are many, and we need to locate them all
          title="2 Stages"
          titleStyle={styles.listItemTitle}
          subtitle="The Hall & SCTV Studio"
          leftIcon={{name: 'mic', color: THEME_COLOR}}
          hideChevron={true}
        />
        <ListItem // TODO: use accordion as an optional ListItem because sometimes places like toilet are many, and we need to locate them all
          title="2 Topics"
          titleStyle={styles.listItemTitle}
          subtitle="Technology & Product Design"
          leftIcon={{
            name: 'comment-o',
            color: THEME_COLOR,
            type: 'font-awesome',
          }}
          hideChevron={true}
        />
      </List>
    </ScrollView>
  );
}

MapScene.navigationOptions = {
  title: 'Conference Map',
};

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onMapClicked: (imageSource: number) => {
      dispatch({
        type: 'SHOW_PINCHABLE_IMAGE_REQUESTED',
        imageSource,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(MapScene);
