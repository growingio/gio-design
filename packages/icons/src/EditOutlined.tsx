import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgEditOutlined(wrapperProps: IconProps) {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="edit-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="edit-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7.72 2.75a.48.48 0 000 .7l2.83 2.83a.48.48 0 00.7 0l1.41-1.4a.52.52 0 00.14-.35.52.52 0 00-.14-.36L9.83 1.34a.52.52 0 00-.36-.14.52.52 0 00-.35.14zM4.33 13a.47.47 0 00.35-.15L9.84 7.7a.53.53 0 00.16-.36.51.51 0 00-.16-.34L7 4.16A.51.51 0 006.66 4a.53.53 0 00-.36.15L1.15 9.32a.47.47 0 00-.15.35v3.13a.2.2 0 00.2.2zM6.66 2.39L8.75.3a1 1 0 011.45 0l3.5 3.5a1 1 0 010 1.45l-8.47 8.47a1 1 0 01-.68.28H.5a.47.47 0 01-.35-.15.47.47 0 01-.15-.35V9.45a1 1 0 01.28-.68z"
            fill="currentColor"
            fillRule="evenodd"
            id="edit-outlined_svg__edit"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgEditOutlined;
