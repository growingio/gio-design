import React from 'react';
import classNames from 'classnames';
import useDebounceLoading from '../../utils/hooks/useDebounceLoading';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { SkeletonImageProps } from './interface';

const SkeletonImage = (props: SkeletonImageProps) => {
  const {
    prefixCls: customizePrefixCls,
    loading = true,
    delay = 0,
    children,
    width = 100,
    color = '#DBDEE8',
    className,
    style,
  } = props;
  const prefixCls = usePrefixCls('skeleton', customizePrefixCls);
  const shouldLoading = useDebounceLoading(loading, delay);

  return shouldLoading ? (
    <div className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-image`}>
        <svg width={`${width}px`} height={`${width * 0.85}px`} viewBox="0 0 1204 1024" color={color}>
          <path
            d="M495.977412 695.67749l-98.886275-136.83451c-13.091137-18.110745-34.334118-18.110745-47.425255 0l-182.312157 252.245334c-13.091137 18.110745-5.280627 32.808157 17.468236 32.808157h835.222588c22.748863 0 30.398745-14.657255 17.167059-32.727844L748.323137 416.145569c-13.312-18.211137-34.675451-18.090667-47.907137 0l-204.438588 279.491764zM281.379137 282.182275a80.25349 80.25349 0 1 0 160.486902 0 80.25349 80.25349 0 0 0-160.486902 0z"
            style={{ fill: 'currentColor' }}
          />
          <path
            d="M60.616784 81.578667H1144.06902a19.998118 19.998118 0 0 1-20.138667-19.998118v882.547451c0-11.043137 8.914824-19.978039 20.138667-19.978039H60.636863a19.998118 19.998118 0 0 1 20.138666 19.978039V61.580549c0 11.043137-8.914824 19.998118-20.138666 19.998118zM0.522039 944.148078a60.235294 60.235294 0 0 0 60.094745 60.235295H1144.06902a60.235294 60.235294 0 0 0 60.094745-60.235295V61.560471A60.235294 60.235294 0 0 0 1144.089098 1.325176H60.636863A60.235294 60.235294 0 0 0 0.522039 61.580549v882.547451z"
            style={{ fill: 'currentColor' }}
          />
        </svg>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default SkeletonImage;
