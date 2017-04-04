import bookmarkScheduleMiddleware from '../bookmarkScheduleMiddleware';

let mockAsyncStorageValue = jest.fn();

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn((key, value) => {
      return new Promise((resolve) => {
        mockAsyncStorageValue(value);
        resolve({key, value});
      });
    }),
    getItem: jest.fn(() => {
      // return new Promise((resolve) => {
      //   resolve(JSON.stringify(getTestData()));
      // });
    }),
  },
}));

it('should not process action thats is not NEW_BOOKMARK_SELECTED and BOOKMARK_REMOVED', () => {
  let state = {};
  let dispatch = jest.fn();
  let store = {
    getState: () => state,
    dispatch,
  };
  let next = jest.fn();
  bookmarkScheduleMiddleware(store)(next)({
    type: 'other_action_type',
  });
  expect(next).toHaveBeenCalledTimes(1);
  expect(next).toHaveBeenCalledWith({type: 'other_action_type'});
  expect(dispatch).toHaveBeenCalledTimes(0);
});

it('should process bookmarking schedule', async () => {
  let state = {
    schedule: {
      bookmarkedScheduleList: ['test2'],
    },
  };
  let dispatch = jest.fn();
  let store = {
    getState: () => state,
    dispatch,
  };
  let next = jest.fn();
  await bookmarkScheduleMiddleware(store)(next)({
    type: 'NEW_BOOKMARK_SELECTED',
    scheduleID: 'test1',
  });
  expect(mockAsyncStorageValue).toHaveBeenCalled();
  expect(mockAsyncStorageValue).toHaveBeenLastCalledWith('test2,test1');
  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'BOOKMARK_LIST_UPDATED',
    newBookmarkedScheduleList: ['test2', 'test1'],
  });
  expect(next).toHaveBeenCalledTimes(1);
});

it('should not process existing bookmark schedule', async () => {
  let state = {
    schedule: {
      bookmarkedScheduleList: ['test1'],
    },
  };
  let dispatch = jest.fn();
  let store = {
    getState: () => state,
    dispatch,
  };
  let next = jest.fn();

  mockAsyncStorageValue = jest.fn();

  await bookmarkScheduleMiddleware(store)(next)({
    type: 'NEW_BOOKMARK_SELECTED',
    scheduleID: 'test1',
  });
  expect(mockAsyncStorageValue).not.toHaveBeenCalled();
  expect(dispatch).not.toHaveBeenCalled();
});

it('should remove the bookmark', async () => {
  let state = {
    schedule: {
      bookmarkedScheduleList: ['test1', 'test2', 'test3'],
    },
  };
  let dispatch = jest.fn();
  let store = {
    getState: () => state,
    dispatch,
  };
  let next = jest.fn();

  mockAsyncStorageValue = jest.fn();

  await bookmarkScheduleMiddleware(store)(next)({
    type: 'BOOKMARK_REMOVED',
    scheduleID: 'test1',
  });
  expect(mockAsyncStorageValue).toHaveBeenCalled();
  expect(mockAsyncStorageValue).toHaveBeenLastCalledWith('test2,test3');
  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'BOOKMARK_LIST_UPDATED',
    newBookmarkedScheduleList: ['test2', 'test3'],
  });
  expect(next).toHaveBeenCalledTimes(1);
});

it('should not remove non-existing bookmark', async () => {
  let state = {
    schedule: {
      bookmarkedScheduleList: ['test1', 'test2', 'test3'],
    },
  };
  let dispatch = jest.fn();
  let store = {
    getState: () => state,
    dispatch,
  };
  let next = jest.fn();

  mockAsyncStorageValue = jest.fn();

  await bookmarkScheduleMiddleware(store)(next)({
    type: 'BOOKMARK_REMOVED',
    scheduleID: 'test4',
  });
  expect(mockAsyncStorageValue).not.toHaveBeenCalled();
  expect(dispatch).not.toHaveBeenCalled();
});
