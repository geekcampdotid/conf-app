// @flow
import type {Action} from 'types/Action';
import type {Store} from 'types/Store';

export default function snackBarMiddleware(store: Store) {
  let {dispatch} = store;
  return (next: (action: Action) => void) => (action: Action) => {
    if (action.type !== 'Navigation/BACK') {
      next(action);
      return;
    }

    let state = store.getState();
    let {snackBar} = state;
    if (snackBar.visible) {
      dispatch({
        type: 'HIDE_SNACKBAR_REQUESTED',
      });
    }
    next(action);
  };
}
