// @flow

import DateTime from 'immutable-datetime';
import {MONTHS} from '../constants/dateNames';

const FORMATS = {
  DATE_TIME: (dateTimeString: string, formatTo12Hours: boolean) => {
    let date = DateTime.fromString(dateTimeString);
    let {hours, minutes, periods} = getTimeObject(date);

    let time = `${hours}:${minutes}`;
    if (formatTo12Hours) {
      time = `${format12Hours(hours)}:${minutes} ${periods}`;
    }

    if (isToday(date)) {
      return `Today - ${time}`;
    }
    let month = MONTHS[date.getMonth()];
    let dateNumber = padZero(date.getDate());
    let year = date.getYear();

    if (format12Hours) {
      return `${dateNumber} ${month} ${year} - ${time}`;
    }
  },
  DATE: (dateString: string) => {
    let date = DateTime.fromString(dateString);
    if (isToday(date)) {
      return 'Today';
    }
    let month = MONTHS[date.getMonth()];
    let dateNumber = padZero(date.getDate());
    let year = date.getYear();
    return `${dateNumber} ${month} ${year}`;
  },
  TIME: (dateTimeString: string, formatTo12Hours: boolean) => {
    let date = DateTime.fromString(dateTimeString);
    let {hours, minutes, periods} = getTimeObject(date);
    if (formatTo12Hours) {
      return `${format12Hours(hours)}:${minutes} ${periods}`;
    }
    return `${hours}:${minutes}`;
  },
};

export function getTimeObject(date: Date) {
  let hours = date.getHours();
  let minutes = padZero(date.getMinutes());
  let periods = hours >= 12 ? 'pm' : 'am';
  return {
    hours: padZero(hours),
    minutes,
    periods,
  };
}

export function padZero(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

export function isToday(date: Date, today: Date = new Date()) {
  return today.toDateString() === date.toDateString();
}

export default function formatDateTime(
  dateString: string,
  format: string,
  formatTo12Hours?: boolean = true,
) {
  let formatter = FORMATS[format];
  return formatter ? formatter(dateString, formatTo12Hours) : '';
}

export function format12Hours(hours: string) {
  let hoursInNumber = Number(hours);
  return padZero(hoursInNumber > 12 ? hoursInNumber - 12 : hoursInNumber);
}
