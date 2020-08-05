import * as React from 'react';
import Input from './Input';
import InputNumber from './InputNumber';
import InputHidden from './InputHidden';
import Password from './Password';
import TextArea from './TextArea';
import { InputProps, InputNumberProps, TextAreaProps } from './types';

export { InputNumber };

export { InputHidden };

export { Password };

export { TextArea };

export default class extends React.Component<InputProps> {
  static InputNumber: React.FC<InputNumberProps> = InputNumber;

  static InputHidden: React.FC<InputProps> = InputHidden;

  static Password: React.FC<InputProps> = Password;

  static TextArea: React.FC<TextAreaProps> = TextArea;

  public constructor(props: InputProps) {
    super(props);
  }

  public render() {
    return <Input {...this.props} />;
  }
}
