// @flow
import {Component} from 'react';
import {DatePickerAndroid, ToastAndroid} from 'react-native';
import autobind from 'class-autobind';

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

export default class DatePicker extends Component {
  props: Props
  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      isOpened: false,
    };
  }

  componentWillReceiveProps(newProps: Props) {
    let oldProps = this.props;
    if (newProps.isOpened === true && oldProps.isOpened === false) {
      this._show();
    }
  }

  render() {
    return null;
  }

  async _show() {
    try {
      let {dateOptions, onClose} = this.props;
      let {minimumDate, maximumDate} = dateOptions;

      let options = {
        date: dateOptions.defaultDate,
      };
      if (minimumDate) {
        options = {
          ...options,
          minDate: minimumDate,
        };
      }
      if (maximumDate) {
        options = {
          ...options,
          maxDate: maximumDate,
        };
      }

      const {action, year, month, day} = await DatePickerAndroid.open(options);
      if (action !== DatePickerAndroid.dismissedAction) {
        let selectedDate = new Date(Date.UTC(year, month, day));
        let {onDateSelected} = this.props;
        onDateSelected(selectedDate.toISOString());
        onClose();
      } else {
        onClose();
      }
    } catch ({code, message}) {
      ToastAndroid.show(`Error : `, message);
    }
  }
}
