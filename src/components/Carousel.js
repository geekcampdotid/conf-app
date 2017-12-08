// @flow
// copied and modified from https://github.com/yjy5264/react-native-card-carousel

import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
} from 'react-native';

import type {Schedule} from '../data/schedule/Schedule-type';

type State = {
  scaleYArr: Array<Animated.Value>,
  translateYArr: Array<Animated.Value>,
};

type Props = {
  height: number,
  data: Array<Schedule>,
  onPress: (item: Schedule) => void,
  contentRender: (item: Schedule) => ReactNode,
};

export default class CarouselCard extends Component<Props, State> {
  width: number;
  blockWidth: number;
  height: number;
  blockHeight: number;
  moveDistance: number;
  ratio: number;
  x0: number;
  currentPageFloat: number;
  arr: Array<Schedule>;
  arrLength: number;
  mainScroll: ?ScrollView;
  assistScroll: ?ScrollView;

  constructor() {
    super(...arguments);
    this.width = PlatformInfo.width();
    this.blockWidth = this.width * 0.708;
    this.height =
      this.props.height || this.blockWidth * PlatformInfo.height() / this.width;
    this.blockHeight = this.height;
    this.moveDistance = this.width * 0.733;
    this.ratio = 0.872;
    this.x0 = this.moveDistance - (this.width - this.moveDistance) / 2;
    this.currentPageFloat = 1;

    let {array, arrayLength} = this._getArrayFromProps();
    this.arr = array;
    this.arrLength = arrayLength;

    let scaleYArr = [];
    let translateYArr = [];
    for (let i = 0; i < this.arrLength + 4; i++) {
      scaleYArr.push(new Animated.Value(0));
      translateYArr.push(new Animated.Value(0));
    }
    this.state = {scaleYArr, translateYArr};
  }

