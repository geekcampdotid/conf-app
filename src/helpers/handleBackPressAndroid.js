// @flow
import {BackHandler} from 'react-native';
import {DEFAULT_SCENE_INDEX} from '../constants/navigation';

import type {Dispatch} from '../types';

type Routes = {
  index: number,
};

type NavigationState = {
  index: number,
  key: string,
  routes: Array<Routes>,
};

export default function handleBackPressAndroid(
  navigation: NavigationState,
  dispatch: Dispatch,
) {
  if (navigation.index > 0) {
    let {key} = navigation;
    dispatch({
      type: 'Navigation/BACK',
      key,
    });
  } else if (navigation.routes[0].index !== DEFAULT_SCENE_INDEX) {
    dispatch({
      type: 'Navigation/NAVIGATE',
      routeName: 'HomeScene',
    });
  } else {
    // TODO: Add confirmation dialog
    BackHandler.exitApp();
    return false;
  }
  return true;
}
