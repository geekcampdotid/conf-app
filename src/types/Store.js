// @flow
import type {RootState} from './RootState';
import type {Dispatch} from './Dispatch';

export type Store = {
  dispatch: Dispatch;
  getState: () => RootState;
};
