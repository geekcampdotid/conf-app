// @flow

import React from 'react';
import {ColorLabel} from './components';

import {DEFAULT_STAGE_COLOR} from 'constants/colors';

import type {StageName} from 'data/stage/Stage-type';

type Props = {
  stage: StageName; // TODO: change this based on the upcoming event stage name
  textStyle?: StyleSheetTypes;
  containerStyle?: StyleSheetTypes;
};

export default function StageLabel(props: Props) {
  let {stage, containerStyle, textStyle} = props;
  return (
    <ColorLabel
      containerStyle={[
        {backgroundColor: DEFAULT_STAGE_COLOR[stage]},
        containerStyle,
      ]}
      textStyle={textStyle}
      text={stage.toUpperCase()}
    />
  );
}
