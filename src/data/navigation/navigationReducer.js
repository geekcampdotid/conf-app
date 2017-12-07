// @flow
import MainRouter from '../../routes/main/MainRouter';

import type {NavigationState, NavigationAction} from './Navigation-type';

export default function navigationReducer(
  navigationState: NavigationState,
  action: NavigationAction,
) {
  return MainRouter.router.getStateForAction(action, navigationState);
}
