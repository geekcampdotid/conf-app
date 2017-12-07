// @flow
import {Dimensions, Platform, PixelRatio} from 'react-native';

export const statusBarHeight = Platform.OS === 'ios' ? 10 : 0;
const windowDimenstions = Dimensions.get('window');
let scaleRatio = 1;
if (Platform.OS === 'ios') {
  let screenWidth = Math.min(windowDimenstions.width, windowDimenstions.height);
  let pixelWidth = PixelRatio.getPixelSizeForLayoutSize(screenWidth);
  scaleRatio = pixelWidth > 1080 ? pixelWidth / 1080 : 1;
  // scaleRatio = screenWidth > 375 ? screenWidth / 375 : 1;
}

export const SCALE_RATIO = scaleRatio;
export const HIT_SLOP = {top: 25, bottom: 25, left: 25, right: 25};
