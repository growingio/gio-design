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
    allowArrow = true,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'tooltip-new',
    ...rest
  } = props;
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const contentInnerCls = useMemo(() => classNames(`${prefixCls}__inner`), [prefixCls]);

  const [computedTitle, computedOverlay] = useMemo(
    () => [isFunction(title) ? title() : title, isFunction(overlay) ? overlay() : overlay],
    [title, overlay]
  );

  const tooltipOverlay = useMemo(() => {
    const isNoTitle = !computedTitle && computedTitle !== 0;
    return isNoTitle ? null : (
      <>
        <span className={`${prefixCls}__inner-title`}>{computedTitle}</span>
        {tooltipLink?.link && <Link href={tooltipLink.link}>{tooltipLink.name || tooltipLink.link}</Link>}
      </>
    );
  }, [prefixCls, computedTitle, tooltipLink]);

  return (
    <Popover
      {...rest}
      allowArrow={allowArrow}
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
