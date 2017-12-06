import handleBackPressAndroid from '../handleBackPressAndroid';
import {INITIAL_SCENE} from '../../constants/navigation';

it('should back to prev route if there is stack routes', () => {
  let dispatch = jest.fn();

  let navigation = {
    index: 1,
    routes: [
      {
        routes: [
          {key: 'HomeScene', routeName: 'HomeScene'},
          {key: 'AttendeesScene', routeName: 'AttendeesScene'},
          {key: 'ScheduleScene', routeName: 'ScheduleScene'},
          {key: 'MapScene', routeName: 'MapScene'},
          {key: 'AboutUsScene', routeName: 'AboutUsScene'},
        ],
        index: 2,
        routeName: 'NavBar',
        key: 'Init',
      },
    ],
    key: 'id-1496419293165-2',
  };

  handleBackPressAndroid(navigation, dispatch);

  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'Navigation/BACK',
    key: navigation.key,
  });
});

it('should back to initial scene if there is no stack routes but the current scene is not the initial scene', () => {
  let dispatch = jest.fn();
  let navigation = {
    index: 0,
    routes: [
      {
        routes: [
          {key: 'HomeScene', routeName: 'HomeScene'},
          {key: 'AttendeesScene', routeName: 'AttendeesScene'},
          {key: 'ScheduleScene', routeName: 'ScheduleScene'},
          {key: 'MapScene', routeName: 'MapScene'},
          {key: 'AboutUsScene', routeName: 'AboutUsScene'},
        ],
        index: 5,
        routeName: 'NavBar',
        key: 'Init',
      },
    ],
    key: 'id-1496419293165-2',
  };

  handleBackPressAndroid(navigation, dispatch);

  expect(dispatch).toHaveBeenCalled();
  expect(dispatch).toHaveBeenCalledWith({
    type: 'Navigation/NAVIGATE',
    routeName: INITIAL_SCENE,
  });
});
