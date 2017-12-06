// @flow

import React from 'react';
import {View} from 'react-native';
import {VIEW_SHADOW} from '../../constants/genericStyle';

type Props = {
  style?: StyleSheetTypes,
  raised?: boolean,
};

export default function ViewComponent(props: Props) {
  let {raised, style, ...otherProps} = props;
  return (
    <View style={[raised ? {...VIEW_SHADOW} : null, style]} {...otherProps} />
  );
}
