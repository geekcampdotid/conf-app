import DateTime from 'immutable-datetime';
import getScheduleBasedOnCurrentTime from '../getScheduleBasedOnCurrentTime';

describe('getScheduleBasedOnCurrentTime', () => {
  it('should return ongoing talk if any', () => {
    let scheduleList = [
      {
        dateString: '2017-12-08T10:30:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:40:00.140Z',
        durationInMinutes: 40,
      },
    ];
    let now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    let result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('ongoing')).toBe(true);
    expect(result.get('ongoing')).toEqual([
      {
        dateString: '2017-12-08T10:30:00.140Z',
        durationInMinutes: 40,
      },
    ]);

    scheduleList = [
      {
        dateString: '2017-12-08T11:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T09:00:00.140Z',
        durationInMinutes: 40,
      },
    ];
    now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('ongoing')).toBe(true);
    expect(result.get('ongoing')).toEqual([
      {
        dateString: '2017-12-08T10:20:00.140Z',
        durationInMinutes: 40,
      },
    ]);
  });
  it('should return upcoming talk if any', () => {
    let scheduleList = [
      {
        dateString: '2017-12-08T10:30:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:40:00.140Z',
        durationInMinutes: 40,
      },
    ];
    let now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    let result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('upcoming')).toBe(true);
    expect(result.get('upcoming')).toEqual([
      {
        dateString: '2017-12-08T10:40:00.140Z',
        durationInMinutes: 40,
      },
    ]);

    scheduleList = [
      {
        dateString: '2017-12-08T11:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T09:00:00.140Z',
        durationInMinutes: 40,
      },
    ];
    now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('upcoming')).toBe(true);
    expect(result.get('upcoming')).toEqual([
      {
        dateString: '2017-12-08T11:20:00.140Z',
        durationInMinutes: 40,
      },
    ]);
  });

  it('should return past talk if any', () => {
    let scheduleList = [
      {
        dateString: '2017-12-08T09:30:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:40:00.140Z',
        durationInMinutes: 40,
      },
    ];
    let now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    let result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('past')).toBe(true);
    expect(result.get('past')).toEqual([
      {
        dateString: '2017-12-08T09:30:00.140Z',
        durationInMinutes: 40,
      },
    ]);

    scheduleList = [
      {
        dateString: '2017-12-08T11:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T10:00:00.140Z',
        durationInMinutes: 30,
      },
      {
        dateString: '2017-12-08T10:20:00.140Z',
        durationInMinutes: 40,
      },
      {
        dateString: '2017-12-08T09:00:00.140Z',
        durationInMinutes: 40,
      },
    ];
    now = DateTime.fromString('2017-12-08T10:31:29.140Z');
    result = getScheduleBasedOnCurrentTime(scheduleList, now.toNumber());
    expect(result.has('past')).toBe(true);
    expect(result.get('past')).toEqual([
      {
        dateString: '2017-12-08T10:00:00.140Z',
        durationInMinutes: 30,
      },
      {
        dateString: '2017-12-08T09:00:00.140Z',
        durationInMinutes: 40,
      },
    ]);
  });
});
