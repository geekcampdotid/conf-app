// @flow

type ImageSource = number | {uri: string; width?: number; height?: number};

export type PinchToZoomImageState = {
  visible: boolean;
  imageSource?: ImageSource;
};

export type PinchToZoomImageAction =
  | {
      type: 'SHOW_PINCHABLE_IMAGE_REQUESTED';
      imageSource: ImageSource;
    }
  | {
      type: 'HIDE_PINCHABLE_IMAGE_REQUESTED';
    };
