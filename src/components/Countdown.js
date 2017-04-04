// @flow

import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Animated, Easing, Platform, StyleSheet} from 'react-native';
import {View} from './core-components';
import {ResponsiveImage} from './components';
import {upperDigits, lowerDigits} from '../constants/countdownImages';

const ONE_MINUTE = 60000;
const ONE_SECOND = 1000;

type Props = {
  startingNumber: number;
  bySecond?: boolean;
  updateFinishStatus?: (status: boolean) => void;
};

type State = {
  current1: number;
  pre1: number;
  isFlip1Upper: boolean;
  flipValue1: Animated.Value;
  isLower1Hidden: boolean;
  current2: number;
  pre2: number;
  isFlip2Upper: boolean;
  flipValue2: Animated.Value;
  isLower2Hidden: boolean;
};

export default class Countdown extends Component {
  state: State;
  props: Props;

  constructor() {
    super(...arguments);
    autobind(this);
    let {startingNumber} = this.props;
    this.state = {
      current1: Math.floor(startingNumber / 10),
      pre1: Math.floor(startingNumber / 10),
      isFlip1Upper: true,
      flipValue1: new Animated.Value(0),
      isLower1Hidden: false,
      current2: startingNumber % 10,
      pre2: startingNumber % 10,
      isFlip2Upper: true,
      flipValue2: new Animated.Value(0),
      isLower2Hidden: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._iterate();
    }, ONE_SECOND);
  }

  _iterate() {
    let {updateFinishStatus} = this.props;
    let timePeriod = this.props.bySecond ? ONE_SECOND : ONE_MINUTE;
    setTimeout(() => {
      if (this.state.current1 + this.state.current2 !== 0) {
        this._countdown(() => {
          this._iterate();
        });
      } else if (updateFinishStatus) {
        updateFinishStatus(true);
      }
    }, timePeriod);
  }

  render() {
    let {
      current1,
      current2,
      pre1,
      pre2,
      isLower1Hidden,
      isLower2Hidden,
    } = this.state;
    let {_getPrevious} = this;
    let FlipComponent = (props: { digit: number }) => {
      return this._renderFlipDigit(props.digit);
    };
    let isFirstDigitChange = current2 === 0;
    let upper1Flip = isFirstDigitChange
      ? <FlipComponent digit={1} />
      : <ResponsiveImage
          source={upperDigits[current1]}
          style={styles.timerDigit1}
        />;
    let lower1Cover = (
      <ResponsiveImage
        key={'l1c' + pre1}
        source={lowerDigits[pre1]}
        style={styles.timerDigit1}
      />
    );
    let lower2Cover = (
      <ResponsiveImage
        key={'l2c' + pre2}
        source={lowerDigits[pre2]}
        style={styles.timerDigit2}
      />
    );
    let lower1 = (
      <ResponsiveImage
        key={'l1' + current1}
        source={lowerDigits[current1]}
        style={styles.timerDigit1}
      />
    );
    let lower2 = (
      <ResponsiveImage
        key={'l2' + current2}
        source={lowerDigits[current2]}
        style={styles.timerDigit2}
      />
    );

    return (
      <View style={styles.timerContainer}>
        <View style={styles.timer}>
          <ResponsiveImage
            source={
              upperDigits[
                isFirstDigitChange ? _getPrevious(current1) : current1
              ]
            }
            style={styles.timerDigit1}
          />
          {isLower1Hidden ? [lower1Cover, lower1] : [lower1, lower1Cover]}
          {upper1Flip}
          <ResponsiveImage
            source={upperDigits[_getPrevious(current2)]}
            style={styles.timerDigit2}
          />
          {isLower2Hidden ? [lower2Cover, lower2] : [lower2, lower2Cover]}
          <FlipComponent digit={2} />
        </View>
      </View>
    );
  }

  _renderFlipDigit(digitNumber: number) {
    let {_interpolate} = this;
    let {
      flipValue1,
      flipValue2,
      pre1,
      pre2,
      isFlip1Upper,
      isFlip2Upper,
    } = this.state;
    let isNumber1 = digitNumber === 1;
    let preDigit = isNumber1 ? pre1 : pre2;
    let isFlipUseUpper = isNumber1 ? isFlip1Upper : isFlip2Upper;
    let style = isNumber1 ? styles.timerDigit1 : styles.timerDigit2;
    let flip = isNumber1 ? _interpolate(flipValue1) : _interpolate(flipValue2);
    return (
      <Animated.View style={[style, {transform: [{rotateX: flip}]}]}>
        <ResponsiveImage
          source={
            isFlipUseUpper ? upperDigits[preDigit] : lowerDigits[preDigit]
          }
        />
      </Animated.View>
    );
  }

  _interpolate(value: Animated.Value) {
    return value.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg'],
    });
  }

  _countdown(callback?: Function) {
    let {current1, current2} = this.state;
    if (current2 === 0) {
      if (current1 === 0) {
        this._animate(2, 9);
        this._animate(1, 9);
      } else {
        this._animate(2, 9);
        this._animate(1, current1 - 1);
      }
    } else {
      this._animate(2, current2 - 1);
    }
    if (callback) {
      callback();
    }
  }

  _animate = (digit: number, newValue: number) => {
    Animated.timing(this.state[`flipValue${digit}`], {
      toValue: 0.25,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: Platform.OS === 'android',
    }).start(() => {
      this.setState({
        [`flipValue${digit}`]: new Animated.Value(0.75),
        [`pre${digit}`]: newValue,
        [`isFlip${digit}Upper`]: false,
      });
      Animated.timing(this.state[`flipValue${digit}`], {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: Platform.OS === 'android',
      }).start(() => {
        this.setState(
          {
            [`isLower${digit}Hidden`]: true,
            [`current${digit}`]: newValue,
            [`flipValue${digit}`]: new Animated.Value(0),
          },
          () => {
            this.setState({
              [`isFlip${digit}Upper`]: true,
              [`isLower${digit}Hidden`]: false,
            });
          }
        );
      });
    });
  };

  _getPrevious(digit: number) {
    return digit === 0 ? 9 : digit - 1;
  }
}

const styles = StyleSheet.create({
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  timer: {
    width: 65,
    height: 34,
    flexDirection: 'row',
  },
  timerDigit1: {
    position: 'absolute',
    width: 30,
    left: 0,
    top: 0,
  },
  timerDigit2: {
    position: 'absolute',
    width: 30,
    left: 35,
    top: 0,
  },
  button: {
    borderRadius: 4,
    backgroundColor: '#B55',
    width: 30,
    height: 30,
    borderBottomWidth: 4,
    borderBottomColor: '#A12',
  },
});
