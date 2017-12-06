// @flow
import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button} from 'react-native-elements';

import {THEME_COLOR, GREY, LIGHT_GREY, WHITE} from '../../constants/colors';

type Props = {
  onPress: () => void,
  title: string,
  type?: 'default' | 'primary',
  style?: StyleSheetTypes,
  icon?: Icon,
};

// this is to solve the Promise rejection error in ios
let TouchAndroidComponent =
  Platform.OS === 'android'
    ? TouchableNativeFeedback
    : {
        Ripple: (color: string) => {
          return color;
        },
      };

const DEFAULT_BUTTON_BORDER_RADIUS = 5;

export default function ButtonComponent(props: Props) {
  let {title, onPress, type, style, ...otherProps} = props;
  let buttonStyle = [
    styles.default,
    type === 'primary' ? styles.buttonPrimary : styles.buttonDefault,
    style,
  ];
  let textStyle = type === 'primary' ? styles.textPrimary : styles.textDefault;

  let otherDefaultProps = {
    ...Platform.select({
      ios: {
        Component: TouchableOpacity,
      },
      android: {
        Component: TouchAndroidComponent,
        background: TouchAndroidComponent.Ripple(
          type === 'primary' ? WHITE : LIGHT_GREY,
        ),
      },
    }),
  };

  return (
    <Button
      {...otherProps}
      {...otherDefaultProps}
      raised
      title={title}
      onPress={onPress}
      buttonStyle={buttonStyle}
      textStyle={textStyle}
      borderRadius={DEFAULT_BUTTON_BORDER_RADIUS}
    />
  );
}

const styles = StyleSheet.create({
  default: {},
  buttonDefault: {
    borderColor: GREY,
    borderWidth: 0.3,
    backgroundColor: WHITE,
  },
  buttonPrimary: {
    backgroundColor: THEME_COLOR,
  },
  textDefault: {
    color: 'black',
  },
  textPrimary: {
    color: 'white',
  },
});
