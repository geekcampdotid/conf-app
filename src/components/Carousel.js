// @flow
import React, {Component, Children} from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Carousel from 'react-native-card-carousel';

import getScreenSize from 'helpers/getScreenSize';
import {DEFAULT_GRADIENT, LIGHT_GREY} from 'constants/colors';
import defaultPicture from 'assets/images/no-image.png';

import {VIEW_SHADOW} from 'constants/genericStyle';

const SCREEN_WIDTH = getScreenSize().width;
const CAROUSEL_IMAGE_WIDTH = SCREEN_WIDTH - 46;
const DEFAULT_CAROUSEL_ITEM_BORDER = 6;

type Props = {
  children?: ReactNode;
  height?: number;
};

export default function CarouselComponent(props: Props) {
  let {children, height} = props;
  let carouselContent = [];
  Children.forEach(children, (child) => {
    if (child.type === CarouselImage) {
      carouselContent.push(child);
    }
  });

  return (
    <Carousel
      sliderWidth={SCREEN_WIDTH}
      itemWidth={CAROUSEL_IMAGE_WIDTH}
      containerCustomStyle={{height}}
      contentContainerCustomStyle={{
        height,
        alignItems: 'center',
      }}
      inactiveSlideOpacity={0.4}
      animationFunc="spring"
    >
      {carouselContent}
    </Carousel>
  );
}

type ImageProps = {
  raised?: boolean;
  picture?: ImageSource;
  isOverlay?: boolean;
  gradientColors?: Array<string> | 'default';
  children?: ReactNode;
  onPress?: () => void;
};

type ImageState = {
  isMounted: boolean;
  mountedPicture: ?ImageSource;
};

export class CarouselImage extends Component {
  props: ImageProps;
  state: ImageState;

  constructor() {
    super(...arguments);
    this.state = {
      isMounted: true,
      mountedPicture: this.props.picture,
    };
  }

  componentWillMount() {
    let {picture} = this.props;
    if (
      picture &&
      defaultPicture &&
      typeof picture === 'object' &&
      !Array.isArray(picture)
    ) {
      Image.getSize(
        picture.uri,
        () => {
          let {isMounted} = this.state;
          if (isMounted) {
            this.setState({mountedPicture: picture});
          }
        },
        () => {
          let {isMounted} = this.state;
          if (isMounted) {
            this.setState({mountedPicture: defaultPicture});
          }
        },
      );
    }
  }

  componentWillUnmount() {
    this.setState({isMounted: false});
  }

  render() {
    let {
      children,
      gradientColors,
      isOverlay,
      onPress,
      raised,
      ...otherProps
    } = this.props;
    let {mountedPicture} = this.state;
    let Container = onPress ? TouchableOpacity : View;
    let imageDetail = isOverlay
      ? <LinearGradient
          colors={gradientColors ? gradientColors : DEFAULT_GRADIENT}
          style={styles.overlayContainer}
        >
          {children}
        </LinearGradient>
      : <View style={styles.imageDetailView}>
          {children}
        </View>;
    return (
      <Container
        style={[styles.imageContainer, raised ? VIEW_SHADOW : null]}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          source={mountedPicture}
          {...otherProps}
        />
        {Children.count(children) === 0 ? null : imageDetail}

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
    borderColor: LIGHT_GREY,
    borderWidth: 0.8,
    maxWidth: CAROUSEL_IMAGE_WIDTH,
  },
  image: {
    width: CAROUSEL_IMAGE_WIDTH,
    flex: 1,
    alignSelf: 'center',
    borderTopLeftRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
    borderTopRightRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  overlayContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    borderRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
  },
  imageDetailView: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomLeftRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
    borderBottomRightRadius: DEFAULT_CAROUSEL_ITEM_BORDER,
  },
});
