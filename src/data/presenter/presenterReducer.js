// @flow

import type {Presenter} from './Presenter-type';
import type {Action} from 'types/Action';

export default function presenterReducer(
  presenterList: Map<string, Presenter> = new Map(),
  action: Action
) {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED': {
      let newPresenterList = new Map(
        action.initialData.presenterList || new Map()
      );
      return newPresenterList;
    }
    default:
      return presenterList;
  }
}
