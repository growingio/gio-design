import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { isArray, isObject } from 'lodash';
import Avatar from '../avatar';
import useDebounceLoading from '../utils/hooks/useDebounceLoading';
import { SkeletonProps } from './interface';
import SkeletonImage from './Image';
import WithSubComponent from '../utils/withSubComponent';

const InnerSkeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    delay = 0,
    loading = true,
    children,
    active = true,
    className,
    paragraph,
    title,
    ...otherProps
  } = props;
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
    if (!paragraph && !title) {
      return null;
    }
    const { row, width } = isObject(paragraph) ? paragraph : { row: 3, width: '100%' };

    return (
      <div className={`${prefixCls}-content`}>
        {title && <div className={`${prefixCls}-title`} />}
        {paragraph && (
          <div className={`${prefixCls}-paragraph`}>
            {Array(row)
              .fill(0)
              .map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <p key={index} style={{ width: isArray(width) ? width[index] : width }} />
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
      ref={ref}
      data-testid="skeleton"
      {...otherProps}
    >
      {renderSkeletonAvatar()}
      {renderSkeletonParagraph()}
    </div>
  ) : (
    <>{children}</>
  );
});

const Skeleton = WithSubComponent(InnerSkeleton, {
  Image: SkeletonImage,
});

export default Skeleton;
