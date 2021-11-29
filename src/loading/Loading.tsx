import React, { useMemo, forwardRef, useRef } from 'react';
import classNames from 'classnames';
import useDebounceLoading from '../utils/hooks/useDebounceLoading';
import composeRef from '../utils/composeRef';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { LoadingProps } from './interface';
import Wheel from './Wheel';

const Loading = forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      prefixCls: customizePrefixCls,
      loading = true,
      delay = 0,
      indicator,
      titlePosition = 'bottom',
      title,
      size = 'large',
      className,
      style,
      children,
      blurColor = 'white',
    },
    ref
  ) => {
    const prefixCls = usePrefixCls('loading', customizePrefixCls);
    const shouldLoading = useDebounceLoading(loading, delay);
    const loadingRef = useRef<HTMLDivElement>(null);

    const loadingElementAndTitle: JSX.Element = useMemo(
      () =>
        shouldLoading ? (
          <div
            className={classNames(`${prefixCls}`, `${prefixCls}-${size}`, className)}
            style={{ ...style }}
            ref={composeRef(loadingRef, ref)}
          >
            <Wheel prefixCls={customizePrefixCls} indicator={indicator} />
            {title && (
              <span className={classNames(`${prefixCls}-title`, `${prefixCls}-title-${titlePosition}`)}>{title}</span>
            )}
          </div>
        ) : (
          <>{null}</>
        ),
      [className, customizePrefixCls, indicator, prefixCls, ref, shouldLoading, size, style, title, titlePosition]
    );

    const result: JSX.Element = useMemo(() => {
      if (children) {
        return (
          <div className={classNames(`${prefixCls}-wrapper-loading`, className)}>
            {loadingElementAndTitle}
            <div
              className={classNames(`${prefixCls}-container`, `${prefixCls}-container-blur-${blurColor}`, {
                [`${prefixCls}-container-loading`]: shouldLoading,
              })}
            >
              {children}
            </div>
          </div>
        );
      }
      return loadingElementAndTitle;
    }, [blurColor, children, loadingElementAndTitle, prefixCls, shouldLoading, className]);

    return result;
  }
);

export default Loading;
