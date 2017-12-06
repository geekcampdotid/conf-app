// @flow
import MainRouteComponent from '../../routes/components/MainRouteComponent';
import {NavigationActions} from 'react-navigation';

import type {NavigationState, NavigationAction} from './Navigation-type';

const initialNavState = MainRouteComponent.router.getStateForAction(
  NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName: 'Main',
      }),
    ],
  }),
);

export default function navigationReducer(
  navigationState: NavigationState = initialNavState,
  action: NavigationAction,
) {
  return MainRouteComponent.router.getStateForAction(action, navigationState);
}
