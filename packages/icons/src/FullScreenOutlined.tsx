import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFullScreenOutlined(wrapperProps: IconProps) {
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
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.03 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="full-screen-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="full-screen-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M14 4.5a.51.51 0 01-.5.5.5.5 0 01-.5-.5V2.19a.2.2 0 00-.12-.19.18.18 0 00-.22 0L9.39 5.31a.46.46 0 01-.68 0 .51.51 0 010-.72L12 1.34a.18.18 0 000-.22.2.2 0 00-.19-.12H9.5A.5.5 0 019 .5a.47.47 0 01.15-.35A.47.47 0 019.5 0h4a.47.47 0 01.35.15.47.47 0 01.15.35zm-9-4a.5.5 0 01-.5.5H2.19a.2.2 0 00-.19.12.18.18 0 000 .22l3.29 3.25a.51.51 0 010 .72.46.46 0 01-.68 0L1.34 2.05a.18.18 0 00-.22 0 .2.2 0 00-.12.14V4.5a.5.5 0 01-.5.5.47.47 0 01-.35-.15A.47.47 0 010 4.5v-4A.47.47 0 01.15.15.47.47 0 01.5 0h4a.47.47 0 01.35.15A.47.47 0 015 .5zm9 13a.51.51 0 01-.5.5h-4a.51.51 0 01-.5-.5.5.5 0 01.5-.5h2.31a.2.2 0 00.18-.12.18.18 0 000-.22l-3.3-3.27a.46.46 0 010-.68.51.51 0 01.72 0L12.66 12a.18.18 0 00.22 0 .2.2 0 00.12-.18V9.5a.5.5 0 01.5-.5.51.51 0 01.5.5zm-14-4a.47.47 0 01.15-.35A.47.47 0 01.5 9a.5.5 0 01.5.5v2.31a.2.2 0 00.12.18.18.18 0 00.22 0l3.25-3.28a.51.51 0 01.72 0 .46.46 0 010 .68l-3.26 3.27a.18.18 0 000 .22.2.2 0 00.18.12H4.5a.5.5 0 01.5.5.51.51 0 01-.5.5h-4a.47.47 0 01-.35-.15.47.47 0 01-.15-.35z"
            fill="currentColor"
            fillRule="evenodd"
            id="full-screen-outlined_svg__full-screen"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFullScreenOutlined;
