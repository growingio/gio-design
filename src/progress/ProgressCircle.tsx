import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import { ProgressProps } from './interface';

const sizeMapping = {
  large: { size: 140, border: 6 },
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
  strokeColor,
  trailColor,
  style,
  size,
  strokeLinecap,
  circleWidth,
  strokeWidth = 6,
  showText = true,
  ...rest
}: ProgressProps) => {
  const prefixCls = usePrefixCls('progress-circle', customizePrefixCls);

  const width = circleWidth || sizeMapping[size || 'default']?.size || sizeMapping.default.size;
  const border = sizeMapping[size || 'default']?.border || sizeMapping.default.border;
  const fixedBorder = (width * strokeWidth) / 100 || border;

  const r = width / 2 - fixedBorder / 2;
  const perimeter = Math.PI * r * 2;
  const strokeDashOffset = perimeter - (perimeter * 75) / 100;
  return (
    <div
      data-testid="progress"
      className={classNames(prefixCls, { [`${prefixCls}-${status}`]: !strokeColor })}
      style={style}
      {...rest}
    >
      <svg width={width} height={width} viewBox={`${-width / 2} ${-width / 2} ${width} ${width}`}>
        <circle
          cx="0"
          cy="0"
          r={r}
          fill="#fff"
          strokeWidth={fixedBorder}
          stroke={trailColor || '#dfe4ee'}
          strokeLinecap="round"
        />
        <circle
          cx="0"
          cy="0"
          r={r}
          fill="#ffffff00"
          strokeWidth={fixedBorder}
          className="circle"
          stroke={strokeColor || '#1248e9'}
          strokeLinecap={strokeLinecap || 'round'}
          strokeDasharray={`${perimeter}, ${perimeter}`}
          strokeDashoffset={strokeDashOffset}
        />
      </svg>
      {size !== 'small' && (
        <span className={`${prefixCls}-text`} style={{ width }}>
          {showText ? format?.(percent) || `${percent}%` : ''}
        </span>
      )}
    </div>
  );
};

export default ProgressCircle;
