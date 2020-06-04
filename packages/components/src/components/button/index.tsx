import React from 'react';
import { ButtonProps } from 'antd/lib/button';
import { Button as AntButton } from 'antd';
import Icon from './icon';
import classnames from 'classnames';

import 'antd/lib/button/style/index.css';
import './custom-style.less';

export interface Props extends ButtonProps {
  type?: 'primary';
  size?: 'large';
}

class Button extends React.PureComponent<Props> {
  public static Icon: any;
  public render() {
    const { type, className, ...rest } = this.props;
    return (
      <AntButton
        {...rest}
        className={classnames('gio-button', className, {
          [`gio-button-${type}`]: type,
        })}
      />
    );
  }
}

Button.Icon = Icon;

export default Button;
