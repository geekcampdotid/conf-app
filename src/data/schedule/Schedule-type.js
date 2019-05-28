// @flow

import type {StageName} from '../stage/Stage-type';

export type Schedule = {
  id: string,
  dayOfEvent: number,
  dateString: string,
  durationInMinutes: number,
  talkTitle: string,
  presenters?: Array<string>, // id of presenters
  stage?: StageName,
  description?: string,
};

export type ScheduleState = {
  scheduleList: Map<string, Schedule>,
  bookmarkedScheduleList: Array<string>,
};

export type ScheduleAction =
  | {
      type: 'NEW_BOOKMARK_SELECTED',
      scheduleID: string,
    }
  | {
      type: 'BOOKMARK_REMOVED',
      scheduleID: string,
    }
  | {
      type: 'BOOKMARK_LIST_UPDATED',
      newBookmarkedScheduleList: Array<string>,
    };
