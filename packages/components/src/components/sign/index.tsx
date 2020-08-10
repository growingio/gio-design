import React, { useContext, Children } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
import { ISignProps } from './interface';
import Number from './Number';
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
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('sign', customPrefixCls);
  const noChildren = Children.count(children) === 0;

  const cls = classnames(className, prefix, {
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
        <Number
          prefixCls={prefix}
          className={supCls}
          style={style}
          count={count}
          showZero={showZero}
          magnitude={magnitude}
          visible={visible}
        />
      )}
      {children}
    </span>
  );
};

export default Sign;
