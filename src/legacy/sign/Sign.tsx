import React, { Children } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ISignProps } from './interface';
import SignNumber from './SignNumber';
import Dot from './Dot';

export { TPlacement, TSignVariant } from './interface';

const toPascal = (hump: string) => hump.replace(/([A-Z])/g, '-$1').toLowerCase();

const Sign: React.FC<ISignProps> = ({
  variant = 'number',
  className,
  prefixCls: customPrefixCls,
  style,
  placement = 'rightTop',
  visible = true,
  count = 0,
  showZero = false,
  magnitude = 100,
  status = 'default',
  size = 'middle',
  children,
  offset,
}: ISignProps) => {
  const prefix = usePrefixCls('sign-legacy', customPrefixCls);
  const noChildren = Children.count(children) === 0;

  const cls = classnames(className, prefix, `${prefix}__${variant}-wrapper`, {
    [`${prefix}--no-children`]: noChildren,
  });

  const supCls = classnames(`${prefix}__${variant}`, {
    [`${prefix}--${toPascal(placement)}`]: !noChildren,
  });

  return (
    <span className={cls}>
      {variant === 'dot' && (
        <Dot prefixCls={prefix} className={supCls} status={status} size={size} style={style} visible={visible} />
      )}
      {variant === 'number' && (
        <SignNumber
          prefixCls={prefix}
          className={supCls}
          style={style}
          count={count}
          showZero={showZero}
          magnitude={magnitude}
          visible={visible}
          offset={offset}
          placement={placement}
        />
      )}
      {children}
    </span>
  );
};

export default Sign;
