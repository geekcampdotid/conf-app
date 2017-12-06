// @flow
import {createStore, combineReducers, applyMiddleware} from 'redux';
import navigationReducer from './data/navigation/navigationReducer';
import sideDrawerReducer from './data/sideDrawer/sideDrawerReducer';
import presenterReducer from './data/presenter/presenterReducer';
import scheduleReducer from './data/schedule/scheduleReducer';
import exhibitorReducer from './data/exhibitor/exhibitorReducer';
import snackBarReducer from './data/snackBar/snackBarReducer';
import pinchToZoomImageReducer from './data/modalComponent/pinchToZoomImage/pinchToZoomImageReducer';

import bookmarkScheduleMiddleware from './data/schedule/bookmarkScheduleMiddleware';
import snackBarMiddleware from './data/snackBar/snackBarMiddleware';

let app = combineReducers({
  navigation: navigationReducer,
  sideDrawer: sideDrawerReducer,
  presenterList: presenterReducer,
  schedule: scheduleReducer,
  exhibitorList: exhibitorReducer,
  snackBar: snackBarReducer,
  pinchToZoomImageModal: pinchToZoomImageReducer,
});

let createDataStore = () => {
  let store = createStore(
    app,
    applyMiddleware(bookmarkScheduleMiddleware, snackBarMiddleware),
  );
  return store;
};

export default createDataStore;
