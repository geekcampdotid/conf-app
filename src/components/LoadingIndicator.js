// @flow
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  DotIndicator,
  BarIndicator,
  BallIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import * as Animatable from 'react-native-animatable';
import {Text, View} from './core';

import {THEME_COLOR} from '../constants/colors';

type Props = {
  visible: boolean,
  type?: 'dot' | 'bar' | 'ball' | 'pacman' | 'pulse' | 'skype' | 'wave',
  text?: string,
};

const defaultLoadingComponent = {
  dot: {
    Component: DotIndicator,
  },
  bar: {
    Component: BarIndicator,
    props: {
      count: 5,
    },
  },
  ball: {
    Component: BallIndicator,
  },
  pacman: {
    Component: PacmanIndicator,
  },
  pulse: {
    Component: PulseIndicator,
  },
  skype: {
    Component: SkypeIndicator,
  },
  wave: {
    Component: WaveIndicator,
  },
};

const DEFAULT_LOADING_INDICATOR_TYPE = 'bar';

export default class LoadingIndicator extends Component<Props, void> {
  _loadingIndicator: ?Object;
  componentDidMount() {
    if (this.props.visible) {
      this._loadingIndicator && this._loadingIndicator.fadeIn();
    }
  }
  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    if (oldProps.visible !== newProps.visible) {
      if (newProps.visible) {
        this._loadingIndicator && this._loadingIndicator.fadeIn();
      } else {
        this._loadingIndicator && this._loadingIndicator.fadeOut();
      }
    }
  }
  render() {
    let {text: loadingText, type, ...otherProps} = this.props;
    let {
      Component: LoadingComponent,
      ...otherDefaultKey
    } = defaultLoadingComponent[type || DEFAULT_LOADING_INDICATOR_TYPE];
    let defaultProps =
      (otherDefaultKey.props && {...otherDefaultKey.props}) || {};
    return (
      <Animatable.View
        ref={(loadingIndicator) => (this._loadingIndicator = loadingIndicator)}
        style={[styles.root]}
      >
        <LoadingComponent
          {...defaultProps}
          {...otherProps}
          color={THEME_COLOR}
        />
        {loadingText ? (
          <View style={styles.text}>
            <Text style={{textAlign: 'center'}}>{loadingText}</Text>
          </View>
        ) : null}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingHorizontal: 30,
  },
});
