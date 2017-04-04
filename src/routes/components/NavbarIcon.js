// @flow

import React from 'react';
import {Animated, View} from 'react-native';
import {Icon} from 'react-native-elements';

type Props = {
  focused: boolean;
  activeColor: string;
  inactiveColor: string;
  size: number;
  scale: Animated.Value;
};

export default function NavbarIcon(props: Props) {
  let {
    focused,
    inactiveColor,
    activeColor,
    scale,
    size,
    ...otherProps
  } = props;

  if (focused) {
    return (
      <Animated.View style={{
        transform: [{scale}],
      }}>
        <Icon
          {...otherProps}
          color={activeColor}
        />
      </Animated.View>
    );
  }
  return (
    <View>
      <Icon
        {...otherProps}
        color={inactiveColor}
        size={size}
      />
    </View>
  );
}
