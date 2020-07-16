import React, { useContext } from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from './interface';
import { ConfigContext } from '../config-provider';
import Link from '../link';

const Tooltip = (props: TooltipProps) => {
  const { title, tooltipLink, children, placement = 'top', trigger = 'hover', overlay, ...rest } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tooltip');

  const defaultOverlay = () => (
    <>
      <span style={{ verticalAlign: 'middle' }}>{title}</span>
      {tooltipLink && (
        <Link component='a' to={tooltipLink.link}>
          {tooltipLink.name}
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
