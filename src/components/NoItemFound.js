// @flow

import React from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';

import {View, Text} from './core';

import {GREY} from '../constants/colors';
import {DEFAULT_FONT_SIZE} from '../constants/text';

type Props = {
  text: string,
  iconName?: string,
  iconType?: string,
};

const DEFAULT_ICON = {
  name: 'times',
  type: 'font-awesome',
  size: 35,
  color: GREY,
  style: {opacity: 0.5},
};

export default function NoItemFound(props: Props) {
  let {text, iconName, iconType} = props;
  let iconProps = {
    ...DEFAULT_ICON,
    name: iconName || DEFAULT_ICON.name,
    type: iconType || DEFAULT_ICON.type,
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
      <Icon {...iconProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: GREY,
    fontSize: DEFAULT_FONT_SIZE,
    marginBottom: 10,
    textAlign: 'center',
  },
});
