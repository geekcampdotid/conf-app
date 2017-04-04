// @flow
import {Linking} from 'react-native';

export default function openLink(url: string) {
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      // ToastAndroid.show(`tidak bisa membuka ${url}`, ToastAndroid.SHORT);
    } else {
      return Linking.openURL(url);
    }
  });
}
