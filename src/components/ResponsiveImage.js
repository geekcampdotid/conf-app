// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import resolveAssetSource from 'resolveAssetSource';
import {
  View,
  Image,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from 'react-native';

import {Text} from './core-components';
import {THEME_COLOR} from '../constants/colors';

type Props = {
  source: number | {uri: string, width?: number, height?: number},
  initialRatio?: number,
  style?: StyleSheetTypes,
  animated?: boolean,
  animatedStyle?: StyleSheetTypes,
  onPress?: () => void,
  pinchToZoom?: boolean,
};

type State = {
  isLoading: boolean,
  ratio: ?number,
  error: ?string,
};

export default class ResponsiveImage extends Component<Props, State> {
  _pendingGetSize: ?{cancel: () => void};

  constructor() {
    super(...arguments);
    autobind(this);

    let {source} = this.props;
    let ratio;
    let error;
    let isLoading = true;

    if (typeof source === 'number') {
      let imageSource = resolveAssetSource(source);
      if (imageSource) {
        let {width, height} = imageSource;
        if (width && height) {
          ratio = width / height;
        }
      } else {
        error = 'Error: Failed to retrieve width and height of the image';
      }
      isLoading = false;
    } else {
      this._pendingGetSize = getImageSize(
        source,
        this._onLoadSuccess,
        this._onLoadFail,
      );
    }

    this.state = {
      ratio,
      isLoading,
      error,
    };
  }

  componentWillUnmount() {
    if (this._pendingGetSize) {
      this._pendingGetSize.cancel();
    }
  }

  render() {
    let {
      source,
      style,
      animated,
      animatedStyle,
      onPress,
      ...otherProps
    } = this.props;
    let {isLoading, ratio, error} = this.state;
    let component;
    if (isLoading) {
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          <ActivityIndicator
            animating={true}
            color={THEME_COLOR}
            size="large"
          />
        </View>
      );
    }
    if (error) {
      return (
        <View style={[{justifyContent: 'center', alignItems: 'center'}, style]}>
          <Text>{error}</Text>
        </View>
      );
    }
    let imageSource;
    if (typeof source === 'number') {
      imageSource = source;
    } else {
      let {uri, width, height, ...other} = source; // eslint-disable-line
      imageSource = {uri, ...other};
    }
    if (animated) {
      component = (
        <View style={[{aspectRatio: ratio}, style]}>
          <Animated.Image
            {...otherProps}
            source={imageSource}
            style={[{width: '100%', height: '100%'}, animatedStyle]}
          />
        </View>
      );
    }
    component = (
      <View style={[{aspectRatio: ratio}, style]}>
        <Image
          {...otherProps}
          source={imageSource}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    );
    if (onPress) {
      return <TouchableOpacity onPress={onPress}>{component}</TouchableOpacity>;
    } else {
      return component;
    }
  }

  _onLoadSuccess(width: number, height: number) {
    let ratio = width / height;
    this.setState({
      isLoading: false,
      ratio,
    });
  }

  _onLoadFail(error: Error) {
    this.setState({
      isLoading: false,
      error: 'Error: ' + error.message,
    });
  }
}

// A cancellable version of Image.getSize
export function getImageSize(
  source: {uri: string},
  onSuccess: Function,
  onFail: Function,
) {
  let isCancelled = false;
  Image.getSize(
    source.uri,
    (...args) => {
      if (!isCancelled) {
        onSuccess(...args);
      }
    },
    (...args) => {
      if (!isCancelled) {
        onFail(...args);
      }
    },
  );
  return {
    cancel: () => {
      isCancelled = true;
    },
  };
}
