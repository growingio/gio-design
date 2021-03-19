import React, { useMemo, forwardRef, useRef, useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { isUndefined } from 'lodash';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import composeRef from '../../utils/composeRef';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LoadingProps } from './interface';

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    loading = true,
    delay = 0,
    indicator,
    titlePosition  = 'bottom',
    title = '加载中...',
    size = 'large',
    className,
    style,
    children,
    blurColor = 'white',
    autoCenter = false
  } = props;
  const prefixCls = usePrefixCls('loading', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);
  const loadingRef = useRef<HTMLDivElement>(null);
  const [centerStyle, setCenterStyle] = useState({});
  const constantFunction = useRef(() => {
    const parentRect = loadingRef.current?.parentElement?.getBoundingClientRect() || { width: 0, height: 0 };
    const loadingRect = loadingRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
    setCenterStyle({ marginLeft: (parentRect.width - loadingRect.width) / 2, marginTop: (parentRect.height - loadingRect.height) / 2 });
  }).current;

  useLayoutEffect(() => {
    if(isUndefined(children) && autoCenter) {
      constantFunction();
      window.addEventListener('resize', constantFunction);
    }
    return () => window.removeEventListener('resize', constantFunction);
  }, [autoCenter, children, constantFunction, shouldLoading]);

  const loadingElement: JSX.Element = useMemo(() => {
    if (indicator) {
      return <span className={`${prefixCls}-indicator`}>{indicator}</span>;
    }
    return (
      <span className={`${prefixCls}-strip`}>
        <span className={`${prefixCls}-strip-item`} />
        <span className={`${prefixCls}-strip-item`} />
        <span className={`${prefixCls}-strip-item`} />
        <span className={`${prefixCls}-strip-item`} />
      </span>
    );
  }, [prefixCls, indicator]);

  const loadingElementAndTitle: JSX.Element = useMemo(() => {
    return shouldLoading ? (
      <div className={classNames(`${prefixCls}`, `${prefixCls}-${size}`, className)} style={{...style, ...centerStyle}} ref={composeRef(loadingRef, ref)}>
        {loadingElement}
        {title && (
          <span className={classNames(`${prefixCls}-title`, `${prefixCls}-title-${titlePosition}`)}>{title}</span>
        )}
      </div>
    ) : <>{null}</>;
  }, [centerStyle, className, loadingElement, prefixCls, ref, shouldLoading, size, style, title, titlePosition]);

  const result: JSX.Element = useMemo(() => {
    if (children) {
      return (
        <div className={`${prefixCls}-wrapper-loading`}>
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
  }, [blurColor, children, loadingElementAndTitle, prefixCls, shouldLoading]);

  return result;
});

export default Loading;
