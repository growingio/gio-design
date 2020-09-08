import * as React from 'react';
import Input from './Input';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';
import { InputProps, TextAreaProps } from './interfaces';

export { InputNumber, Password, TextArea };

export default class extends React.Component<InputProps> {
  public static InputNumber: React.FC<InputProps> = InputNumber;

  public static Password: React.FC<InputProps> = Password;

  public static TextArea: React.FC<TextAreaProps> = TextArea;

  public constructor(props: InputProps) {
    super(props);
  }

  public render() {
    return <Input {...this.props} />;
  }
}
