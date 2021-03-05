import React, { useMemo } from 'react';
import classNames from 'classnames';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LoadingProps } from './interface';

const Loading = (props: LoadingProps) => {
  const { prefixCls: customizePrefixCls, loading = true, delay = 0, indicator, titlePosition  = 'bottom', title = '加载中...', size = 'large', className, style, children, blurColor = 'white' } = props;
  const prefixCls = usePrefixCls('loading', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);

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
      <div className={classNames(`${prefixCls}`, `${prefixCls}-${size}`, className)} style={style}>
        {loadingElement}
        {title && (
          <span className={classNames(`${prefixCls}-title`, `${prefixCls}-title-${titlePosition}`)}>{title}</span>
        )}
      </div>
    ) : <>{null}</>;
  }, [className, loadingElement, prefixCls, shouldLoading, size, style, title, titlePosition]);

  const result: JSX.Element = useMemo(() => {
    if (children) {
      if(shouldLoading){
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
      return <>{children}</>;
    }
    return loadingElementAndTitle;
  }, [blurColor, children, loadingElementAndTitle, prefixCls, shouldLoading]);

  return result;
};

export default Loading;