  componentWillReceiveProps() {
    if (this.arr !== this.props.data) {
      let {array, arrayLength} = this._getArrayFromProps();
      this.arr = array;
      this.arrLength = arrayLength;
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.mainScroll) {
        this.mainScroll.scrollTo({
          x: this.x0 + this.moveDistance,
          animated: false,
        });
      }
    }, 0);
    setTimeout(() => {
      if (this.assistScroll) {
        this.assistScroll.scrollTo({x: this.moveDistance, animated: false});
      }
    }, 0);
  }

  _getItems() {
    return this.arr.map((item, i) => {
      let marginWidth = (this.moveDistance - this.blockWidth) / 2;
      return (
        <View key={i} style={{flexDirection: 'row'}}>
          <View style={{width: marginWidth}} />
          <Animated.View
            style={{
              width: this.blockWidth,
              height: this.blockHeight,
              backgroundColor: '#ffffff',
              transform: [
                {scaleY: this.state.scaleYArr[i]},
                {translateY: this.state.translateYArr[i]},
              ],
            }}
          >
            {this.props.contentRender(item)}
          </Animated.View>
          <View style={{width: marginWidth}} />
        </View>
      );
    });
  }

  _getView() {
    let arr = [];
    for (let i = 0; i < this.arrLength + 2; i++) {
      arr.push('');
    }
    let marginWidth = (this.moveDistance - this.blockWidth) / 2;
    return arr.map((item, i) => (
      <View key={i} style={{flexDirection: 'row'}}>
        <View style={{width: marginWidth}} />
        <TouchableOpacity onPress={() => this.props.onPress(this.arr[i + 1])}>
          <View style={{width: this.blockWidth, height: this.blockHeight}} />
        </TouchableOpacity>
        <View style={{width: marginWidth}} />
      </View>
    ));
  }

  _onAssistScroll(e) {
    if (this.mainScroll && this.assistScroll) {
      let x: number = e.nativeEvent.contentOffset.x;
      if (Math.abs(x - (this.arrLength + 1) * this.moveDistance) < 0.5) {
        this.mainScroll &&
          this.mainScroll.scrollTo({
            x: this.moveDistance + this.x0,
            animated: false,
          });
        this.assistScroll &&
          this.assistScroll.scrollTo({x: this.moveDistance, animated: false});
      } else if (Math.abs(x) < 0.1) {
        this.mainScroll &&
          this.mainScroll.scrollTo({
            x: this.moveDistance * this.arrLength + this.x0,
            animated: false,
          });
        this.assistScroll &&
          this.assistScroll.scrollTo({
            x: this.moveDistance * this.arrLength,
            animated: false,
          });
      } else {
        let mainX = x + this.x0;
        this.mainScroll &&
          this.mainScroll.scrollTo({x: mainX, animated: false});
      }
      let currentPageFloat = x / this.moveDistance;
      this._animateCards(currentPageFloat);
    }
  }

  _animateCards(currentPageFloat) {
    for (let i = 0; i < this.arrLength + 4; i++) {
      let ratio = 0;
      let currentPageInt = Math.floor(currentPageFloat);
      if (i === 2) {
        ratio = Math.abs(currentPageFloat - (this.arrLength + 1)) < 0.1 ? 1 : 0;
      }
      if (i === this.arrLength + 1) {
        ratio = Math.abs(currentPageFloat) < 0.1 ? 1 : 0;
      }
      if (i - 1 === currentPageInt) {
        ratio = 1 - currentPageFloat % 1;
      } else if (i - 1 === currentPageInt + 1) {
        ratio = currentPageFloat % 1;
      }
      let scaleY = this.ratio + (1 - this.ratio) * ratio;
      let translateY = this.height * (1 - scaleY) / 8;
      Animated.timing(this.state.scaleYArr[i], {
        toValue: scaleY,
        duration: 0,
      }).start();
      Animated.timing(this.state.translateYArr[i], {
        toValue: translateY,
        duration: 0,
      }).start();
    }
  }

  _getArrayFromProps() {
    let {data} = this.props;
    let array;
    let arrayLength;
    array = [...data];
    arrayLength = array.length;
    array.unshift(array[arrayLength - 1]);
    array.unshift(array[arrayLength - 2]);
    array.push(array[2]);
    array.push(array[3]);
    return {array, arrayLength};
  }

  render() {
    return (
      <View style={{minHeight: this.height, width: this.width}}>
        <ScrollView
          horizontal={true}
          pointerEvents="none"
          ref={(node) => (this.mainScroll = node)}
          showsHorizontalScrollIndicator={false}
        >
          {this._getItems()}
        </ScrollView>
        <View
          style={{
            width: (this.width - this.moveDistance) / 2,
            height: this.height,
            position: 'absolute',
            left: 0,
            top: 0,
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        />
        <View
          style={{
            width: (this.width - this.moveDistance) / 2,
            height: this.height,
            position: 'absolute',
            right: 0,
            top: 0,
            backgroundColor: 'rgba(0,0,0,0)',
          }}
        />
        <ScrollView
          style={{
            width: this.moveDistance,
            height: this.height,
            position: 'absolute',
            left: (this.width - this.moveDistance) / 2,
            top: 0,
          }}
          horizontal={true}
          pagingEnabled={true}
          ref={(node) => (this.assistScroll = node)}
          onScroll={(e: Object) => this._onAssistScroll(e)}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {this._getView()}
        </ScrollView>
      </View>
    );
  }
}

let PlatformInfo = {
  sizeObj: Dimensions.get('window'),
  pixels: 2,
  getSize: () => Dimensions.get('window'),
  width: (): number => {
    return PlatformInfo.sizeObj.width;
  },
  height: (): number => {
    return (
      PlatformInfo.sizeObj.height -
      (Platform.OS === 'android' ? StatusBar.currentHeight : 0)
    );
  },
  pixel: (px: number): number => {
    if (!PlatformInfo.pixels) {
      PlatformInfo.pixels = PixelRatio.get();
    }
    return px / PlatformInfo.pixels;
  },
};

export {PlatformInfo};
