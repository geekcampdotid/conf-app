// @flow
import {createStore, combineReducers, applyMiddleware} from 'redux';
import presenterReducer from './data/presenter/presenterReducer';
import scheduleReducer from './data/schedule/scheduleReducer';
import exhibitorReducer from './data/exhibitor/exhibitorReducer';
import snackBarReducer from './data/snackBar/snackBarReducer';
import pinchToZoomImageReducer from './data/modalComponent/pinchToZoomImage/pinchToZoomImageReducer';

import bookmarkScheduleMiddleware from './data/schedule/bookmarkScheduleMiddleware';

let app = combineReducers({
  presenterList: presenterReducer,
  schedule: scheduleReducer,
  exhibitorList: exhibitorReducer,
  snackBar: snackBarReducer,
  pinchToZoomImageModal: pinchToZoomImageReducer,
});

let createDataStore = () => {
  let store = createStore(
    app,
    applyMiddleware(bookmarkScheduleMiddleware),
  );
  return store;
};

export default createDataStore;
