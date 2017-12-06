// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Animated, StyleSheet, TouchableOpacity, Platform} from 'react-native';

import {View, Text} from './core-components';

import getScreenSize from '../helpers/getScreenSize'; // here we need to calculate maximum width of each menu according to screen size
import {THEME_COLOR, TEXT_COLOR} from '../constants/colors';
import {SCALE_RATIO} from '../constants/layout';

type TabScene = {
  tabBarTitle: string,
  scene: (props: Object) => React$Element<*>,
  sceneProps?: Object,
};

type Props = {
  tabMenu: {[tabName: string]: TabScene},
  selectedColor?: string,
  style?: StyleSheetTypes,
};

type State = {
  activeTab: string,
};

// TODO: calculate dynamically
const {width} = getScreenSize();
const DEFAULT_ANIMATION_DURATION = 250;

export default class TabBar extends Component<Props, State> {
  maximumBorderWidth: number;
  selectedMenuBorder: Animated.Value;

  constructor() {
    super(...arguments);
    autobind(this);
    let tabMenuNameList = Object.keys(this.props.tabMenu);
    this.maximumBorderWidth = width / tabMenuNameList.length;
    this.selectedMenuBorder = new Animated.Value(this.maximumBorderWidth);
    this.state = {
      activeTab: tabMenuNameList[0],
    };
  }

  render() {
    let {style} = this.props;
    return (
      <View style={style}>
        <View style={styles.tabMenuContainer}>{this._renderMenu()}</View>
        {this._renderScene()}
      </View>
    );
  }
  _renderMenu() {
    let {tabMenu, selectedColor} = this.props;
    let {activeTab} = this.state;
    return Object.keys(tabMenu).map((tabName, index) => {
      let title = tabMenu[tabName].tabBarTitle;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => this._onActiveTabChanged(tabName)}
          style={styles.tabMenu}
        >
          <View style={styles.tabMenuTextContainer}>
            <Text style={styles.tabMenuText}>{title}</Text>
          </View>
          {activeTab === tabName ? (
            <Animated.View
              style={[
                styles.selectedBorder,
                {
                  width: this.selectedMenuBorder,
                  backgroundColor: selectedColor || THEME_COLOR,
                },
              ]}
            />
          ) : (
            <View style={styles.selectedBorder} />
          )}
        </TouchableOpacity>
      );
    });
  }

  _renderScene() {
    let {tabMenu} = this.props;
    let {activeTab} = this.state;
    let {scene: SceneComponent, sceneProps} = tabMenu[activeTab];
    let props = sceneProps || {};
    return <SceneComponent {...props} />;
  }

  _animateSelectedMenuBorder() {
    this.selectedMenuBorder = new Animated.Value(0);
    Animated.timing(this.selectedMenuBorder, {
      toValue: this.maximumBorderWidth,
      duration: DEFAULT_ANIMATION_DURATION,
    }).start();
  }

  _onActiveTabChanged(tabName: string) {
    let {activeTab} = this.state;
    if (activeTab !== tabName) {
      this._animateSelectedMenuBorder();
      this.setState({activeTab: tabName});
    }
  }
}

const styles = StyleSheet.create({
  tabMenuContainer: {
    flex: 1,
    height: SCALE_RATIO * 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        zIndex: 1, // to make the shadow appear at the bottom in iOS
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  tabMenu: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabMenuTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabMenuText: {
    color: TEXT_COLOR,
  },
  selectedBorder: {
    height: 4,
  },
});
