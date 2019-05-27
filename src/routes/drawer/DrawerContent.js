// @flow

import React from 'react';
import {View} from '../../components/core';
import {ResponsiveImage} from '../../components';
import {TouchableOpacity} from 'react-native';

import styles from './DrawerContent-style';
import sidebarLogo from '../../assets/images/geekcamp-logo.png';
import {List, ListItem} from 'react-native-elements';
import {DARK_GREY} from '../../constants/colors';
import {SCALE_RATIO} from '../../constants/layout';

import type {NavigationScreenProp} from 'react-navigation';

type Props = {
  navigation: NavigationScreenProp<*>,
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

export default function DrawerContent(props: Props) {
  let {navigation: {navigate}} = props;
  return (
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
                    navigate(screen);
                  }
                }}
              />
            );
          })}
        </List>
      </View>
    </View>
  );
}
