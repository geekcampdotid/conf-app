// @flow
import {StyleSheet} from 'react-native';

import {
  FONT_BOLD,
  DEFAULT_FONT_SIZE,
  LARGE_FONT_SIZE,
  SMALL_FONT_SIZE,
} from '../../../constants/text';
import {THEME_COLOR, GREY, DARK_GREY} from '../../../constants/colors';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 10,
  },
  marginTop: {
    marginTop: 10,
  },
  marginBottom: {
    marginBottom: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  marginVertical: {
    marginVertical: 10,
  },
  root: {
    flex: 1,
    paddingTop: 10,
  },
  titleContainer: {
    flex: 1,
    marginBottom: 5,
  },
  title: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
    marginBottom: 5,
  },
  carouselTitle: {
    fontWeight: FONT_BOLD,
    fontSize: 25,
    color: THEME_COLOR,
    textAlign: 'center',
    paddingBottom: 10,
  },
  subMenuText: {
    fontWeight: FONT_BOLD,
    fontSize: 23,
    color: THEME_COLOR,
    paddingLeft: 25,
    marginVertical: 10,
  },
  detailsContainer: {
    borderRadius: 6,
    backgroundColor: 'white',
    marginTop: 10,
    padding: 20,
    justifyContent: 'space-around',
  },
  detailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 13,
  },
  detailsItemText: {
    paddingRight: 20,
  },
  detailsItemTitleText: {
    fontWeight: FONT_BOLD,
    fontSize: LARGE_FONT_SIZE,
    color: DARK_GREY,
  },
  contentText: {
    fontSize: DEFAULT_FONT_SIZE,
    flexWrap: 'wrap',
    color: GREY,
  },
  date: {
    fontSize: SMALL_FONT_SIZE,
    color: GREY,
    marginBottom: 5,
  },
  presenters: {
    fontSize: 12,
    color: GREY,
  },
  detail: {
    color: GREY,
    paddingLeft: 5,
    fontSize: 12,
  },
  carouselDetail: {
    paddingHorizontal: 15,
  },
  footer: {
    flexDirection: 'row',
  },
  stageContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  detailContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  detailButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
