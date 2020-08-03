import React from 'react';
import classnames from 'classnames';
import { ISignProps } from './interface';
import Number from './Number';
import Dot from './Dot';

const Sign: React.FC<ISignProps> = ({
  variant = 'number',
  className,
  prefixCls: customPrefixCls,
  style,
  visible = true,
  count = 0,
  showZero = false,
  magnitude = 100,
  status = 'default',
  size = 'medium',
  children,
}) => {
  const prefix = customPrefixCls ? customPrefixCls : 'gio-sign';

  const cls = classnames(className, prefix, {
    [`${prefix}--no-children`]: React.Children.count(children) === 0,
  });

  return (
    <span className={cls}>
      {children}
      {variant === 'dot' && <Dot prefixCls={prefix} status={status} size={size} style={style} visible={visible} />}
      {variant === 'number' && (
        <Number
          prefixCls={prefix}
          style={style}
          count={count}
          showZero={showZero}
          magnitude={magnitude}
          visible={visible}
        />
      )}
    </span>
  );
};

export default Sign;
