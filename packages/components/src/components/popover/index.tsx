import React, { useContext } from 'react';
import Tooltip from '../tooltip';
import { PopoverProps } from './interface';
import { ConfigContext } from '../config-provider';

const Popover: React.FC<PopoverProps> = (props: PopoverProps) => {
  const { children, contentArea, footerArea, prefixCls: customizePrefixCls, ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('popover', customizePrefixCls);

  const customOverlay = () => {
    if (!contentArea && !footerArea) {
      return null;
    }
    return (
      <>
        {contentArea && <div className={`${prefixCls}-inner-content`}>{contentArea}</div>}
        {footerArea && <div className={`${prefixCls}-inner-footer`}>{footerArea}</div>}
      </>
    );
  };
  return (
    <Tooltip prefixCls={prefixCls} overlay={customOverlay()} {...rest}>
      {children}
    </Tooltip>
  );
};

export default Popover;
