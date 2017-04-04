// @flow

import type {Exhibitor} from './Exhibitor-type';
import type {Action} from 'types/Action';

export default function exhibitorReducer(
  exhibitorList: Map<string, Exhibitor> = new Map(),
  action: Action
) {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED': {
      let newExhibitorList = new Map(
        action.initialData.exhibitorList || new Map()
      );
      return newExhibitorList;
    }
    default:
      return exhibitorList;
  }
}
