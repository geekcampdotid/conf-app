// @flow
import {AsyncStorage} from 'react-native';

import {BOOKMARKED_SCHEDULE_KEY} from '../../constants/asyncStorageKey';

import type {Store, Action} from '../../types';

export default function bookmarkScheduleMiddleware(store: Store) {
  let {dispatch} = store;
  return (next: (action: Action) => void) => (action: Action) => {
    if (
      action.type !== 'NEW_BOOKMARK_SELECTED' &&
      action.type !== 'BOOKMARK_REMOVED'
    ) {
      next(action);
      return;
    }

    let {scheduleID} = action;
    if (action.type === 'NEW_BOOKMARK_SELECTED') {
      let {bookmarkedScheduleList} = store.getState().schedule;
      if (bookmarkedScheduleList.indexOf(scheduleID) > -1) {
        return;
      }
      let newBookmarkedScheduleList = [...bookmarkedScheduleList, scheduleID];
      AsyncStorage.setItem(
        BOOKMARKED_SCHEDULE_KEY,
        newBookmarkedScheduleList.toString(),
      )
        .then(() => {
          // TODO: dispatch success toast
          dispatch({
            type: 'BOOKMARK_LIST_UPDATED',
            newBookmarkedScheduleList,
          });
        })
        .catch(() => {
          // TODO: dispatch error toast
          dispatch({
            type: 'BOOKMARK_LIST_UPDATED',
            newBookmarkedScheduleList: bookmarkedScheduleList,
          });
        });
      next(action);
    } else if (action.type === 'BOOKMARK_REMOVED') {
      let {bookmarkedScheduleList} = store.getState().schedule;
      let newBookmarkedScheduleList = [...bookmarkedScheduleList];
      let index = newBookmarkedScheduleList.indexOf(action.scheduleID);
      if (index > -1) {
        newBookmarkedScheduleList.splice(index, 1);
        AsyncStorage.setItem(
          BOOKMARKED_SCHEDULE_KEY,
          newBookmarkedScheduleList.toString(),
        )
          .then(() => {
            // TODO: dispatch success toast
            dispatch({
              type: 'BOOKMARK_LIST_UPDATED',
              newBookmarkedScheduleList,
            });
          })
          .catch(() => {
            // TODO: show error toast
            dispatch({
              type: 'BOOKMARK_LIST_UPDATED',
              newBookmarkedScheduleList: bookmarkedScheduleList,
            });
          });
        next(action);
      } else {
        return;
      }
    }
    return;
  };
}
