import React, { Children } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { ISignNumberProps } from './interface';
import SignNumber from './SignNumber';

export { TPlacement } from './interface';

const toPascal = (hump: string) => hump.replace(/([A-Z])/g, '-$1').toLowerCase();

const Sign: React.FC<ISignNumberProps> = ({
  className,
  prefixCls: customPrefixCls,
  style,
  placement = 'rightTop',
  visible = true,
  count = 0,
  showZero = false,
  magnitude = 100,
  children,
  offset,
}: ISignNumberProps) => {
  const prefix = usePrefixCls('sign-new', customPrefixCls);
  const noChildren = Children.count(children) === 0;

  const cls = classnames(className, prefix, `${prefix}__number-wrapper`, {
    [`${prefix}--no-children`]: noChildren,
  });

  const supCls = classnames(`${prefix}__number`, {
    [`${prefix}--${toPascal(placement)}`]: !noChildren,
  });

  return (
    <span className={cls}>
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
      {children}
    </span>
  );
};

export default Sign;
