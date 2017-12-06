import getHighlighTalks from '../getHighlighTalks';
import convertArrayToMap from '../convertArrayToMap';

let scheduleList = new Map();
scheduleList.set('schedule1', {
  id: 'schedule1',
  dayOfEvent: 1,
  dateString: '2017-08-15T08:00:00.000Z',
  durationInMinutes: 15,
  talkTitle: 'Opening Speech',
  presenters: ['presenter1', 'presenter2'],
  stage: 'start',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
});

scheduleList.set('schedule2', {
  id: 'schedule2',
  dayOfEvent: 1,
  dateString: '2017-08-15T08:00:00.000Z',
  durationInMinutes: 30,
  talkTitle:
    'Living a Global Life as an Entrepreneur and Building a Business to Fit the Community',
  presenters: ['presenter3'],
  stage: 'steer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget massa consequat, ultricies eros quis, aliquet elit. Mauris eget elementum diam, eget sodales neque. Aenean cursus massa in ullamcorper mattis. Nunc eget bibendum nisl. Ut in sapien tempus augue hendrerit bibendum. Sed.',
});

scheduleList.set('schedule3', {
  id: 'schedule3',
  dayOfEvent: 1,
  dateString: '2017-08-15T13:00:00.000Z',
  durationInMinutes: 60,
  talkTitle: 'The Bhineka Journey: From Startup to IPO',
  presenters: ['presenter1'],
  stage: 'steer',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
});

scheduleList.set('schedule4', {
  id: 'schedule4',
  dayOfEvent: 1,
  dateString: '2017-08-15T09:00:00.000Z',
  durationInMinutes: 40,
  talkTitle: 'Debunking Startup Invesment',
  presenters: ['presenter2'],
  stage: 'scale',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
});

scheduleList.set('schedule5', {
  id: 'schedule5',
  dayOfEvent: 2,
  dateString: '2017-08-16T08:00:00.000Z',
  durationInMinutes: 15,
  talkTitle: 'Closing Speech',
  presenters: ['presenter1'],
  stage: 'start',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed libero ligula, molestie a nunc vel, molestie elementum sem. Nulla non sem tincidunt, suscipit arcu eu, tristique urna. Proin eu lectus malesuada, porta nunc nec, interdum ante. Vivamus at orci quis mauris consequat elementum. Proin vel lectus enim. Integer vel magna convallis, varius mauris et, pellentesque lorem. Nam quis leo eget nunc aliquet ullamcorper.',
});

scheduleList.set('schedule6', {
  id: 'schedule6',
  dayOfEvent: 1,
  dateString: '2017-08-15T12:00:00.000Z',
  durationInMinutes: 60,
  talkTitle: 'Lunch and Networking',
});

it('should get highlight talks', () => {
  let currentEvent = convertArrayToMap(
    getHighlighTalks(scheduleList, '2017-08-15T07:00:00.000Z', 2),
  );
  expect(currentEvent.size).toBe(2);
  expect(currentEvent.has('schedule1')).toBe(true);
  expect(currentEvent.has('schedule2')).toBe(true);
  expect(currentEvent.has('schedule3')).toBe(false);

  currentEvent = convertArrayToMap(
    getHighlighTalks(scheduleList, '2017-08-15T08:20:00.000Z', 2),
  );
  expect(currentEvent.size).toBe(2);
  expect(currentEvent.has('schedule1')).toBe(false);
  expect(currentEvent.has('schedule2')).toBe(true);
  expect(currentEvent.has('schedule3')).toBe(false);

  currentEvent = convertArrayToMap(
    getHighlighTalks(scheduleList, '2017-08-15T13:20:00.000Z'),
  );
  expect(currentEvent.size).toBe(1);
  expect(currentEvent.has('schedule3')).toBe(true);

  currentEvent = convertArrayToMap(
    getHighlighTalks(scheduleList, '2017-08-16T08:20:00.000Z'),
  );
  expect(currentEvent.size).toBe(0);
});

it('should not include event with no-presenter schedule', () => {
  let currentEvent = convertArrayToMap(
    getHighlighTalks(scheduleList, '2017-08-15T12:00:00.000Z'),
  );
  expect(currentEvent.size).toBe(1);
  expect(currentEvent.has('schedule3')).toBe(true);
});
