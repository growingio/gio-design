import React from 'react';
import classNames from 'classnames';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { LoadingProps } from './interface';

const Loading = (props: LoadingProps) => {
  const { prefixCls: customizePrefixCls, loading = true, delay = 0 } = props;
  const prefixCls = usePrefixCls('loading', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);

  const renderLoadingElement = (): React.ReactElement => {
    const { indicator } = props;
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
  };

  const renderLoadingElementByPosition = () => {
    const { titlePosition = 'bottom', title = '加载中...', size = 'large', className, style } = props;
    return shouldLoading ? (
      <div className={classNames(`${prefixCls}`, `${prefixCls}-${size}`, className)} style={style}>
        {renderLoadingElement()}
        {title && (
          <span className={classNames(`${prefixCls}-title`, `${prefixCls}-title-${titlePosition}`)}>{title}</span>
        )}
      </div>
    ) : null;
  };

  const renderLoadingContainer = () => {
    const { children, blurColor = 'white' } = props;
    if (children) {
      return (
        <div className={`${prefixCls}-wrapper-loading`}>
          {renderLoadingElementByPosition()}
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
    return renderLoadingElementByPosition();
  };

  return renderLoadingContainer();
};

export default Loading;
