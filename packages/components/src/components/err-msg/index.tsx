import * as React from 'react';
import './index.less';
import Icon from '../icon';

export interface InputProps {
  msg: string;
  iconName?: string;
  iconFill?: string;
  iconSize?: 'large' | 'middle' | 'small' | number;
  style?: React.CSSProperties;
}

export default class ErrMsg extends React.PureComponent<InputProps, {}> {
  public render() {
    const style: React.CSSProperties = { marginRight: '2px', ...this.props.style };
    return (
      <div className='gio-err-msg'>
        {this.props.iconName && (
          <Icon name={this.props.iconName} fill={this.props.iconFill} size={this.props.iconSize} style={style} />
        )}
        {this.props.msg}
      </div>
    );
  }
}
