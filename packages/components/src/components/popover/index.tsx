import React from 'react';
import Tooltip from '../tooltip';
import { PopoverProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  const { children, contentArea, footerArea, prefixCls: customizePrefixCls, subPrefixCls = 'popover', ...rest } = props;
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const popoverOverlay = () => (
    <>
      {contentArea && <div className={`${prefixCls}-inner-content`}>{contentArea}</div>}
      {footerArea && <div className={`${prefixCls}-inner-footer`}>{footerArea}</div>}
    </>
  );
  return (
    <Tooltip prefixCls={customizePrefixCls} subPrefixCls={subPrefixCls} overlay={popoverOverlay()} {...rest}>
      {children}
    </Tooltip>
  );
};

export default Popover;
