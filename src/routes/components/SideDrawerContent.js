// @flow

import React from 'react';
import {connect} from 'react-redux';
import {View, Text} from '../../components/core';
import {ResponsiveImage} from '../../components';
import {TouchableOpacity} from 'react-native';

import styles from './SideDrawerContent-style';
import sidebarLogo from '../../assets/images/geekcamp-logo.png';
import kodefoxLogo from '../../assets/images/kodefox-logo.png';
import {List, ListItem} from 'react-native-elements';
import {DARK_GREY} from '../../constants/colors';
import {SCALE_RATIO} from '../../constants/layout';

import type {NavigationObject} from '../../data/navigation/Navigation-type';
import type {Dispatch} from '../../types';

type Props = {
  isOpened: boolean,
  navigation: NavigationObject,
  closeDrawer: () => void,
};

type MenuItem = {
  title: string,
  icon: string,
  iconType?: string,
  screen: string,
};

const list: Array<MenuItem> = [
  {
    title: 'About',
    icon: 'info',
    iconType: 'font-awesome',
    screen: 'AboutUsScene',
  },
  {
    title: 'Sponsors',
    icon: 'handshake-o',
    iconType: 'font-awesome',
    screen: 'SponsorsScene',
  },
  {
    title: 'Contact',
    icon: 'user',
    iconType: 'font-awesome',
    screen: 'ContactInfoScene',
  },
];

export function SideDrawerContent(props: Props) {
  let {isOpened, navigation: {navigate}, closeDrawer} = props;
  if (!isOpened) {
    return null;
  }
  return (
    <View style={styles.flex}>
      <View style={styles.root}>
        <View style={styles.logoContainer}>
          <ResponsiveImage source={sidebarLogo} />
        </View>
        <View style={styles.menuContainer}>
          <List containerStyle={styles.menuListView}>
            {list.map((item, i) => {
              let {title, icon, screen, iconType} = item;
              return (
                <ListItem
                  key={i}
                  containerStyle={styles.menuListItem}
                  component={TouchableOpacity}
                  title={title}
                  titleStyle={styles.menuText}
                  titleNumberOfLines={5}
                  leftIcon={{
                    name: icon,
                    size: SCALE_RATIO * 20,
                    color: DARK_GREY,
                    type: iconType || 'material-icon',
                  }}
                  hideChevron={true}
                  onPress={() => {
                    if (screen) {
                      closeDrawer();
                      navigate(screen);
                    }
                  }}
                />
              );
            })}
          </List>
        </View>
        <TouchableOpacity
          style={styles.footerContainer}
          onPress={() => {
            closeDrawer();
            navigate('KodefoxProfileScene');
          }}
        >
          <Text style={styles.footerText}>Created by</Text>
          <View style={styles.footerLogoContainer}>
            <ResponsiveImage source={kodefoxLogo} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    closeDrawer: () => {
      dispatch({
        type: 'SIDE_DRAWER_CLOSED',
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(SideDrawerContent);
