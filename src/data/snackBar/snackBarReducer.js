// @flow

import type {SnackBar, SnackBarAction} from './SnackBar-type';

const initialState = {
  visible: false,
  textMessage: '',
};

export default function snackBarReducer(
  snackBarState: SnackBar = initialState,
  action: SnackBarAction,
) {
  switch (action.type) {
    case 'SHOW_SNACKBAR_REQUESTED': {
      return {
        visible: true,
        ...action,
      };
    }
    case 'HIDE_SNACKBAR_REQUESTED': {
      return {
        visible: false,
        ...action,
      };
    }
    default:
      return snackBarState;
  }
}
