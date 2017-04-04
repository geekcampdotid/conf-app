// @flow

import type {ScheduleState} from './Schedule-type';
import type {Action} from 'types/Action';

let initialState: ScheduleState = {
  scheduleList: new Map(),
  bookmarkedScheduleList: [],
};

export default function presenterReducer(
  scheduleState: ScheduleState = initialState,
  action: Action
) {
  switch (action.type) {
    case 'INITIAL_DATA_RECEIVED': {
      let {scheduleList, bookmarkedScheduleList} = action.initialData;
      let newScheduleList = new Map(scheduleList);
      let newBookmarkedScheduleList = bookmarkedScheduleList || [];
      return {
        scheduleList: newScheduleList,
        bookmarkedScheduleList: newBookmarkedScheduleList,
      };
    }
    case 'NEW_BOOKMARK_SELECTED': {
      let {scheduleID} = action;
      let {bookmarkedScheduleList} = scheduleState;
      if (bookmarkedScheduleList.indexOf(scheduleID) < 0) {
        return scheduleState;
      }
      let newBookmarkedScheduleList = [...bookmarkedScheduleList, scheduleID];
      return {
        ...scheduleState,
        bookmarkedScheduleList: newBookmarkedScheduleList,
      };
    }
    case 'BOOKMARK_REMOVED': {
      let {scheduleID} = action;
      let {bookmarkedScheduleList} = scheduleState;
      let index = bookmarkedScheduleList.indexOf(scheduleID);
      if (index > -1) {
        bookmarkedScheduleList.splice(index, 1);
      }
      return {
        ...scheduleState,
        bookmarkedScheduleList,
      };
    }
    case 'BOOKMARK_LIST_UPDATED': {
      let {newBookmarkedScheduleList} = action;
      return {
        ...scheduleState,
        bookmarkedScheduleList: newBookmarkedScheduleList,
      };
    }
    default:
      return scheduleState;
  }
}
