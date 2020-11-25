import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgStopWatchOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 14" fill="currentColor" {...props}>
      <defs>
        <clipPath id="stop-watch-outlined_svg__a" transform="translate(-1)">
          <path fill="currentColor" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
      <g data-name="\u56FE\u5C42 2">
        <g clipPath="url(#stop-watch-outlined_svg__a)" data-name="\u56FE\u5C42 1">
          <path d="M6 2a6 6 0 106 6 6 6 0 00-6-6zm0 11a5 5 0 115-5 5 5 0 01-5 5z" fill="currentColor" />
          <rect x={4} width={4} height={1} rx={0.5} />
          <path
            d="M5.5 0h1v3h-1zM11.66 3.05L11 2.34a.502.502 0 10-.71.71l.07.07-.7.71.56.56.71-.7.07.07a.502.502 0 00.71-.71zM2.39 3.83l-.7-.71.07-.07a.502.502 0 00-.71-.71l-.71.71a.502.502 0 00.71.71l.07-.07.71.7z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgStopWatchOutlined;
