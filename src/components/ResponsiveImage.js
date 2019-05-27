// @flow

import React, {Children, Component} from 'react';
import autobind from 'class-autobind';
import resolveAssetSource from 'resolveAssetSource';
import {
  View,
  Image,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import {Text} from './core';
import {THEME_COLOR} from '../constants/colors';

type Props = {
  source: number | {uri: string, width?: number, height?: number},
  initialRatio?: number,
  style?: StyleSheetTypes,
  animated?: boolean,
  animatedStyle?: StyleSheetTypes,
  onPress?: () => void,
  pinchToZoom?: boolean,
  children?: ReactNode,
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
      initialRatio, // eslint-disable-line no-unused-vars
      style,
      animated,
      animatedStyle,
      onPress,
      pinchToZoom, // eslint-disable-line no-unused-vars
      children,
      ...otherProps
    } = this.props;
    let {isLoading, ratio, error} = this.state;
    let imageEl;
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
    if (source != null && typeof source === 'object') {
      // eslint-disable-next-line no-unused-vars
      let {uri, width, height, ...other} = source;
      imageSource = {uri, ...other};
    } else {
      imageSource = source;
    }
    if (animated) {
      imageEl = (
        <Animated.Image
          {...otherProps}
          source={imageSource}
          style={[{width: '100%', height: '100%'}, animatedStyle]}
        >
          {children}
        </Animated.Image>
      );
    } else if (Children.count(children)) {
      imageEl = (
        <ImageBackground
          {...otherProps}
          source={imageSource}
          style={{width: '100%', height: '100%'}}
        >
          {children}
        </ImageBackground>
      );
    } else {
      imageEl = (
        <Image
          {...otherProps}
          source={imageSource}
          style={{width: '100%', height: '100%'}}
        />
      );
    }
    let viewEl = <View style={[{aspectRatio: ratio}, style]}>{imageEl}</View>;
    if (onPress) {
      return <TouchableOpacity onPress={onPress}>{viewEl}</TouchableOpacity>;
    } else {
      return viewEl;
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
