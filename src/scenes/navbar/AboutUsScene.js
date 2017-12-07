// @flow

import React from 'react';
import {View, Text} from '../../components/core';

export function AboutUsScene() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>About Us Scene</Text>
    </View>
  );
}

AboutUsScene.navigationOptions = {
  title: 'ABOUT US',
};

export default AboutUsScene;
