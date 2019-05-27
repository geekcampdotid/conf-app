// @flow

import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';

type Props = {
  name: string,
  focused: boolean,
  tintColor: string,
};

export default function NavbarIcon(props: Props) {
  // eslint-disable-next-line no-unused-vars
  let {focused, tintColor, ...otherProps} = props;
  return (
    <View>
      <Icon {...otherProps} color={tintColor} />
    </View>
  );
}
