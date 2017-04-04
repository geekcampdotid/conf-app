// @flow

import React from 'react';
import {View, Text} from 'components/core-components';
import styles from './ExhibitorProfileInfoScene-style';
import type {Exhibitor} from 'data/exhibitor/Exhibitor-type';

type Props = {
  exhibitor: Exhibitor;
};

export default function ExhibitorProfileInfoScene(props: Props) {
  let {exhibitor} = props;
  return (
    <View style={styles.root}>
      <View style={styles.descriptionContainer}>
        <Text>{exhibitor.description}</Text>
      </View>
    </View>
  );
}
