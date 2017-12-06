// @flow

import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text} from './core-components';

import {FONT_BOLD, DEFAULT_FONT_SIZE} from '../constants/text';
import {
  MAIN_RED,
  MAIN_GREEN,
  MAIN_YELLOW,
  MAIN_BLUE,
} from '../constants/colors';

type Props = {
  text: string, // TODO: change this based on the upcoming event stage name
  textStyle?: StyleSheetTypes,
  color?: 'red' | 'green' | 'blue' | 'yellow',
  containerStyle?: StyleSheetTypes,
};

export default function ColorLabel(props: Props) {
  let {text, containerStyle, textStyle, color} = props;
  let backgroundColor;
  switch (color) {
    case 'red':
      backgroundColor = MAIN_RED;
      break;
    case 'green':
      backgroundColor = MAIN_GREEN;
      break;
    case 'blue':
      backgroundColor = MAIN_BLUE;
      break;
    case 'yellow':
      backgroundColor = MAIN_YELLOW;
      break;
    default:
      backgroundColor = MAIN_BLUE;
      break;
  }
  return (
    <View style={[styles.root, {backgroundColor}, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  text: {
    fontWeight: FONT_BOLD,
    fontSize: DEFAULT_FONT_SIZE,
    color: 'white',
  },
});
