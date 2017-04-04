// @flow

import type {NavigationAction} from 'data/navigation/Navigation-type';
import type {SideDrawerAction} from 'data/sideDrawer/SideDrawer-type';
import type {Presenter} from 'data/presenter/Presenter-type';
import type {Schedule, ScheduleAction} from 'data/schedule/Schedule-type';
import type {Exhibitor} from 'data/exhibitor/Exhibitor-type';
import type {SnackBarAction} from 'data/snackBar/SnackBar-type';
import type {PinchToZoomImageAction} from 'data/modalComponent/pinchToZoomImage/PinchToZoom-type';
// all action types here

export type InitialDataAction = {
  type: 'INITIAL_DATA_RECEIVED';
  initialData: {
    presenterList?: Map<string, Presenter>;
    scheduleList?: Map<string, Schedule>;
    bookmarkedScheduleList?: Array<string>;
    exhibitorList?: Map<string, Exhibitor>;
  };
};

export type Action =
  | InitialDataAction
  | NavigationAction
  | SideDrawerAction
  | ScheduleAction
  | SnackBarAction
  | PinchToZoomImageAction;
