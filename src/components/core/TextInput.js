// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {TextInput, StyleSheet, Platform} from 'react-native';
import {View} from '../core';

import {TRANSPARENT, WHITE} from '../../constants/colors';
import {DEFAULT_FONT_SIZE} from '../../constants/text';
import {
  UNKNOWN_IOS_MULTILINE_PADDING_TOP,
  MAX_NUMBER_OF_LINES,
  FONTSIZE_TO_HEIGHT_ADD_VALUE,
  DEFAULT_NUMBER_OF_LINES,
} from '../../constants/textInput';

type State = {
  marginTop: number,
};

type Props = {
  placeholder?: string,
  style?: StyleSheetTypes,
  textStyle?: StyleSheetTypes,
  maxMultiline?: number,
};

export default class TextInputComponent extends Component<Props, State> {
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      marginTop: 10 - UNKNOWN_IOS_MULTILINE_PADDING_TOP,
    };
  }

  onHeightChanged = (before: number, after: number, height: number) => {
    let {maxMultiline} = this.props;
    maxMultiline = maxMultiline ? maxMultiline : MAX_NUMBER_OF_LINES;
    if (after > height * maxMultiline) {
      this.setState({marginTop: 10});
    }
  };

  render() {
    let {
      style,
      textStyle,
      maxMultiline = DEFAULT_NUMBER_OF_LINES,
      ...otherProps
    } = this.props;
    let {marginTop} = this.state;
    // let {onHeightChanged} = this;

    let isAndroid = Platform.OS === 'android';
    let height = textStyle
      ? textStyle.fontSize + FONTSIZE_TO_HEIGHT_ADD_VALUE
      : DEFAULT_FONT_SIZE + FONTSIZE_TO_HEIGHT_ADD_VALUE;

    const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        backgroundColor: WHITE,
      },
      default: {
        flex: 1,
        height: height,
        fontSize: DEFAULT_FONT_SIZE,
        margin: 10,
        marginTop: !isAndroid && maxMultiline > 1 ? marginTop : 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
      },
    });

    return (
      <View style={[styles.container, style]}>
        <TextInput
          {...otherProps}
          style={[styles.default, textStyle]}
          underlineColorAndroid={TRANSPARENT}
        />
      </View>
    );
  }
}
