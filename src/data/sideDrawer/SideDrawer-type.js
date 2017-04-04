// @flow

export type SideDrawerState = {
  isOpened: boolean;
};

export type SideDrawerAction = {
  type: 'SIDE_DRAWER_OPENED';
} | {
  type: 'SIDE_DRAWER_CLOSED';
};
