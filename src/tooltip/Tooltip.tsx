import React, { useMemo } from 'react';
import classNames from 'classnames';
import { isFunction } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { TooltipProps } from './interface';
import Popover from '../popover/Popover';

import Link from '../link';

const splitObject = (obj: any, keys: string[]) => {
  const picked: any = {};
  const omitted: any = { ...obj };
  keys.forEach((key) => {
    if (obj && key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  });
  return { picked, omitted };
};

const Tooltip = (props: TooltipProps) => {
  const {
    children,
    title,
    overlay,
    tooltipLink,
    allowArrow = true,
    prefixCls: customizePrefixCls,
    subPrefixCls = 'tooltip',
    overlayClassName,
    overlayInnerClassName,
    ...rest
  } = props;
  const prefixCls = usePrefixCls(subPrefixCls, customizePrefixCls);

  const contentInnerCls = useMemo(
    () => classNames(`${prefixCls}__inner`, overlayInnerClassName),
    [prefixCls, overlayInnerClassName]
  );

  const [computedTitle, computedOverlay] = useMemo(
    () => [isFunction(title) ? title() : title, isFunction(overlay) ? overlay() : overlay],
    [title, overlay]
  );

  const tooltipOverlay = useMemo(() => {
    const isNoTitle = !computedTitle && computedTitle !== 0;
    return isNoTitle ? null : (
      <>
        <span className={`${prefixCls}__inner-title`}>{computedTitle}</span>
        {tooltipLink?.link && (
          <Link href={tooltipLink.link} className={`${prefixCls}__link`}>
            {tooltipLink.name || tooltipLink.link}
          </Link>
        )}
      </>
    );
  }, [prefixCls, computedTitle, tooltipLink]);

  // Fix Tooltip won't hide at disabled button
  // mouse events don't trigger at disabled button in Chrome
  // https://github.com/react-component/tooltip/issues/18
  function getDisabledCompatibleChildren(element: React.ReactElement<any>, prefixFunCls: string) {
    if ((element?.type as any)?.displayName === 'Button' && element?.props?.disabled) {
      const { picked, omitted } = splitObject(element?.props?.style, [
        'position',
        'left',
        'right',
        'top',
        'bottom',
        'float',
        'display',
        'zIndex',
      ]);
      const spanStyle = {
        display: 'inline-block', // default inline-block is important
        ...picked,
        cursor: 'not-allowed',
        width: element.props.block ? '100%' : null,
      };
      const buttonStyle = {
        ...omitted,
        pointerEvents: 'none',
      };
      const child = React.cloneElement(element, {
        style: buttonStyle,
        className: null,
      });
      return (
        <span
          style={spanStyle}
          className={classNames(element.props.className, `${prefixFunCls}-disabled-compatible-wrapper`)}
        >
          {child}
        </span>
      );
    }
    return element;
  }

  return (
    <Popover
      {...rest}
      hideDelay={0}
      allowArrow={allowArrow}
      prefixCls={customizePrefixCls}
      overlayClassName={classNames(prefixCls, overlayClassName)}
      overlayInnerClassName={contentInnerCls}
      content={computedOverlay || tooltipOverlay}
    >
      {getDisabledCompatibleChildren(React.isValidElement(children) ? children : <span>{children}</span>, prefixCls)}
    </Popover>
  );
};

export default Tooltip;
