// @flow

import formatDateTime, {
  isToday,
  getClockTime,
  format12Hour,
} from '../formatDateTime';

it('should render DATE_TIME format', () => {
  expect(formatDateTime('2017-04-01T21:51:00.000Z', 'DATE_TIME')).toBe(
    `01 April 2017 - 09:51 p.m.`
  );

  expect(formatDateTime('2017-04-24T09:51:00.000Z', 'DATE_TIME')).toBe(
    `24 April 2017 - 09:51 a.m.`
  );
});

it('should render TIME format', () => {
  expect(formatDateTime('2017-04-15T21:51:00.000Z', 'TIME')).toBe(`09:51 p.m.`);
});

it('should render DATE format', () => {
  let date = new Date(2017, 4, 1, 21, 51, 23);
  expect(formatDateTime(date.toISOString(), 'DATE')).toBe(`01 May 2017`);

  date = new Date(2017, 3, 24, 9, 51, 23);
  expect(formatDateTime(date.toISOString(), 'DATE')).toBe(`24 April 2017`);
});

it('should return true if the date is today', () => {
  let today = new Date();
  let result = isToday(today);
  expect(result).toBe(true);

  let date = new Date(2017, 3, 1, 21, 51, 23);
  result = isToday(date);
  expect(result).toBe(false);
});

it('should return the correct formatted local time', () => {
  let dateTime = '2017-08-15T08:00:00.000Z';
  let {localHour, minute} = getClockTime(dateTime);
  let {hour, period} = format12Hour(localHour);
  let result = hour + ':' + minute + ' ' + period;
  expect(result).toBe('08:00 a.m.');
});
