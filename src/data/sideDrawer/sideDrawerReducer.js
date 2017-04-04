// @flow

import type {SideDrawerState, SideDrawerAction} from './SideDrawer-type';

const initialState = {
  isOpened: false,
};

export default function sideDrawerReducer(sideDrawerState: SideDrawerState = initialState, action: SideDrawerAction) {
  switch (action.type) {
    case 'SIDE_DRAWER_OPENED': {
      return {
        isOpened: true,
      };
    }
    case 'SIDE_DRAWER_CLOSED': {
      return {
        isOpened: false,
      };
    }
    default: return sideDrawerState;
  }
}
