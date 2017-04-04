// @flow
import React, {Component} from 'react';
import autobind from 'class-autobind';
import {
  StyleSheet,
  DatePickerIOS,
  View,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import {Text} from '../core-components';

import {TEXT_COLOR} from 'constants/colors';

type DatepickerOptions = {
  defaultDate: Date;
  maximumDate?: Date;
  minimumDate?: Date;
};

type Props = {
  isOpened: boolean;
  dateOptions: DatepickerOptions;
  onDateSelected: (date: string) => void;
  onClose: () => void;
};

type State = {
  selectedDate: Date;
};

export default class DatePicker extends Component {
  props: Props;
  state: State;
  constructor() {
    super(...arguments);
    autobind(this);

    this.state = {
      selectedDate: this.props.dateOptions.defaultDate,
    };
  }
  componentWillReceiveProps(newProps: Props) {
    this.setState({
      selectedDate: newProps.dateOptions.defaultDate,
    });
  }
  render() {
    let {isOpened, dateOptions} = this.props;
    let {selectedDate} = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpened}
        onRequestClose={this._onCancelClicked}
      >
        <TouchableWithoutFeedback onPress={this._onCancelClicked}>
          <View style={styles.root}>
            <View style={styles.container}>
              <DatePickerIOS
                style={styles.datepicker}
                mode="date"
                date={selectedDate}
                minimumDate={dateOptions.minimumDate}
                maximumDate={dateOptions.maximumDate}
                onDateChange={this._onDateChanged}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this._onOkClicked}
                >
                  <Text styles={styles.buttonText}>OK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={this._onCancelClicked}
                >
                  <Text styles={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  _onDateChanged(date: Date) {
    this.setState({selectedDate: date});
  }
  _onCancelClicked() {
    this.props.onClose();
  }
  _onOkClicked() {
    let {selectedDate} = this.state;
    let {onDateSelected, onClose} = this.props;
    let date = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    );
    onDateSelected(date.toISOString());
    onClose();
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderRadius: 5,
    backgroundColor: 'white',
  },
  datepicker: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    width: 300,
    paddingVertical: 10,
    flexDirection: 'row-reverse',
    backgroundColor: 'white',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: TEXT_COLOR,
  },
});
