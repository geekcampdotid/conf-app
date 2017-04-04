// @flow
import MainRouteComponent from 'routes/components/MainRouteComponent';

import type {NavigationState, NavigationAction} from './Navigation-type';

export default function navigationReducer(navigationState: NavigationState, action: NavigationAction) {
  return MainRouteComponent.router.getStateForAction(action, navigationState);
}
