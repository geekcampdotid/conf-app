// @flow
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppLoading, Font} from 'expo';
import {View} from './components/core';
import {PinchToZoomImageModal} from './components';

import {SnackBar} from './components';
import Router from './routes/Router';
import populateInitialData from './helpers/populateInitialData';
import createDataStore from './createDataStore';

type State = {
  isReady: boolean,
};

const store = createDataStore();

export default class App extends Component<void, State> {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this._init();
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
    await Font.loadAsync({
      'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
      FontAwesome: require('@expo/vector-icons/fonts/FontAwesome.ttf'),
    });
    this.setState({isReady: true});
  }
}
