// @flow

import React, {Children, Component} from 'react';
import autobind from 'class-autobind';
import {Icon} from 'react-native-elements';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';

import getScreenSize from 'helpers/getScreenSize';

import {THEME_COLOR, LIGHT_GREY} from 'constants/colors';

const {width: screenWidth} = getScreenSize();
const DEFAULT_BUTTON_SIZE = 30;

type Props = {
  width?: number;
  showDots?: boolean;
  showNavigationButtons?: boolean;
  children?: ReactNode;
};

type State = {
  index: number;
  total: number;
  offset?: Offset;
};

type SwiperComponent = {
  scrollTo: ({x: number; y: number; animated: boolean}) => void;
};

type Offset = {
  x: number;
  y: number;
};

export default class Swiper extends Component {
  props: Props;
  state: State;
  _slideWidth: number;
  _height: number;
  _isScrolling: boolean;
  _swiper: SwiperComponent;

  constructor() {
    super(...arguments);
    autobind(this);

    this.state = {
      total: Children.count(this.props.children),
      index: 0,
    };

    this._slideWidth = this.props.width || screenWidth;
    this._isScrolling = false;
  }

  render() {
    let {children} = this.props;
    let pages = Children.map(children, (child) => {
      return (
        <View style={{width: this._slideWidth}}>
          {child}
        </View>
      );
    });
    return (
      <View>
        <ScrollView
          ref={(swiper) => (this._swiper = swiper)}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={this._onScrollBegin}
          onMomentumScrollEnd={this._onScrollEnd}
          onContentSizeChange={(width, height) => {
            this._height = height;
          }}
        >
          {pages}
        </ScrollView>
        {this._renderPagination()}
        {this._renderButtons()}
      </View>
    );
  }

  _onScrollBegin = () => {
    this._isScrolling = true;
  };

  _onScrollEnd = (e) => {
    this._isScrolling = false;
    // making our events coming from android compatible to updateIndex logic
    let contentOffset = e.nativeEvent.contentOffset || {
      x: e.nativeEvent.position * this._slideWidth,
      y: e.nativeEvent.position * this._height,
    };
    this._updateIndex(contentOffset);
  };

  _updateIndex(newOffset: Offset) {
    let dir = 'x';
    let oldIndex = this.state.index;
    let {offset} = this.state;
    let diff = newOffset[dir] - ((offset && offset[dir]) || 0);
    let step = this._slideWidth;

    if (!diff) {
      return;
    }

    let newIndex = oldIndex + Math.round(diff / step);
    this.setState({index: newIndex, offset: newOffset});
  }

  _scrollBy(offsetIndex: number, animated: boolean = true) {
    if (this._isScrolling || this.state.total < 2) {
      return;
    }
    let {index} = this.state;
    let diff = offsetIndex + index;
    let x = diff * this._slideWidth;
    let y = 0;

    this._isScrolling = true;
    this._swiper && this._swiper.scrollTo({x, y, animated});

    // trigger onScrollEnd manually in android
    if (!animated || Platform.OS === 'android') {
      setImmediate(() => {
        this._onScrollEnd({
          nativeEvent: {
            position: diff,
          },
        });
      });
    }
  }

  _renderButtons = () => {
    let {showNavigationButtons} = this.props;
    if (showNavigationButtons === false) {
      return;
    }
    return (
      <View
        pointerEvents="box-none"
        style={[
          styles.buttonWrapper,
          {
            width: this._slideWidth,
          },
        ]}
      >
        {this._renderPrevButton()}
        {this._renderNextButton()}
      </View>
    );
  };
  _renderPrevButton() {
    let button;

    if (this.state.index !== 0) {
      button = (
        <Icon
          name="navigate-before"
          color={THEME_COLOR}
          size={DEFAULT_BUTTON_SIZE}
        />
      );
    }

    return (
      <TouchableOpacity onPress={() => this._scrollBy(-1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    );
  }
  _renderNextButton() {
    let button;

    if (this.state.index !== this.state.total - 1) {
      button = (
        <Icon
          name="navigate-next"
          color={THEME_COLOR}
          size={DEFAULT_BUTTON_SIZE}
        />
      );
    }

    return (
      <TouchableOpacity onPress={() => this._scrollBy(1)}>
        <View>
          {button}
        </View>
      </TouchableOpacity>
    );
  }
  _renderPagination() {
    let {showDots} = this.props;
    if (showDots === false || this.state.total <= 1) {
      return null;
    }

    let dots = [];

    for (let i = 0; i < this.state.total; i++) {
      dots.push(<Dot key={i} isActive={i === this.state.index} />);
    }

    return (
      <View pointerEvents="none" style={styles.paginationContainer}>
        {dots}
      </View>
    );
  }
}

function Dot(props: {isActive: boolean}) {
  let {isActive, ...otherProps} = props;
  return (
    <View {...otherProps} style={isActive ? styles.activeDot : styles.dot} />
  );
}

const dot = {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginLeft: 3,
  marginRight: 3,
  marginTop: 3,
  marginBottom: 3,
};

const styles = StyleSheet.create({
  dot: {
    ...dot,
    backgroundColor: LIGHT_GREY,
  },
  activeDot: {
    ...dot,
    backgroundColor: THEME_COLOR,
  },
  paginationContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: '30%',
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
