// @flow

import React from 'react';
import {ResponsiveImage} from 'components/components';
import {View, Text} from 'components/core-components';

import type {Presenter} from 'data/presenter/Presenter-type';

import styles from './PresenterProfileInfoScene-style';

type Props = {
  presenter: Presenter;
};

export default function PresenterProfileInfoScene(props: Props) {
  let {presenter} = props;
  return (
    <View style={styles.root}>
      <Text style={styles.jobTitle}>
        {`${presenter.jobTitle}, ${presenter.companyName}`}
      </Text>
      {presenter.companyLogoUri
        ? <View style={{width: 120}}>
            <ResponsiveImage source={{uri: presenter.companyLogoUri}} />
          </View>
        : null}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{presenter.description}</Text>
      </View>
    </View>
  );
}
