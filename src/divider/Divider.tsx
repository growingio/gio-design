import classNames from 'classnames';
import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import WithRef from '../utils/withRef';
import DividerProps from './interface';

const Divider = WithRef<HTMLHRElement, DividerProps>(
  ({ orientation = 'horizontal', flexItem = false, className, ...otherProps }, ref) => {
    const prefixCls = usePrefixCls('divider-new');
    const classes = classNames([prefixCls, className], {
      [`${prefixCls}_${orientation}`]: ['horizontal', 'vertical'].includes(orientation),
      [`${prefixCls}_flex_item`]: flexItem,
    });

    return <hr ref={ref} className={classes} data-testid="divider" {...otherProps} />;
  }
);

Divider.displayName = 'Divider';

Divider.defaultProps = {
  orientation: 'horizontal',
  flexItem: false,
};

export default Divider;
