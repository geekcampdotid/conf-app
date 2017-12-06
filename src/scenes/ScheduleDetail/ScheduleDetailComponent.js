// @flow

import React from 'react';
import {Icon, ListItem} from 'react-native-elements';

import {View, Text} from '../../components/core-components';
import {StageLabel} from '../../components/components';

import formatDateTime from '../../helpers/formatDateTime';

import styles from './ScheduleDetailComponent-styles';

import {baseColors} from '../../constants/colors';
import DEFAULT_AVATAR from '../../assets/images/default-profile-pic.png';

import type {Presenter} from '../../data/presenter/Presenter-type';
import type {StageName} from '../../data/stage/Stage-type';
import type {NavigateFunction} from '../../data/navigation/Navigation-type';

type Props = {
  time: string,
  stage: StageName,
  presenters: Array<string>,
  presenterList: Map<string, Presenter>,
  navigate: NavigateFunction,
};

export default function ScheduleDetailComponent(props: Props) {
  let {time, stage, presenterList, presenters, navigate} = props;
  return (
    <View style={styles.scheduleDetailContainer}>
      <View style={[styles.scheduleDetailSection, {paddingVertical: 5}]}>
        <View style={styles.scheduleDetailSectionKeyField}>
          <View style={styles.scheduleDetailKey}>
            <Icon
              name="date-range"
              iconStyle={styles.scheduleDetailIcon}
              color={baseColors.DARK_GREY}
            />
            <Text>Time</Text>
          </View>
        </View>
        <View style={styles.scheduleDetailSectionValueField}>
          <Text>{formatDateTime(time, 'DATE_TIME')}</Text>
        </View>
      </View>

      <View style={styles.scheduleDetailSection}>
        <View style={styles.scheduleDetailSectionKeyField}>
          <View style={styles.scheduleDetailKey}>
            <Icon
              name="room"
              iconStyle={styles.scheduleDetailIcon}
              color={baseColors.DARK_GREY}
            />
            <Text>Place</Text>
          </View>
        </View>
        <View
          style={[
            styles.scheduleDetailSectionValueField,
            styles.stageContainer,
          ]}
        >
          <StageLabel stage={stage} textStyle={styles.textStage} />
        </View>
      </View>

      <View style={styles.scheduleDetailSection}>
        <View style={styles.scheduleDetailSectionKeyField}>
          <View style={styles.scheduleDetailKey}>
            <Icon
              name="people"
              iconStyle={styles.scheduleDetailIcon}
              color={baseColors.DARK_GREY}
            />
            <Text>Speakers</Text>
          </View>
        </View>
        <View
          style={[
            styles.scheduleDetailSectionValueField,
            styles.presenterItemContainer,
          ]}
        >
          {presenters.map((presenter, index) => {
            let presenterDetail = presenterList.get(presenter);
            if (!presenterDetail) {
              return null;
            }
            let {name, profilePictureUri, jobTitle} = presenterDetail;
            return (
              <ListItem
                roundAvatar
                key={index}
                avatar={profilePictureUri || DEFAULT_AVATAR}
                avatarStyle={styles.avatarStyle}
                title={name}
                subtitle={jobTitle}
                rightIcon={{name: 'info-outline', style: {fontSize: 18}}}
                containerStyle={{borderBottomWidth: 0, paddingRight: 0}}
                onPress={() =>
                  navigate('PresenterDetailScene', {
                    presenter: presenterDetail,
                  })
                }
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
