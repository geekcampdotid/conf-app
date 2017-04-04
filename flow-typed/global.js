// @flow
/* eslint-disable no-undef */

import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

declare type ReactNode =
  | null
  | string
  | number
  | ReactElement<*>
  | Array<string | number | ReactElement<*>>;

type ImageSourceURI = {
  uri: string;
  width?: number;
  height?: number;
};

declare type ImageSource = number | ImageSourceURI | Array<ImageSourceURI>;

declare type StyleSheetTypes = StyleObj;
