// @flow

import DateTime from 'immutable-datetime';

import type {Schedule} from '../data/schedule/Schedule-type';

type TimeKey = 'upcoming' | 'ongoing' | 'past';

export default function getScheduleBasedOnCurrentTime(
  scheduleList: Array<Schedule>,
  date: number,
) {
  let result: Map<TimeKey, Array<Schedule>> = new Map();
  let now = DateTime.fromNumber(date);
  for (let schedule of scheduleList) {
    let scheduleDate = DateTime.fromString(schedule.dateString);
    let endScheduleDate = scheduleDate.addMinutes(schedule.durationInMinutes);
    let timeKey = '';
    if (now.toNumber() < scheduleDate.toNumber()) {
      timeKey = 'upcoming';
    } else if (now.toNumber() < endScheduleDate.toNumber()) {
      timeKey = 'ongoing';
    } else {
      timeKey = 'past';
    }

    let keySchedule = result.get(timeKey);
    if (keySchedule) {
      keySchedule.push(schedule);
      result.set(timeKey, keySchedule);
    } else {
      result.set(timeKey, [schedule]);
    }
  }

  return result;
}
