// @flow
/* eslint-disable no-undef */

type Params = {[key: string]: mixed};

type RouteConfig = {
  screen: Function,
  navigationOptions?: NavigationOptions,
};
type RouteConfigs = {[key: string]: RouteConfig};

type StackNavigatorConfig = {
  initialRouteName?: string,
  navigationOptions?: NavigationOptions,
};

type TabNavigatorConfig = {
  initialRouteName?: string,
  navigationOptions?: NavigationOptions,
};

type DrawerNavigatorConfig = {
  initialRouteName?: string,
  navigationOptions?: NavigationOptions,
  contentComponent?: Function,
};

type NavigationOptions = {
  title?: string,
  headerBackTitle?: string | null,
};

type ReactNavigation = {
  StackNavigator: (RouteConfigs, StackNavigatorConfig) => Function,
  TabNavigator: (RouteConfigs, TabNavigatorConfig) => Function,
  DrawerNavigator: (RouteConfigs, DrawerNavigatorConfig) => Function,
  addNavigationHelpers: (
    object: Object,
  ) => {
    navigation: {[key: string]: mixed},
    dispatch: (dispatchObject: Object) => void,
  },
  NavigationActions: {
    navigate: ({routeName: string}) => any,
    reset: ({index: number, actions: Array<{type: string}>}) => any,
  },
};

declare type Navigation = {
  navigate: (route: string, params?: Params) => void,
  goBack: () => void,
  state: {params: {[key: string]: any}},
};

declare module 'react-navigation' {
  declare module.exports: ReactNavigation;
}
