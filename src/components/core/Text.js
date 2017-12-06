// @flow

import React from 'react';
import {Text, StyleSheet} from 'react-native';

import {baseTextStyle} from '../../constants/text';

type Props = {
  bold?: boolean,
  children?: ReactNode,
  style?: StyleSheetTypes,
};

export default function CustomText(props: Props) {
  let {bold, children, style} = props;
  return (
    <Text style={[styles.default, style, bold && styles.bold]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: baseTextStyle.DEFAULT_FONT_SIZE,
  },
  bold: {
    fontWeight: baseTextStyle.FONT_BOLD,
  },
});
