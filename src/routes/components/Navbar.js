/* @flow */

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Animated, View, TouchableOpacity, StyleSheet} from 'react-native';

import NavbarIcon from './NavbarIcon';

import type {
  NavigationRoute,
  NavigationState,
} from '../../data/navigation/Navigation-type';
import {SCALE_RATIO} from '../../constants/layout';

type TabScene = {
  route: NavigationRoute,
  focused: boolean,
  index: number,
};

type Props = {
  activeTintColor: string,
  inactiveTintColor: string,
  navigationState: NavigationState,
  jumpToIndex: (index: number) => void,
  renderIcon: (scene: TabScene) => React$Element<*>,
  style: StyleSheetTypes,
};

const SELECTED_MENU_ICON_SIZE = 1.3;
const DEFAULT_ICON_SIZE = SCALE_RATIO * 24;

export class Navbar extends Component<Props, void> {
  selectedMenuScale: Animated.Value;

  constructor() {
    super(...arguments);
    autobind(this);
    this.selectedMenuScale = new Animated.Value(SELECTED_MENU_ICON_SIZE);
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    if (newProps.navigationState.index !== oldProps.navigationState.index) {
      this._animateSelectedMenu();
    }
  }

  _animateSelectedMenu() {
    this.selectedMenuScale = new Animated.Value(1);

    Animated.spring(this.selectedMenuScale, {
      toValue: SELECTED_MENU_ICON_SIZE,
      friction: 3,
      tension: 100,
    }).start();
  }

  render() {
    let {navigationState, jumpToIndex, style} = this.props;

    let {routes} = navigationState;

    return (
      <View style={[styles.tabBar, style, {elevation: 25}]}>
        {routes.map((route, index: number) => {
          const focused = index === navigationState.index;
          const scene = {route, index, focused};
          return (
            <View key={route.key} style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => jumpToIndex(index)}
                style={styles.tab}
              >
                {this._renderIcon(scene)}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }

  _renderIcon(scene: TabScene) {
    const {inactiveTintColor, activeTintColor, renderIcon} = this.props;
    let {route, index, focused} = scene;
    let icon = renderIcon({
      route,
      index,
      focused,
    });

    return (
      <NavbarIcon
        {...icon.props}
        focused={focused}
        scale={this.selectedMenuScale}
        size={DEFAULT_ICON_SIZE}
        activeColor={activeTintColor}
        inactiveColor={inactiveTintColor}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: SCALE_RATIO * 49, // default navbar height
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#f4f4f4', // Default background color in iOS 10
    shadowColor: '#888',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navbar;
