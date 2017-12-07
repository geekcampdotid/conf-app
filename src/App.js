// @flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Provider} from 'react-redux';
import {BackHandler} from 'react-native';
import {AppLoading} from 'expo';
import {View} from './components/core';
import {PinchToZoomImageModal} from './components';

import {SnackBar} from './components';
import MainRoute from './routes/MainRoute';
import populateInitialData from './helpers/populateInitialData';
import handleBackPressAndroid from './helpers/handleBackPressAndroid';
import createDataStore from './createDataStore';

type State = {
  isLoaded: boolean,
};

const store = createDataStore();

export default class App extends Component<void, State> {
  constructor() {
    super(...arguments);
    autobind(this);

    this.state = {
      isLoaded: false,
    };
  }

  componentWillMount() {
    this._init();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress);
  }

  render() {
    let {isLoaded} = this.state;
    return !isLoaded ? (
      <AppLoading />
    ) : (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MainRoute />
          <SnackBar />
          <PinchToZoomImageModal />
        </View>
      </Provider>
    );
  }

  async _init() {
    await populateInitialData(store.dispatch);
    this.setState({isLoaded: true});
  }

  _onBackPress() {
    let {navigation} = store.getState();
    return handleBackPressAndroid(navigation, store.dispatch);
  }
}
