// @flow

import React from 'react';
import {View, Text} from 'components/core-components';
import {ResponsiveImage} from 'components/components';

import {FONT_BOLD} from 'constants/text';
import {THEME_COLOR} from 'constants/colors';

import KARIR from 'assets/images/organizers/karir.png';
import KMKONLINE from 'assets/images/organizers/kmkonline.png';

export default function OrganizeBy() {
  return (
    <View style={{marginBottom: 20}}>
      <Text
        style={{
          fontWeight: FONT_BOLD,
          textAlign: 'center',
          fontSize: 20,
          paddingVertical: 10,
          color: THEME_COLOR,
        }}
      >
        Organized By
      </Text>
      <View
        style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}
      >
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ResponsiveImage source={KARIR} style={{marginBottom: 30}} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 10}}>
          <ResponsiveImage source={KMKONLINE} />
        </View>
      </View>
    </View>
  );
}
