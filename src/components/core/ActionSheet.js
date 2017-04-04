// @flow
import {Children, Component} from 'react';
import autobind from 'class-autobind';
import {connectActionSheet} from '@expo/react-native-action-sheet';

type Props = {
  isOpened: boolean;
  title?: string;
  message?: string;
  children?: ReactNode;
  onClose?: (buttonIndex: number) => void;
  showActionSheetWithOptions: Function;
};

type OptionProps = {
  name: string;
  type?: 'NORMAL' | 'CANCEL' | 'DESTRUCTIVE';
  onSelect?: () => void;
};

export const NORMAL = 'NORMAL';
export const CANCEL = 'CANCEL';
export const DESTRUCTIVE = 'DESTRUCTIVE';

export class ActionSheet extends Component {
  props: Props
  constructor() {
    super(...arguments);
    autobind(this);
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
  _show() {
    let {title, message, children, onClose, showActionSheetWithOptions} = this.props;
    let index = 0;
    let options = [];
    let selectHandlers = [];
    let cancelButtonIndex;
    let destructiveButtonIndex;
    Children.forEach(children, (child) => {
      if (child && child.props && child.type === ActionSheetOption) {
        let {name, type, onSelect} = child.props;
        options.push(name);
        selectHandlers.push(onSelect);
        if (type === CANCEL) {
          cancelButtonIndex = index;
        } else if (type === DESTRUCTIVE) {
          destructiveButtonIndex = index;
        }
        index += 1;
      }
    });
    showActionSheetWithOptions(
      {
        title,
        message,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex: number) => {
        let onSelect = selectHandlers[buttonIndex];
        if (onSelect) {
          onSelect();
        }
        if (onClose) {
          onClose(buttonIndex);
        }

      },
    );
  }
}

export function ActionSheetOption(props: OptionProps) { // eslint-disable-line no-unused-vars
  return null;
}

export default connectActionSheet(ActionSheet);
