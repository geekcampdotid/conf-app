// @flow

import {StyleSheet, Platform} from 'react-native';

import {FONT_BOLD} from '../../../constants/text';
import {GREY, SHADOW_GREY} from '../../../constants/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontWeight: FONT_BOLD,
    fontSize: 25,
    color: GREY,
  },
  mapContainer: {
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        zIndex: 1, // to make the shadow appear at the bottom in iOS
        shadowColor: SHADOW_GREY,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
    }),
  },
  listItemTitle: {
    fontWeight: FONT_BOLD,
  },
  listContainer: {
    marginTop: 20,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

export default styles;
