// @flow

import {StyleSheet} from 'react-native';
import {GREY} from '../../../constants/colors';

export const AVATAR_SIZE = 60;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingTop: 5,
    height: '100%',
  },
  itemContainer: {
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    height: 70,
    justifyContent: 'center',
  },
  avatarContainer: {
    borderWidth: 0.5,
    borderColor: GREY,
  },
  noItemFound: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 15,
  },
});

export default styles;
