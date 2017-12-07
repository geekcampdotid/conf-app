// @flow

import type {
  NavigationState,
  NavigationAction,
} from './data/navigation/Navigation-type';
import type {PresenterState, Presenter} from './data/presenter/Presenter-type';
import type {
  ScheduleState,
  Schedule,
  ScheduleAction,
} from './data/schedule/Schedule-type';
import type {ExhibitorState, Exhibitor} from './data/exhibitor/Exhibitor-type';
import type {
  SnackBar as SnackBarState,
  SnackBarAction,
} from './data/snackBar/SnackBar-type';
import type {
  PinchToZoomImageState,
  PinchToZoomImageAction,
} from './data/modalComponent/pinchToZoomImage/PinchToZoom-type';
// all action types here

export type InitialDataAction = {
  type: 'INITIAL_DATA_RECEIVED',
  initialData: {
    presenterList?: Map<string, Presenter>,
    scheduleList?: Map<string, Schedule>,
    bookmarkedScheduleList?: Array<string>,
    exhibitorList?: Map<string, Exhibitor>,
  },
};

export type Action =
  | InitialDataAction
  | NavigationAction
  | ScheduleAction
  | SnackBarAction
  | PinchToZoomImageAction;

export type RootState = {
  navigation: NavigationState,
  presenterList: PresenterState,
  schedule: ScheduleState,
  exhibitorList: ExhibitorState,
  snackBar: SnackBarState,
  pinchToZoomImageModal: PinchToZoomImageState,
};

export type Dispatch = (action: Action) => void;

export type Store = {
  dispatch: Dispatch,
  getState: () => RootState,
};
