// @flow

import type {NavigationState} from 'data/navigation/Navigation-type';
import type {SideDrawerState} from 'data/sideDrawer/SideDrawer-type';
import type {PresenterState} from 'data/presenter/Presenter-type';
import type {ScheduleState} from 'data/schedule/Schedule-type';
import type {ExhibitorState} from 'data/exhibitor/Exhibitor-type';
import type {SnackBar as SnackBarState} from 'data/snackBar/SnackBar-type';
import type {PinchToZoomImageState} from 'data/modalComponent/pinchToZoomImage/PinchToZoom-type';

export type RootState = {
  navigation: NavigationState;
  sideDrawer: SideDrawerState;
  presenterList: PresenterState;
  schedule: ScheduleState;
  exhibitorList: ExhibitorState;
  snackBar: SnackBarState;
  pinchToZoomImageModal: PinchToZoomImageState;
};
