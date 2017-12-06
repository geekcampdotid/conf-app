// @flow
/* eslint-disable no-undef */

import React from 'react';
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

declare type ReactNode =
  | null
  | string
  | number
  | React.Element<*>
  | Array<string | number | React.Element<*>>;

type ImageSourceURI = {
  uri: string,
  width?: number,
  height?: number,
};

declare type ImageSource = number | ImageSourceURI | Array<ImageSourceURI>;

declare type StyleSheetTypes = StyleObj;

declare type Icon = {
  name: string,
  color?: string,
  size?: number,
  type?: | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo',
  style?: StyleSheetTypes,
};

declare var __DEV__: boolean;
