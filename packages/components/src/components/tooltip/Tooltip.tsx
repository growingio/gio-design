import React, { useContext, useMemo, useEffect } from 'react';
import RcTooltip from 'rc-tooltip';
import { TooltipProps } from './interface';
import { ConfigContext } from '../config-provider';
import Link from '../link';
import getPlacements from './placements';
import useControlledState from '../../utils/hooks/useControlledState';
import { isFunction } from 'lodash';

const Tooltip = (props: TooltipProps) => {
  const {
    title,
    tooltipLink,
    placement = 'top',
    trigger = 'hover',
    visible,
    onVisibleChange,
    prefixCls: customizePrefixCls,
    overlay,
    children,
    arrowPointAtCenter,
    destroyTooltipOnHide,
    ...rest
  } = props;

  const [controlledVisible, setControlledVisible] = useControlledState<boolean>(visible, false);
  const [computedTitle, computedOverlay] = useMemo(
    () => [isFunction(title) ? title() : title, isFunction(overlay) ? overlay() : overlay],
    [title, overlay]
  );

  const isNoTitle = useMemo(() => !computedTitle && computedTitle !== 0, [computedTitle]);
  const visbleShouldBeControl = useMemo(() => isNoTitle && !computedOverlay, [isNoTitle, computedOverlay]);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  useEffect(() => {
    setControlledVisible(!visbleShouldBeControl && controlledVisible, true);
  }, [visbleShouldBeControl, controlledVisible]);

  const tooltipOverlay = isNoTitle ? null : (
    <>
      <span className={`${prefixCls}-inner-title`}>{title}</span>
      {tooltipLink?.link && (
        <Link component="a" to={tooltipLink.link}>
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

  const getOverlay = () => computedOverlay || tooltipOverlay;

  return (
    <RcTooltip
      prefixCls={prefixCls}
      placement={placement}
      trigger={trigger}
      transitionName="spread-transition"
      arrowContent={<span className={`${prefixCls}-arrow-content`} />}
      overlay={getOverlay()}
      builtinPlacements={getPlacements({ arrowPointAtCenter })}
      visible={controlledVisible}
      onVisibleChange={(_visible) => {
        setControlledVisible(visbleShouldBeControl ? false : _visible);
        if (!visbleShouldBeControl) {
          onVisibleChange?.(_visible);
        }
      }}
      destroyTooltipOnHide={visbleShouldBeControl || destroyTooltipOnHide}
      {...rest}
    >
      {setCursor(children)}
    </RcTooltip>
  );
};

export default Tooltip;
