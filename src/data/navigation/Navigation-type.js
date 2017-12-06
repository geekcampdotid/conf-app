// @flow

import type {Dispatch} from '../../types';

export type NavigationState = {
  index: number,
  routes: Array<NavigationRoute | (NavigationRoute & NavigationState)>,
};

export type NavigationRoute = {
  key: string,
  routeName: string,
  path?: string,
  params?: NavigationParams,
};

export type NavigationParams = {
  [key: string]: any,
};

export type NavigationAction =
  | {
      type: 'Navigation/NAVIGATE',
      routeName: string,
      key?: string,
    }
  | {
      type: 'Navigation/BACK',
      key: string,
    };

export type NavigateFunction = (
  routeName: string,
  params?: NavigationParams,
  action?: NavigationAction,
) => void;

export type Navigation = {
  goBack: () => void,
  navigate: NavigateFunction,
  setParams: (param: NavigationParams) => boolean,
};

export type NavigationObject = Navigation & {
  state: NavigationState,
  dispatch: Dispatch,
  index: number,
};
