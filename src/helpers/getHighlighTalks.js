// @flow

import {getFilteredScheduleByDate} from './scheduleFilter';

import type {Schedule} from '../data/schedule/Schedule-type';

const MAXIMUM_HIGHLIGHT_TALKS = 4;

export default function getHighlighTalks(
  scheduleList: Map<string, Schedule>,
  currentDateTimeString: string,
  maxTalksNumber?: number,
) {
  let filteredSchedule = getFilteredScheduleByDate(
    scheduleList,
    currentDateTimeString,
  );
  let maxData = maxTalksNumber || MAXIMUM_HIGHLIGHT_TALKS;
  let currentDateTime = new Date(currentDateTimeString);
  let currentEvent = [];
  filteredSchedule.forEach((schedule) => {
    if (schedule.presenters) {
      let {durationInMinutes} = schedule;
      let scheduleTime = new Date(schedule.dateString);
      if (
        scheduleTime
          .setTime(scheduleTime.getTime() + durationInMinutes * 60 * 1000)
          .valueOf() >= currentDateTime.valueOf()
      ) {
        currentEvent.push({...schedule});
      }
    }
  });

  let sortedCurrentEvent = currentEvent.sort((a, b) => {
    return new Date(a.dateString).valueOf() - new Date(b.dateString).valueOf();
  });
  sortedCurrentEvent = sortedCurrentEvent.slice(0, maxData);
  return sortedCurrentEvent;
}
