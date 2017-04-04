// @flow
import React from 'react';
import {ScrollView} from 'react-native';

type Props = {[key: string]: any};

export default function ScrollViewComponent(props: Props) {
  return <ScrollView {...props} />;
}
