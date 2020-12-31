import React, { useMemo, useEffect } from 'react';
import RcTooltip from 'rc-tooltip';
import { isFunction } from 'lodash';
import { TooltipProps } from './interface';
import Link from '../link';
import getPlacements from './placements';
import useControlledState from '../../utils/hooks/useControlledState';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Tooltip = (props: TooltipProps): JSX.Element => {
  const {
    title,
    tooltipLink,
    placement = 'top',
    trigger = 'hover',
    visible,
    disabled = false,
    onVisibleChange,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'tooltip',
    overlay,
    children,
    arrowPointAtCenter = false,
    destroyTooltipOnHide,
    autoAdjustOverflow = true,
    ...rest
  } = props;

  const [controlledVisible, setControlledVisible] = useControlledState<boolean>(visible, false);
  const [computedTitle, computedOverlay] = useMemo(
    () => [isFunction(title) ? title() : title, isFunction(overlay) ? overlay() : overlay],
    [title, overlay]
  );

  const isNoTitle = useMemo(() => !computedTitle && computedTitle !== 0, [computedTitle]);
  const isNoOverlay = useMemo(() => !computedOverlay && computedOverlay !== 0, [computedOverlay]);
  const isNoContent = useMemo(() => isNoTitle && isNoOverlay, [isNoTitle, isNoOverlay]);

  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  useEffect(() => {
    setControlledVisible(!isNoContent && controlledVisible, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNoContent, controlledVisible]);

  const tooltipOverlay = isNoTitle ? null : (
    <>
      <span className={`${prefixCls}-inner-title`}>{computedTitle}</span>
      {tooltipLink?.link && (
        <Link component="a" to={tooltipLink.link}>
          {tooltipLink.name || tooltipLink.link}
        </Link>
      )}
    </>
  );

  const setCursor = (child: React.ReactElement) => {
    if (trigger === 'click' || (Array.isArray(trigger) && trigger.includes('click'))) {
      return React.cloneElement(child, { style: { ...child.props.style, cursor: 'pointer' } });
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
      builtinPlacements={getPlacements({ arrowPointAtCenter, autoAdjustOverflow })}
      visible={controlledVisible && !disabled && !isNoContent}
      onVisibleChange={(_visible) => {
        if (disabled) {
          return;
        }
        setControlledVisible(_visible);
        if (!isNoContent) {
          onVisibleChange?.(_visible);
        }
      }}
      destroyTooltipOnHide={isNoContent || destroyTooltipOnHide}
      {...rest}
    >
      {setCursor(children)}
    </RcTooltip>
  );
};

export default Tooltip;
