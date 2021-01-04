import React from 'react';
import { isBoolean } from 'lodash';
import classNames from 'classnames';
import Avatar from '../avatar';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { SkeletonProps } from './interface';
import SkeletonImage from './Image';

const Skeleton = (props: SkeletonProps) => {
  const { prefixCls: customizePrefixCls, delay = 0, loading = true, children, active = true } = props;
  const prefixCls = usePrefixCls('skeleton', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);

  const renderSkeletonAvatar = () => {
    const { avatar = false } = props;
    if (!avatar) {
      return null;
    }
    const size = isBoolean(avatar) ? 'large' : avatar.size;
    return (
      <div className={`${prefixCls}-header`}>
        <Avatar className={`${prefixCls}-avatar`} size={size} />
      </div>
    );
  };

  const renderSkeletonParagraph = () => {
    const { paragraph = true, title = true } = props;
    if (!paragraph && !title) {
      return null;
    }
    const row = isBoolean(paragraph) ? 3 : paragraph.row;
    return (
      <div className={`${prefixCls}-content`}>
        {title && <div className={`${prefixCls}-title`} />}
        {paragraph && (
          <div className={`${prefixCls}-paragraph`}>
            {Array(row)
              .fill(0)
              .map((...args) => {
                return <p key={args[1]} />;
              })}
          </div>
        )}
      </div>
    );
  };

  return shouldLoading ? (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-active`]: active,
      })}
    >
      {renderSkeletonAvatar()}
      {renderSkeletonParagraph()}
    </div>
  ) : (
    <>
      {children}
    </>
  );
};

Skeleton.Image = SkeletonImage;

export default Skeleton;
