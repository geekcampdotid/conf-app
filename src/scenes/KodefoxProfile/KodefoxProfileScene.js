// @flow

import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ScrollView, View, Text} from '../../components/core-components';
import {ResponsiveImage} from '../../components/components';
import kodefoxLogo from '../../assets/images/kodefox-logo.png';
import openLink from '../../helpers/openLink';

// import updateOTALogo from 'assets/images/logo-updates-ota.png';
// import rapidPrototypingLogo from 'assets/images/logo-rapid-prototyping.png';
// import automatedTestingLogo from 'assets/images/logo-automated-testing.png';

import styles from './KodefoxProfileScene-style';

// const benefits = [
//   {image: rapidPrototypingLogo, title: 'Rapid Prototyping'},
//   {image: automatedTestingLogo, title: 'Automated Testing'},
//   {image: updateOTALogo, title: 'Updates Over-the-Air'},
// ];

export default function KodefoxProfileScene() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <ResponsiveImage source={kodefoxLogo} />
      <Text style={styles.subtitleText}>{'Crafting World Class Software'}</Text>
      <View style={styles.headerSection}>
        <Text style={styles.description}>
          KodeFox is a team of software engineers specializing in robust,
          scalable Apps using modern technologies. We specialize in React, React
          Native and Node.js for building iOS, Android, Web and Desktop apps.
        </Text>

        <Text style={styles.description}>
          Our technology allows us to build cross-platform applications with
          true native performance on every device. We build engaging, compelling
          user interfaces tailored to your target audience. Our support is top
          notch, and we keep you involved during the entire process. From
          development to warranty, our quality is unmatched.
        </Text>
        <Text style={[styles.description, {marginBottom: 0}]}>
          You have a plan for an app?{' '}
          <Text style={styles.bold}>
            We have the expertise to make it happen!
          </Text>{' '}
          Reach us:{' '}
        </Text>
        <TouchableOpacity
          onPress={() => {
            openLink('mailto:hello@kodefox.com');
          }}
        >
          <Text style={[styles.description, styles.bold, {marginBottom: 0}]}>
            hello@kodefox.com
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

KodefoxProfileScene.navigationOptions = {
  title: 'KodeFox',
};
