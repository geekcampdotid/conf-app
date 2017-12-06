// @flow

import {
  getFilteredSchedule,
  getScheduleHours,
  getFilteredScheduleByDate,
} from '../scheduleFilter';

import convertArrayToMap from '../../helpers/convertArrayToMap';

import type {Schedule} from '../../data/schedule/Schedule-type';
let scheduleListJSON = [
  {
    id: 'schedule1',
    dayOfEvent: 1,
    dateString: '2017-08-15T08:00:00.000Z',
    durationInMinutes: 15,
    talkTitle: 'Opening Speech',
    presenters: ['presenter1', 'presenter2'],
    stage: 'The Hall',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
  },
  {
    id: 'schedule2',
    dayOfEvent: 1,
    dateString: '2017-08-15T08:00:00.000Z',
    durationInMinutes: 30,
    talkTitle:
      'Living a Global Life as an Entrepreneur and Building a Business to Fit the Community',
    presenters: ['presenter3'],
    stage: 'SCTV Studio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget massa consequat, ultricies eros quis, aliquet elit. Mauris eget elementum diam, eget sodales neque. Aenean cursus massa in ullamcorper mattis. Nunc eget bibendum nisl. Ut in sapien tempus augue hendrerit bibendum. Sed.',
  },
  {
    id: 'schedule3',
    dayOfEvent: 1,
    dateString: '2017-08-15T13:00:00.000Z',
    durationInMinutes: 60,
    talkTitle: 'The Bhineka Journey: From Startup to IPO',
    presenters: ['presenter1'],
    stage: 'SCTV Studio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
  },
  {
    id: 'schedule4',
    dayOfEvent: 1,
    dateString: '2017-08-15T09:00:00.000Z',
    durationInMinutes: 40,
    talkTitle: 'Debunking Startup Invesment',
    presenters: ['presenter2'],
    stage: 'The Hall',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
  },
  {
    id: 'schedule5',
    dayOfEvent: 2,
    dateString: '2017-08-16T08:00:00.000Z',
    durationInMinutes: 15,
    talkTitle: 'Closing Speech',
    presenters: ['presenter1'],
    stage: 'SCTV Studio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
  },
  {
    id: 'schedule6',
    dayOfEvent: 1,
    dateString: '2017-08-15T12:00:00.000Z',
    durationInMinutes: 90,
    talkTitle: 'Lunch and Networking',
  },
];

let scheduleList = convertArrayToMap(scheduleListJSON);

it('should get the correct schedule hour list', () => {
  let scheduleHourList = getScheduleHours(scheduleList);
  expect(scheduleHourList).toEqual([
    '2017-08-15T08:00:00.000Z',
    '2017-08-15T09:00:00.000Z',
    '2017-08-15T12:00:00.000Z',
    '2017-08-15T13:00:00.000Z',
    '2017-08-16T08:00:00.000Z',
  ]);
});

it('should get the filtered schedule list (by time)', () => {
  let filteredSchedule = getFilteredSchedule(
    scheduleList,
    '2017-08-15T08:00:00.000Z',
  );
  let expectedResult: Map<string, Schedule> = new Map();
  expectedResult.set('schedule1', {
    id: 'schedule1',
    dayOfEvent: 1,
    dateString: '2017-08-15T08:00:00.000Z',
    durationInMinutes: 15,
    talkTitle: 'Opening Speech',
    presenters: ['presenter1', 'presenter2'],
    stage: 'The Hall',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
  });
  expectedResult.set('schedule2', {
    id: 'schedule2',
    dayOfEvent: 1,
    dateString: '2017-08-15T08:00:00.000Z',
    durationInMinutes: 30,
    talkTitle:
      'Living a Global Life as an Entrepreneur and Building a Business to Fit the Community',
    presenters: ['presenter3'],
    stage: 'SCTV Studio',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget massa consequat, ultricies eros quis, aliquet elit. Mauris eget elementum diam, eget sodales neque. Aenean cursus massa in ullamcorper mattis. Nunc eget bibendum nisl. Ut in sapien tempus augue hendrerit bibendum. Sed.',
  });
  expect(filteredSchedule).toEqual(expectedResult);
});

it('should return filtered schedule by date', () => {
  let filteredSchedule = getFilteredScheduleByDate(
    scheduleList,
    '2017-08-15T20:20:00.000Z',
  );
  expect(filteredSchedule.size).toBe(5);
  expect(filteredSchedule.has('schedule1')).toBe(true);
  expect(filteredSchedule.has('schedule2')).toBe(true);
  expect(filteredSchedule.has('schedule3')).toBe(true);
  expect(filteredSchedule.has('schedule4')).toBe(true);
  expect(filteredSchedule.has('schedule5')).toBe(false);
  expect(filteredSchedule.has('schedule6')).toBe(true);

  filteredSchedule = getFilteredScheduleByDate(
    scheduleList,
    '2017-08-16T00:20:00.000Z',
  );
  expect(filteredSchedule.size).toBe(1);
  expect(filteredSchedule.has('schedule1')).toBe(false);
  expect(filteredSchedule.has('schedule2')).toBe(false);
  expect(filteredSchedule.has('schedule3')).toBe(false);
  expect(filteredSchedule.has('schedule4')).toBe(false);
  expect(filteredSchedule.has('schedule5')).toBe(true);
  expect(filteredSchedule.has('schedule6')).toBe(false);

  filteredSchedule = getFilteredScheduleByDate(
    scheduleList,
    '2017-08-17T00:20:00.000Z',
  );
  expect(filteredSchedule.size).toBe(0);
});
