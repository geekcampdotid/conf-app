// @flow
import React, {Component} from 'react';
import {Modal, StyleSheet} from 'react-native';
import {View, Text} from './core-components';

import {LoadingIndicator} from './components';

type Props = {
  style?: StyleSheetTypes,
  isShowing: boolean,
  downloadProgress: number,
  totalDownloadSize: number,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
    maxHeight: 150,
    marginHorizontal: 50,
    padding: 20,
    justifyContent: 'space-around',
  },
  buttonContainer: {
    minWidth: 100,
  },
  textContainer: {
    flexWrap: 'wrap',
  },
  text: {
    textAlign: 'center',
  },
  loadingIndicatorContainer: {
    maxHeight: 50,
  },
});

export default class DownloadIndicator extends Component<Props, void> {
  constructor() {
    super(...arguments);
  }
  render() {
    let {style, isShowing, downloadProgress, totalDownloadSize} = this.props;
    let currentDownloaded = downloadProgress || 0;
    let totalDownload = totalDownloadSize || 100;
    return (
      <Modal
        visible={isShowing}
        transparent={true}
        onRequestClose={() => {}}
        animationType="fade"
      >
        <View style={[styles.root, style]}>
          <View style={styles.container}>
            <LoadingIndicator visible={true} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>
                Downloading updates...{' '}
                {Math.round(currentDownloaded / totalDownload * 100)} %
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
