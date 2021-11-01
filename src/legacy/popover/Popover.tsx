import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import Tooltip from '../tooltip';
import getPlacements from '../tooltip/placements';
import { PopoverProps } from './interface';

export { PopoverProps } from './interface';

const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  const {
    children,
    contentArea,
    footerArea,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'popover',
    arrowPointAtCenter,
    autoAdjustOverflow,
    ...rest
  } = props;
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const popoverOverlay = () => (
    <>
      {contentArea && <div className={`${prefixCls}-inner-content`}>{contentArea}</div>}
      {footerArea && <div className={`${prefixCls}-inner-footer`}>{footerArea}</div>}
    </>
  );
  return (
    <Tooltip
      prefixCls={customizePrefixCls}
      subPrefixCls={subPrefixCls}
      overlay={popoverOverlay()}
      builtinPlacements={getPlacements({ arrowPointAtCenter, autoAdjustOverflow, arrowWidth: 12 })}
      arrowPointAtCenter={arrowPointAtCenter}
      autoAdjustOverflow={autoAdjustOverflow}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default Popover;
