// @flow

import DateTime from 'immutable-datetime';

import formatDateTime, {
  getTimeObject,
  isToday,
  format12Hours,
} from '../formatDateTime';

it('should render DATE_TIME format', () => {
  expect(formatDateTime('2017-04-01T21:51:00.000Z', 'DATE_TIME')).toBe(
    `01 April 2017 - 09:51 pm`,
  );

  expect(formatDateTime('2017-04-24T09:51:00.000Z', 'DATE_TIME')).toBe(
    `24 April 2017 - 09:51 am`,
  );

  expect(formatDateTime('2017-04-24T21:51:00.000Z', 'DATE_TIME', false)).toBe(
    `24 April 2017 - 21:51`,
  );
});

it('should render TIME format', () => {
  expect(formatDateTime('2017-04-15T21:51:00.000Z', 'TIME')).toBe(`09:51 pm`);
  expect(formatDateTime('2017-04-15T21:51:00.000Z', 'TIME', false)).toBe(
    `21:51`,
  );
});

it('should render DATE format', () => {
  let date = '2017-05-01T14:51:23.000Z';
  expect(formatDateTime(date, 'DATE')).toBe(`01 May 2017`);

  date = '2017-04-24T02:51:23.000Z';
  expect(formatDateTime(date, 'DATE')).toBe(`24 April 2017`);
});

it('should return true if the date is today', () => {
  let date = new Date();
  let result = isToday(date, new Date());
  expect(result).toBe(true);

  date = new Date(2017, 3, 1, 21, 51, 23);
  result = isToday(date, new Date());
  expect(result).toBe(false);
});

it('should return the correct formatted local time', () => {
  let date = DateTime.fromString('2017-08-15T08:00:00.000Z');

  let {hours, minutes, periods} = getTimeObject(date);
  let formattedHours = format12Hours(hours);
  let result = `${formattedHours}:${minutes} ${periods}`;
  expect(result).toBe('08:00 am');
});
