// @flow

import React from 'react';
import * as Animatable from 'react-native-animatable';

import {ResponsiveImage} from '../../components/components';
import {View} from '../../components/core-components';

import {SCALE_RATIO} from '../../constants/layout';

import styles from './ExhibitorProfileInfoScene-style';
import boothLocation from '../../assets/images/conference-map.png';

export default function ExhibitorBoothLocation() {
  return (
    <View style={styles.root}>
      <View style={styles.descriptionContainer}>
        <ResponsiveImage source={boothLocation}>
          <Animatable.View
            animation="fadeIn"
            direction="alternate"
            duration={700}
            easing="ease-out"
            iterationCount="infinite"
            style={{
              position: 'absolute',
              bottom: SCALE_RATIO * 120,
              left: SCALE_RATIO * 100,
              width: 40,
              height: 50,
            }}
          >
            <ResponsiveImage
              source={require('../../assets/images/left-arrow.png')}
            />
          </Animatable.View>
        </ResponsiveImage>
      </View>
    </View>
  );
}
