// @flow

import React from 'react';
import {View, Text} from '../../components/core-components';
import {ResponsiveImage} from '../../components/components';

import {baseTextStyle} from '../../constants/text';
import {themeColors} from '../../constants/colors';

import LIPUTAN6 from '../../assets/images/mediaPartners/liputan6.png';
import TECHINASIA from '../../assets/images/mediaPartners/techinasia.png';
import VIDIO from '../../assets/images/mediaPartners/vidio.png';
import FILE from '../../assets/images/mediaPartners/file.png';

export default function MediaPartners() {
  return (
    <View style={{marginBottom: 40}}>
      <Text
        style={{
          fontWeight: baseTextStyle.FONT_BOLD,
          textAlign: 'center',
          fontSize: 20,
          paddingVertical: 10,
          color: themeColors.THEME_COLOR,
        }}
      >
        Media Partners
      </Text>
      <View
        style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}
      >
        <View style={{flex: 1}}>
          <ResponsiveImage source={VIDIO} style={{marginBottom: 30}} />
          <ResponsiveImage source={LIPUTAN6} />
        </View>
        <View style={{flex: 1}}>
          <ResponsiveImage source={TECHINASIA} style={{marginBottom: 30}} />
          <View style={{paddingHorizontal: 20}}>
            <ResponsiveImage source={FILE} />
          </View>
        </View>
      </View>
    </View>
  );
}
