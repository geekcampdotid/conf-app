// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text} from '../../components/core-components';
import {ResponsiveImage} from '../../components/components';
import sidebarLogo from '../../assets/images/geekcamp-logo.png';

import openLink from '../../helpers/openLink';

import styles from './ContactInfoScene-style';

import {APP_SUB_TITLE} from '../../constants/aboutApp';

export default function ContactInfoScene() {
  return (
    <View style={styles.root}>
      <ResponsiveImage source={sidebarLogo} />
      <Text style={styles.subtitleText}>{APP_SUB_TITLE}</Text>
      <View style={styles.headerSection}>
        <Text style={styles.description}>
          If you have any suggestions as to how GeekCamp.id can better
          accomplish the aforementioned goals, please reach out to us:{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            openLink('mailto:contact@geekcamp.id');
          }}
        >
          <Text style={styles.bold}>contact@geekcamp.id</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

ContactInfoScene.navigationOptions = {
  title: 'Contact Us',
};
