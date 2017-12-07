// @flow
import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {View, Text} from './core';
import ResponsiveImage from './ResponsiveImage';
import kodefox from '../assets/images/kodefox-logo-text.png';
import {FONT_BOLD, SMALL_FONT_SIZE, DEFAULT_FONT_SIZE} from '../constants/text';
import {THEME_COLOR, STATUS_BAR_COLOR} from '../constants/colors';

type Props = {
  logo: number | {uri: string, width?: number, height?: number},
  text?: string,
  textStyle?: StyleSheetTypes,
};

export default function SplashScreen(props: Props) {
  let {logo, text, textStyle} = props;
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={STATUS_BAR_COLOR} />
      <View style={styles.logoContainer}>
        <ResponsiveImage source={logo} />
        {text ? (
          <Text style={[styles.defaultLogoTextStyle, textStyle]}>
            {text.toUpperCase()}
          </Text>
        ) : null}
      </View>
      <View style={styles.bottomPart}>
        <Text style={styles.informationText}>Crafted with love by</Text>
        <View style={styles.informationImage}>
          <ResponsiveImage source={kodefox} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topPart: {
    height: 30,
  },
  middlePart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  informationText: {
    fontSize: SMALL_FONT_SIZE,
  },
  informationImage: {
    width: 100,
    marginLeft: 10,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  defaultLogoTextStyle: {
    marginTop: 10,
    fontWeight: FONT_BOLD,
    fontSize: DEFAULT_FONT_SIZE,
    color: THEME_COLOR,
    textAlign: 'center',
  },
});
