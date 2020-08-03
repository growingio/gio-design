import React, { useContext, Children } from 'react';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
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
  size = 'middle',
  children,
}) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefix = getPrefixCls('sign', customPrefixCls);

  const cls = classnames(className, prefix, {
    [`${prefix}--no-children`]: Children.count(children) === 0,
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
