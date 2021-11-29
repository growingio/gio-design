import React from 'react';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { WheelProps } from './interface';

const Wheel: React.FC<WheelProps> = (props: WheelProps) => {
  const { indicator, prefixCls: customizePrefixCls } = props;
  const prefixCls = usePrefixCls('loading', customizePrefixCls);
  if (indicator) {
    return <span className={`${prefixCls}-indicator`}>{indicator}</span>;
  }
  return (
    <div className={`${prefixCls}-ring`}>
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className={`${prefixCls}-ring-line ${prefixCls}-ring-line-${item}`}>
          <div className={`${prefixCls}-ring-line-cog`}>
            <div className={`${prefixCls}-ring-line-cog-inner ${prefixCls}-ring-line-cog-inner-left`} />
          </div>
          <div className={`${prefixCls}-ring-line-ticker`}>
            <div className={`${prefixCls}-ring-line-cog-inner ${prefixCls}-ring-line-cog-inner-center`} />
          </div>
          <div className={`${prefixCls}-ring-line-cog`}>
            <div className={`${prefixCls}-ring-line-cog-inner ${prefixCls}-ring-line-cog-inner-right`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wheel;
