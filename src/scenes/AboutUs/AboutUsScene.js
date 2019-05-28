// @flow

import React from 'react';
import {ScrollView, View, Text} from '../../components/core';
import {ResponsiveImage} from '../../components';
import sidebarLogo from '../../assets/images/geekcamp-logo.png';

import OrganizeBy from './OrganizeBy';
import styles from './AboutUsScene-style';

import {APP_SUB_TITLE, APP_DESCRIPTION} from '../../constants/aboutApp';

export default function AboutUsScene() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <ResponsiveImage source={sidebarLogo} />
      <Text style={styles.subtitleText}>{APP_SUB_TITLE}</Text>
      <View style={styles.headerSection}>
        {APP_DESCRIPTION.map((description, index) => {
          return (
            <Text key={index} style={styles.description}>
              {description}
            </Text>
          );
        })}
      </View>
      <OrganizeBy />
    </ScrollView>
  );
}
