import React, { useContext } from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from './interface';
import { ConfigContext } from '../config-provider';
import Link from '../link';
import getPlacements from './placements';

const Tooltip = (props: TooltipProps) => {
  const {
    title,
    tooltipLink,
    placement = 'top',
    trigger = 'hover',
    prefixCls: customizePrefixCls,
    overlay,
    children,
    arrowPointAtCenter,
    ...rest
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  const tooltipOverlay = () => (
    <>
      <span className={`${prefixCls}-inner-title`}>{title}</span>
      {tooltipLink?.link && (
        <Link component='a' to={tooltipLink.link}>
          {tooltipLink.name || tooltipLink.link}
        </Link>
      )}
    </>
  );

  const setCursor = (child: React.ReactElement) => {
    if (trigger === 'click' || (Array.isArray(trigger) && trigger.includes('click'))) {
      return React.cloneElement(child, { style: { cursor: 'pointer' } });
    }
    return child;
  };

  const getOverlay = () => overlay || tooltipOverlay();

  return (
    <RcTooltip
      prefixCls={prefixCls}
      placement={placement}
      trigger={trigger}
      transitionName='spread-transition'
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      overlay={getOverlay()}
      builtinPlacements={getPlacements({ arrowPointAtCenter })}
      {...rest}
    >
      {setCursor(children)}
    </RcTooltip>
  );
};

export default Tooltip;
