// @flow
import {AsyncStorage} from 'react-native';

import {BOOKMARKED_SCHEDULE_KEY} from '../constants/asyncStorageKey';

import presenterListJSON from '../fixtures/Presenter-fixture.js';
import scheduleListJSON from '../fixtures/Schedule-fixture.js';
import exhibitorListJSON from '../fixtures/Exhibitor-fixture.js';

import convertArrayToMap from '../helpers/convertArrayToMap';

import type {Dispatch} from '../types';

export default async function populateInitialData(dispatch: Dispatch) {
  let bookmarkedScheduleListString = await AsyncStorage.getItem(
    BOOKMARKED_SCHEDULE_KEY,
  );
  let bookmarkedScheduleList =
    (bookmarkedScheduleListString && bookmarkedScheduleListString.split(',')) ||
    [];
  dispatch({
    type: 'INITIAL_DATA_RECEIVED',
    initialData: {
      presenterList: convertArrayToMap(presenterListJSON),
      scheduleList: convertArrayToMap(scheduleListJSON),
      bookmarkedScheduleList,
      exhibitorList: convertArrayToMap(exhibitorListJSON),
    },
  });
}
