import React from 'react';
import classNames from 'classnames';
import { IconProps } from './interface';
import './Wrapper.less';

interface WrapperProps extends IconProps {
  icon: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { icon, className, ...restProps } = props;
  const classString = classNames('gio-icon', className);
  return (
    <span className={classString} {...restProps}>
      {icon}
    </span>
  );
};

export default Wrapper;
