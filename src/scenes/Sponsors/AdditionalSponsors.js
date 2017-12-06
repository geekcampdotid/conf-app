// @flow

import React from 'react';
import {View, Text} from '../../components/core-components';
import {ResponsiveImage} from '../../components/components';

import {baseTextStyle} from '../../constants/text';
import {themeColors} from '../../constants/colors';

import AKAMAI from '../../assets/images/sponsors/akamai.png';
import BBM from '../../assets/images/sponsors/bbm.png';
import BUKALAPAK from '../../assets/images/sponsors/bukalapak.png';
import JENIUS from '../../assets/images/sponsors/jenius.png';
import HACTIV8 from '../../assets/images/sponsors/hacktiv8.png';
import GEEKHUNTER from '../../assets/images/sponsors/geekhunter.png';
import DEWAWEB from '../../assets/images/sponsors/dewaweb.png';
import MOKA from '../../assets/images/sponsors/moka.png';
import CLOUDERA from '../../assets/images/sponsors/cloudera.png';

export default function AdditionalSponsors() {
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
        Additional Sponsors
      </Text>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ResponsiveImage source={AKAMAI} style={{marginBottom: 30}} />
          <ResponsiveImage source={BUKALAPAK} style={{marginBottom: 30}} />
          <ResponsiveImage source={HACTIV8} />
          <ResponsiveImage source={DEWAWEB} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ResponsiveImage source={BBM} style={{marginBottom: 30}} />
          <ResponsiveImage source={GEEKHUNTER} style={{marginBottom: 30}} />
          <ResponsiveImage source={JENIUS} style={{marginBottom: 30}} />
          <ResponsiveImage source={MOKA} />
        </View>
      </View>
      <View style={{paddingHorizontal: 60}}>
        <ResponsiveImage source={CLOUDERA} style={{marginBottom: 30}} />
      </View>
    </View>
  );
}
