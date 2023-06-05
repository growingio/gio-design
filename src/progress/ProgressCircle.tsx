import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import { ProgressProps } from './interface';

const sizeMapping = {
  large: { size: 120, border: 6 },
  default: { size: 80, border: 4 },
  small: { size: 20, border: 3 },
};

const ProgressCircle: React.FC<ProgressProps> = ({
  percent = 0,
  status = 'active',
  format,
  customizePrefixCls,
  //   animation,
  //   className,
  style,
  size,
  strokeLinecap,
  ...rest
}: ProgressProps) => {
  const prefixCls = usePrefixCls('progress-circle', customizePrefixCls);

  // const fixedSize = size === 'large' ? 'default' : size;
  const width = sizeMapping[size]?.size || sizeMapping.default.size;
  const border = sizeMapping[size]?.border || sizeMapping.default.border;

  const r = width / 2 - 3;
  const perimeter = Math.PI * r * 2;
  const strokeDashOffset = perimeter - (perimeter * 75) / 100;
  return (
    <div data-testid="progress" className={`${prefixCls} ${prefixCls}-${status}`} style={style} {...rest}>
      <svg width={width} height={width} viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}>
        <circle cx="0" cy="0" r={r} fill="#fff" strokeWidth={border} stroke="#dfe4ee" strokeLinecap="round" />
        <circle
          cx="0"
          cy="0"
          r={r}
          fill="#ffffff00"
          strokeWidth={border}
          className="circle"
          stroke="#1248e9"
          strokeLinecap={strokeLinecap || 'round'}
          strokeDasharray={`${perimeter}, ${perimeter}`}
          strokeDashoffset={strokeDashOffset}
        />
      </svg>
      {size !== 'small' && (
        <span className={`${prefixCls}-text`} style={{ width }}>
          {format?.(percent) || `${percent}%`}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
