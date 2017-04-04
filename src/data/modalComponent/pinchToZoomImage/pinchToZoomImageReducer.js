// @flow

import type {
  PinchToZoomImageAction,
  PinchToZoomImageState,
} from './PinchToZoom-type';

let initialState = {
  visible: false,
};

export default function pinchToZoomImageReducer(
  state: PinchToZoomImageState = initialState,
  action: PinchToZoomImageAction
) {
  switch (action.type) {
    case 'SHOW_PINCHABLE_IMAGE_REQUESTED': {
      return {visible: true, imageSource: action.imageSource};
    }
    case 'HIDE_PINCHABLE_IMAGE_REQUESTED': {
      return {visible: false};
    }
    default:
      return state;
  }
}
