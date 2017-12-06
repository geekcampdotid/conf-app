// @flow

import type {Schedule} from '../data/schedule/Schedule-type';

export function getFilteredSchedule(
  scheduleList: Map<string, Schedule>,
  timeString: string,
) {
  let filteredSchedule: Map<string, Schedule> = new Map();
  let time = new Date(timeString);
  scheduleList.forEach((schedule) => {
    let {dateString} = schedule;
    let scheduleDate = new Date(dateString);
    if (
      scheduleDate.getUTCDate() === time.getUTCDate() &&
      scheduleDate.getUTCHours() === time.getUTCHours() &&
      scheduleDate.getUTCMinutes() === time.getUTCMinutes()
    ) {
      filteredSchedule.set(schedule.id, schedule);
    }
  });
  return filteredSchedule;
}

export function getScheduleHours(
  scheduleList: Map<string, Schedule>,
  dateFilterString?: string,
) {
  let scheduleHourList: Map<string, string> = new Map();
  let dateFilter = new Date(dateFilterString || '');
  scheduleList.forEach((schedule) => {
    let {dateString} = schedule;
    let scheduleDate = new Date(dateString);
    let scheduleKey =
      scheduleDate.getUTCDate().toString() +
      scheduleDate.getUTCHours().toString() +
      scheduleDate.getUTCMinutes().toString();
    if (
      !dateFilterString ||
      dateFilter.getUTCDate() === scheduleDate.getUTCDate()
    ) {
      scheduleHourList.set(scheduleKey, dateString);
    }
  });
  return Array.from(scheduleHourList.values()).sort();
}

export function getScheduleDates(scheduleList: Map<string, Schedule>) {
  let scheduleDateList: Map<string, string> = new Map();
  scheduleList.forEach((schedule) => {
    let {dateString} = schedule;
    let scheduleDate = new Date(dateString);
    let scheduleKey =
      scheduleDate.getUTCMonth().toString() +
      scheduleDate.getUTCDate().toString();
    scheduleDateList.set(scheduleKey, dateString);
  });
  return Array.from(scheduleDateList.values()).sort();
}

export function isEqualByMinute(dateStringOne: string, dateStringTwo: string) {
  let dateOne = new Date(dateStringOne);
  let dateTwo = new Date(dateStringTwo);
  return (
    dateOne.getUTCDate() === dateTwo.getUTCDate() &&
    dateOne.getUTCHours() === dateTwo.getUTCHours() &&
    dateOne.getUTCMinutes() === dateTwo.getUTCMinutes()
  );
}

export function isStageMatched(schedule: Schedule, selectedStage: string) {
  let stage = schedule.stage || '';
  return selectedStage.toLowerCase() === stage.toLowerCase();
}

export function getFilteredScheduleByDate(
  scheduleList: Map<string, Schedule>,
  filteredDate: string,
) {
  let filteredSchedule: Map<string, Schedule> = new Map();
  let date = new Date(filteredDate);
  scheduleList.forEach((schedule) => {
    let {dateString} = schedule;
    let scheduleDate = new Date(dateString);
    if (
      scheduleDate.getUTCDate() === date.getUTCDate() &&
      scheduleDate.getUTCMonth() === date.getUTCMonth() &&
      scheduleDate.getUTCFullYear() === date.getUTCFullYear()
    ) {
      filteredSchedule.set(schedule.id, schedule);
    }
  });
  return filteredSchedule;
}
