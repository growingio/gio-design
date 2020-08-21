import * as React from 'react';
import Input from './Input';
import InputNumber from './InputNumber';
import InputHidden from './InputHidden';
import Password from './Password';
import TextArea from './TextArea';
import { InputProps, InputNumberProps, TextAreaProps } from './types';

export { InputNumber, InputHidden, Password, TextArea };
export { InputProps } from './types';

export default class extends React.Component<InputProps> {
  public static InputNumber: React.FC<InputNumberProps> = InputNumber;

  public static InputHidden: React.FC<InputProps> = InputHidden;

  public static Password: React.FC<InputProps> = Password;

  public static TextArea: React.FC<TextAreaProps> = TextArea;

  public constructor(props: InputProps) {
    super(props);
  }

  public render() {
    return <Input {...this.props} />;
  }
}
