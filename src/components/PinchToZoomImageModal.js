// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Modal, Image, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import resolveAssetSource from 'resolveAssetSource';
import ImageZoom from 'react-native-image-pan-zoom';

import getScreenSize from '../helpers/getScreenSize';
import {statusBarHeight} from '../constants/layout';
import {GREY} from '../constants/colors';

import type {PinchToZoomImageState} from '../data/modalComponent/pinchToZoomImage/PinchToZoom-type';
import type {RootState, Dispatch} from '../types';

type Props = {
  pinchToZoomImageModal: PinchToZoomImageState,
  onRequestClose: () => {},
};

let {width: screenWidth, height: screenHeight} = getScreenSize();
// TODO: make it work for url image
export function PinchToZoomImageModal(props: Props) {
  let {pinchToZoomImageModal: {visible, imageSource}, onRequestClose} = props;
  if (imageSource && typeof imageSource === 'number') {
    let imageSize = resolveAssetSource(imageSource);
    if (imageSize) {
      let {width, height} = imageSize;
      if (width && height) {
        let ratio = width / height;
        height = Math.round(screenWidth / ratio);
      }

      return (
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
          onRequestClose={onRequestClose}
        >
          <Icon
            raised
            reverse
            name="close"
            size={15}
            color={GREY}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            containerStyle={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? statusBarHeight + 10 : 10,
              right: 10,
              zIndex: 50,
            }}
            onPress={onRequestClose}
          />

          <ImageZoom
            cropWidth={screenWidth}
            cropHeight={screenHeight}
            imageWidth={screenWidth}
            imageHeight={height}
          >
            <Image
              style={{width: '100%', height: '100%'}}
              source={imageSource}
            />
          </ImageZoom>
        </Modal>
      );
    }
  }
  return null;
}

function mapStateToProps(state: RootState) {
  return {
    pinchToZoomImageModal: state.pinchToZoomImageModal,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onRequestClose: () => {
      dispatch({
        type: 'HIDE_PINCHABLE_IMAGE_REQUESTED',
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  PinchToZoomImageModal,
);
