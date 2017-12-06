// @flow

import React from 'react';
import {ScrollView} from 'react-native';

import CommunityPartners from './CommunityPartners';
import MediaPartners from './MediaPartners';
import AdditionalSponsors from './AdditionalSponsors';
import MainSponsors from './MainSponsors';

import {themeColors} from '../../constants/colors';

export default function SponsorsScene() {
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 22,
        backgroundColor: themeColors.SCENE_DEFAULT,
      }}
    >
      <MainSponsors />
      <AdditionalSponsors />
      <MediaPartners />
      <CommunityPartners />
    </ScrollView>
  );
}
SponsorsScene.navigationOptions = {
  title: 'Sponsors',
};
