import React, { useContext } from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from './interface';
import { ConfigContext } from '../config-provider';
import Link from '../link';

const Tooltip = (props: TooltipProps) => {
  const {
    title,
    tooltipLink,
    placement = 'top',
    trigger = 'hover',
    prefixCls: customizePrefixCls,
    overlay,
    children,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  const defaultOverlay = () => (
    <>
      <span className={`${prefixCls}-inner-title`}>{title}</span>
      {tooltipLink?.link && (
        <Link component='a' to={tooltipLink.link}>
          {tooltipLink.name || tooltipLink.link}
        </Link>
      )}
    </>
  );

  const getOverlay = () => overlay || defaultOverlay();

  return (
    <RcTooltip
      prefixCls={prefixCls}
      placement={placement}
      trigger={trigger}
      transitionName='spread-transition'
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      overlay={getOverlay()}
      {...rest}
    >
      {children}
    </RcTooltip>
  );
};

export default Tooltip;
