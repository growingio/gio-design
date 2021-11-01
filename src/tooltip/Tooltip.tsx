import React, { useMemo } from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import { TooltipProps } from './interface';
import Popover from '../popover/Popover';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

import Link from '../link';

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    title,
    overlay,
    tooltipLink,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'tooltip-new',
    ...reset
  } = props;
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const contentInnerCls = useMemo(() => classNames(`${prefixCls}__inner`), [prefixCls]);

  const [computedTitle, computedOverlay] = useMemo(
    () => [isFunction(title) ? title() : title, isFunction(overlay) ? overlay() : overlay],
    [title, overlay]
  );
  const isNoTitle = useMemo(() => !computedTitle && computedTitle !== 0, [computedTitle]);

  const tooltipOverlay = useMemo(
    () =>
      isNoTitle ? null : (
        <>
          <span className={`${prefixCls}__inner-title`}>{computedTitle}</span>
          {tooltipLink?.link && <Link href={tooltipLink.link}>{tooltipLink.name || tooltipLink.link}</Link>}
        </>
      ),
    [prefixCls, isNoTitle, computedTitle, tooltipLink]
  );

  return (
    <Popover
      {...reset}
      prefixCls={customizePrefixCls}
      overlayClassName={prefixCls}
      overlayInnerClassName={contentInnerCls}
      content={computedOverlay || tooltipOverlay}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
