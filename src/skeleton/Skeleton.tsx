import React from 'react';
import classNames from 'classnames';
import Avatar from '../avatar';
import useDebounceLoading from '../utils/hooks/useDebounceLoading';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { SkeletonProps } from './interface';
import SkeletonImage from './Image';

const Skeleton = (props: SkeletonProps) => {
  const { prefixCls: customizePrefixCls, delay = 0, loading = true, children, active = true, className, style } = props;
  const prefixCls = usePrefixCls('skeleton', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);

  const renderSkeletonAvatar = () => {
    const { avatar = false } = props;
    if (!avatar) {
      return null;
    }
    const size = 'large';
    return (
      <div className={`${prefixCls}-header`}>
        <Avatar className={`${prefixCls}-avatar`} size={size}>
          {' '}
        </Avatar>
      </div>
    );
  };
  const renderSkeletonParagraph = () => {
    const { paragraph = true, title = true } = props;
    if (!paragraph && !title) {
      return null;
    }
    const row = 3;
    return (
      <div className={`${prefixCls}-content`}>
        {title && <div className={`${prefixCls}-title`} />}
        {paragraph && (
          <div className={`${prefixCls}-paragraph`}>
            {Array(row)
              .fill(0)
              .map((...args) => (
                <p key={args[1]} />
              ))}
          </div>
        )}
      </div>
    );
  };

  return shouldLoading ? (
    <div
      className={classNames(prefixCls, className, {
        [`${prefixCls}-active`]: active,
      })}
      style={style}
    >
      {renderSkeletonAvatar()}
      {renderSkeletonParagraph()}
    </div>
  ) : (
    <>{children}</>
  );
};

Skeleton.Image = SkeletonImage;

export default Skeleton;
