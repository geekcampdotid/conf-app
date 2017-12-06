// @flow

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {View, Text} from './core-components';

import {FONT_BOLD} from '../constants/text';

import DEFAULT_BACKGROUND_IMAGE from '../assets/images/default-background-image-exhibitor.png';

type Props = {
  avatarPictureUri: ?string,
  name: string,
  containerStyle?: StyleSheetTypes,
  avatarStyle?: StyleSheetTypes,
  nameTextStyle?: StyleSheetTypes,
};

export default function ExhibitorDetailAvatar(props: Props) {
  let {
    containerStyle,
    avatarStyle,
    nameTextStyle,
    avatarPictureUri,
    name,
  } = props;
  let backgroundImageSource = DEFAULT_BACKGROUND_IMAGE;
  return (
    <View style={[styles.root, containerStyle]}>
      <Image
        style={styles.backgroundImage}
        source={backgroundImageSource}
        resizeMode="cover"
      >
        <View style={styles.overlayContainer}>
          <Image
            source={avatarPictureUri}
            style={[styles.avatar, avatarStyle]}
          />
          <Text style={[styles.name, nameTextStyle]}>{name}</Text>
        </View>
      </Image>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    maxHeight: 200,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  name: {
    paddingTop: 10,
    fontSize: 30,
    color: 'white',
    fontWeight: FONT_BOLD,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});
