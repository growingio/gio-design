import * as React from 'react';
import { Avatar as AntdAvatar } from 'antd';
import classNames from 'classnames';

interface IAvatarProps {
  icon?: string;
  shape?: 'circle' | 'square';
  size?: 'large' | 'small' | 'default';
  src?: string;
  children?: React.ReactNode;
  className?: string;
  [p: string]: any;
}
// console.info(styles)
const Avatar = (props: IAvatarProps) =>
  React.cloneElement(<AntdAvatar />, {
    ...props,
    className: classNames(props.className, 'gio-avatar'),
  });

export default Avatar;
