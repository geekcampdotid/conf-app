// @flow
import {Dimensions} from 'react-native';

export default function getScreenSize() {
  let {height, width} = Dimensions.get('window');
  return {height, width};
}
