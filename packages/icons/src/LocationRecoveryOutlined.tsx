import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgLocationRecoveryOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
      width: !size ? '16px' : size,
      height: !size ? '16px' : size,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
  };
  const file = (
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <g transform="translate(-254.374 -193.839)">
        <path
          d="M261.856 194.677a.2.2 0 00.18.198 6.007 6.007 0 015.3 5.285c.01.101.096.178.198.178l.34.001a.501.501 0 010 1h-.34a.2.2 0 00-.198.179 6.007 6.007 0 01-5.3 5.285.2.2 0 00-.179.198l-.001.338a.497.497 0 01-.5.5.5.5 0 01-.5-.5v-.342a.2.2 0 00-.178-.198 6.007 6.007 0 01-5.266-5.281.2.2 0 00-.198-.178l-.34-.001a.5.5 0 010-1h.34a.201.201 0 00.198-.179 6.006 6.006 0 015.266-5.281.2.2 0 00.178-.198v-.342a.5.5 0 011 0v.338zm-.482 1.162c2.759 0 5 2.24 5 5 0 2.759-2.241 5-5 5-2.76 0-5-2.241-5-5 0-2.76 2.24-5 5-5zm0 3.5a1.5 1.5 0 11-.001 3.001 1.5 1.5 0 01.001-3.001z"
          fill="currentColor"
        />
        <clipPath id="location-recovery-outlined_svg__a">
          <path
            d="M261.856 194.677a.2.2 0 00.18.198 6.007 6.007 0 015.3 5.285c.01.101.096.178.198.178l.34.001a.501.501 0 010 1h-.34a.2.2 0 00-.198.179 6.007 6.007 0 01-5.3 5.285.2.2 0 00-.179.198l-.001.338a.497.497 0 01-.5.5.5.5 0 01-.5-.5v-.342a.2.2 0 00-.178-.198 6.007 6.007 0 01-5.266-5.281.2.2 0 00-.198-.178l-.34-.001a.5.5 0 010-1h.34a.201.201 0 00.198-.179 6.006 6.006 0 015.266-5.281.2.2 0 00.178-.198v-.342a.5.5 0 011 0v.338zm-.482 1.162c2.759 0 5 2.24 5 5 0 2.759-2.241 5-5 5-2.76 0-5-2.241-5-5 0-2.76 2.24-5 5-5zm0 3.5a1.5 1.5 0 11-.001 3.001 1.5 1.5 0 01.001-3.001z"
            fill="currentColor"
          />
        </clipPath>
        <g clipPath="url(#location-recovery-outlined_svg__a)">
          <circle cx={32.135} cy={38.135} r={4.135} fill="#333" transform="translate(214.75 145.51) scale(1.45086)" />
          <circle cx={32.135} cy={38.135} r={4.135} fill="#333" transform="translate(222.52 154.731) scale(1.20905)" />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgLocationRecoveryOutlined;
