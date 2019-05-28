// @flow

export type SnackBar = {
  visible: boolean,
  textMessage: string,
  actionButton?: {
    actionText: string,
    actionHandler: Function,
  },
};

export type SnackBarAction =
  | {
      type: 'SHOW_SNACKBAR_REQUESTED',
      textMessage: string,
      actionButton?: {
        actionText: string,
        actionHandler: Function,
      },
    }
  | {
      type: 'HIDE_SNACKBAR_REQUESTED',
    };
