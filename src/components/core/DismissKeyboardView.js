// @flow

import React from 'react';
import {View, TouchableWithoutFeedback, Keyboard} from 'react-native';

export default function DismissKeyboardView(props: {[key: string]: any}) {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View {...props} />
    </TouchableWithoutFeedback>
  );
}
