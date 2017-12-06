// @flow

import React from 'react';
import {View, Text} from '../../components/core-components';
import {ResponsiveImage} from '../../components/components';

import {baseTextStyle} from '../../constants/text';
import {themeColors} from '../../constants/colors';

import GOOGLE_CLOUD from '../../assets/images/mainSponsors/google-cloud.png';
import GRAB from '../../assets/images/mainSponsors/grab.png';

export default function MainSponsors() {
  return (
    <View>
      <Text
        style={{
          fontWeight: baseTextStyle.FONT_BOLD,
          textAlign: 'center',
          fontSize: 20,
          paddingVertical: 10,
          color: themeColors.THEME_COLOR,
        }}
      >
        Main Sponsors
      </Text>
      <View style={{paddingTop: 10}}>
        <ResponsiveImage source={GOOGLE_CLOUD} style={{marginBottom: 30}} />
        <View style={{paddingHorizontal: 70}}>
          <ResponsiveImage source={GRAB} style={{marginBottom: 30}} />
        </View>
      </View>
    </View>
  );
}
