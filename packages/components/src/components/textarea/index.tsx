import * as React from 'react';
import { Input as AntInput } from 'antd';

import 'antd/lib/input/style/index.css';
import './index.less';

const { TextArea } = AntInput;

export interface InputProps {
  rows: number;
  className?: string;
  [key: string]: any;
}

class Input extends React.Component<InputProps, {}> {
  public render() {
    return <TextArea {...this.props} className={`gio-textarea ${this.props.className}`} />;
  }
}

export default Input;
