// @flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {Provider} from 'react-redux';
import {BackHandler} from 'react-native';
import {AppLoading} from 'expo';
import {View} from './components/core';
import {PinchToZoomImageModal} from './components';

import {SnackBar} from './components';
import Router from './routes/Router';
import populateInitialData from './helpers/populateInitialData';
import handleBackPressAndroid from './helpers/handleBackPressAndroid';
import createDataStore from './createDataStore';

type State = {
  isReady: boolean,
};

const store = createDataStore();

export default class App extends Component<void, State> {
  constructor() {
    super(...arguments);
    autobind(this);

    this.state = {
      isReady: false,
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
    let {isReady} = this.state;
    return !isReady ? (
      <AppLoading />
    ) : (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <Router />
          <SnackBar />
          <PinchToZoomImageModal />
        </View>
      </Provider>
    );
  }

  async _init() {
    await populateInitialData(store.dispatch);
    this.setState({isReady: true});
  }

  _onBackPress() {
    let {navigation} = store.getState();
    return handleBackPressAndroid(navigation, store.dispatch);
  }
}
