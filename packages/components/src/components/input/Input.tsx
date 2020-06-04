import * as React from 'react';
import { Input as AntInput } from 'antd';
import { SearchProps, TextAreaProps, GroupProps } from 'antd/lib/input';
import { Props as RangeProps } from './Range';
import classnames from 'classnames';
import { InputNumberProps } from 'antd/lib/input-number';
import { omit } from 'lodash';
import 'antd/lib/input/style/index.css';
import 'antd/lib/input-number/style/index.css';
import './custom-style.less';
export interface InputProps {
  className?: string;
  disabled?: boolean;
  size?: 'large' | 'small';
  [key: string]: any;
  error?: boolean;
  inverse?: boolean;
}

class Input extends React.Component<InputProps> {
  public static Search: React.ClassType<SearchProps, any, any>;
  public static TextArea: React.ClassType<TextAreaProps, any, any>;
  public static InputNumber: React.ClassType<InputNumberProps, any, any>;
  public static Group: React.ClassType<GroupProps, any, any>;
  public static Range: React.ComponentType<RangeProps>;
  public render() {
    const className = classnames('gio-input', this.props.className || '', {
      [`gio-input-${this.props.size}`]: this.props.size,
      'gio-input--error': this.props.error,
      'gio-input-inverse': this.props.inverse,
    });
    return <AntInput {...omit(this.props, ['error', 'inverse'])} className={className} />;
  }
}

export const TextArea = AntInput.TextArea;
export const Group = AntInput.Group;
export default Input;
