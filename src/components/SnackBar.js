// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Animated, Easing, StyleSheet, TouchableOpacity} from 'react-native';

import {View, Text} from './core-components';

import {DEFAULT_FONT_SIZE} from 'constants/text';

import type {SnackBar as SnackBarType} from 'data/snackBar/SnackBar-type';
import type {RootState} from 'types/RootState';
import type {Dispatch} from 'types/Dispatch';

/*
* Values are from https://material.io/guidelines/motion/duration-easing.html#duration-easing-dynamic-durations
*/
const easingValues = {
  entry: Easing.bezier(0.0, 0.0, 0.2, 1),
  exit: Easing.bezier(0.4, 0.0, 1, 1),
};

const SNACKBAR_TIMEOUT = 2500;
const DEFAULT_VIEW_HEIGHT = 9999;
const SNACKBAR_PADDING = 10;

type Props = {
  snackBar: SnackBarType;
  onCloseSnackBar: () => void;
};

export class SnackBarComponent extends Component {
  props: Props;
  _animatedValue: Animated.Value;
  _closeSnackBar: number;
  _viewHeight: number;

  constructor() {
    super(...arguments);
    this._viewHeight = DEFAULT_VIEW_HEIGHT;
    this._animatedValue = new Animated.Value(this._viewHeight);
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    if (oldProps.snackBar !== newProps.snackBar) {
      if (newProps.snackBar.visible) {
        this._animate(this._viewHeight, SNACKBAR_PADDING);

        clearTimeout(this._closeSnackBar);
        this._closeSnackBar = setTimeout(() => {
          if (this.props.snackBar.visible) {
            this.props.onCloseSnackBar();
          }
        }, SNACKBAR_TIMEOUT);
      } else {
        this._animate(SNACKBAR_PADDING, this._viewHeight);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this._closeSnackBar);
  }

  render() {
    let {textMessage, actionButton} = this.props.snackBar;
    let actionButtonComponent;
    if (actionButton) {
      let {actionText, actionHandler} = actionButton;
      let actionHandlerOnPress = () => {
        actionHandler();
        this.props.onCloseSnackBar();
      };
      actionButtonComponent = (
        <View style={styles.actionButton}>
          <TouchableOpacity onPress={actionHandlerOnPress}>
            <Text style={styles.actionText}>{actionText}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <Animated.View
        onLayout={({nativeEvent: {layout: {height}}}) => {
          this._viewHeight = height;
        }}
        style={[
          styles.container,
          {
            transform: [{translateY: this._animatedValue}],
          },
        ]}
      >
        <Text style={styles.textMessage}>
          {textMessage}
        </Text>
        {actionButtonComponent}
      </Animated.View>
    );
  }

  _animate(fromValue: number, toValue: number) {
    this._animatedValue.setValue(fromValue);
    Animated.spring(this._animatedValue, {
      toValue,
      easing: fromValue === SNACKBAR_PADDING
        ? easingValues.exit
        : easingValues.entry,
    }).start();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
    backgroundColor: '#484848',
  },
  textMessage: {
    fontSize: DEFAULT_FONT_SIZE,
    flex: 1,
    color: '#FFFFFF',
  },
  actionButton: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: DEFAULT_FONT_SIZE,
    fontWeight: '600',
    color: '#FF9800',
  },
});

function mapStateToProps(state: RootState) {
  return {
    snackBar: state.snackBar,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onCloseSnackBar: () => {
      dispatch({
        type: 'HIDE_SNACKBAR_REQUESTED',
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarComponent);
