// @flow

import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo';
import {View, Text} from './core-components';

import {FONT_BOLD} from 'constants/text';

import DEFAULT_PROFILE_PICTURE from 'assets/images/default-profile-picture-square.png';
import BACKGROUND_IMAGE from 'assets/images/geekcamp-background.jpg';

type Props = {
  profilePictureUri: ?string | number;
  name: string;
  containerStyle?: StyleSheetTypes;
  avatarStyle?: StyleSheetTypes;
  nameTextStyle?: StyleSheetTypes;
};

export default function PresenterDetailAvatar(props: Props) {
  let {
    containerStyle,
    avatarStyle,
    nameTextStyle,
    profilePictureUri,
    name,
  } = props;
  let profilePictureComponent;
  if (profilePictureUri == null) {
    profilePictureComponent = (
      <Image
        style={[styles.avatar, avatarStyle]}
        source={DEFAULT_PROFILE_PICTURE}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={styles.nameContainer}
        >
          <Text style={[styles.name, nameTextStyle]}>{name}</Text>
        </LinearGradient>
      </Image>
    );
  } else {
    profilePictureComponent = (
      <Image
        style={[styles.avatar, avatarStyle]}
        source={props.profilePictureUri}
      >
        <LinearGradient
          colors={[
            'transparent',
            'rgba(0,0,0,0.4)',
            'rgba(0,0,0,0.6)',
            'rgba(0,0,0,0.9)',
          ]}
          style={styles.nameContainer}
        >
          <Text style={[styles.name, nameTextStyle]}>{name}</Text>
        </LinearGradient>
      </Image>
    );
  }
  return (
    <View style={{paddingTop: 20}}>
      <View style={[styles.root, containerStyle]}>
        <Image style={styles.backgroundImage} source={BACKGROUND_IMAGE}>
          <View style={styles.overlay} />
        </Image>
        <View style={styles.avatarContainer}>
          {profilePictureComponent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    maxHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  avatarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 220,
    height: 220,
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'flex-end',
  },
  nameContainer: {
    paddingTop: 5,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 27,
    color: 'white',
    paddingLeft: 10,
    fontWeight: FONT_BOLD,
    backgroundColor: 'transparent',
  },
});
