// @flow

import {MONTHS} from '../constants/dateNames';

const FORMATS = {
  DATE_TIME: (dateTimeString: string) => {
    let date = new Date(dateTimeString);
    let {hour, minute, period} = getTimeObject(dateTimeString);

    if (isToday(date)) {
      return `Today - ${hour}:${minute} ${period}`;
    }
    let month = MONTHS[date.getUTCMonth()];
    let dateNumber = padZero(date.getUTCDate());
    let year = date.getUTCFullYear();
    return `${dateNumber} ${month} ${year} - ${hour}:${minute} ${period}`;
  },
  DATE: (dateString: string) => {
    let date = new Date(dateString);
    if (isToday(date)) {
      return 'Today';
    }
    let month = MONTHS[date.getUTCMonth()];
    let dateNumber = padZero(date.getUTCDate());
    let year = date.getUTCFullYear();
    return `${dateNumber} ${month} ${year}`;
  },
  TIME: (dateTimeString: string) => {
    let {hour, minute, period} = getTimeObject(dateTimeString);
    return `${hour}:${minute} ${period}`;
  },
};

export function getTimeObject(time: string) {
  let {localHour, minute} = getClockTime(time);
  let {hour, period} = format12Hour(localHour);
  return {
    hour,
    minute,
    period,
  };
}

export function padZero(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export function isToday(date: Date, today: Date = new Date()) {
  return today.toDateString() === date.toDateString() ? true : false;
}

export default function formatDateTime(dateString: string, format: string) {
  let formatter = FORMATS[format];
  return formatter ? formatter(dateString) : '';
}

export function getClockTime(dateTime: string) {
  let localHour = padZero(new Date(dateTime).getUTCHours());
  let minute = padZero(new Date(dateTime).getUTCMinutes());
  return {
    localHour,
    minute,
  };
}

export function format12Hour(hourString: string) {
  let hour = Number(hourString);
  let newHour = padZero(hour > 12 ? hour - 12 : hour);
  let period = hour >= 12 ? 'p.m.' : 'a.m.';
  return {
    hour: newHour,
    period,
  };
}
