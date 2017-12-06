// @flow

import {StyleSheet} from 'react-native';
import {GREY} from '../../../constants/colors';

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
    paddingLeft: 15,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 28,
    borderWidth: 0.3,
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
