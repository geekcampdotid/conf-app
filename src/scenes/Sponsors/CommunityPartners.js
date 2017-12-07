// @flow

import React from 'react';
import {View, Text} from '../../components/core';
import {ResponsiveImage} from '../../components';

import {baseTextStyle} from '../../constants/text';
import {themeColors} from '../../constants/colors';

import CODEPOLITAN from '../../assets/images/communityPartners/codepolitan.png';
import ID_RUBY from '../../assets/images/communityPartners/id-ruby.png';
import SARCCOM from '../../assets/images/communityPartners/sarccom.png';
import BNCC from '../../assets/images/communityPartners/bncc.png';

export default function CommunityPartners() {
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
        Community Partners
      </Text>
      <View
        style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}
      >
        <View style={{flex: 1}}>
          <ResponsiveImage source={SARCCOM} style={{marginBottom: 30}} />
          <ResponsiveImage source={CODEPOLITAN} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ResponsiveImage source={ID_RUBY} style={{marginBottom: 30}} />
          <ResponsiveImage source={BNCC} />
        </View>
      </View>
    </View>
  );
}
