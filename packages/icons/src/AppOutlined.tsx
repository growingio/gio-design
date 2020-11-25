import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgAppOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '16px' : size,
    height: !size ? '16px' : size,
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="app-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="app-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M5 1.2a.2.2 0 00-.2-.2H1.2a.2.2 0 00-.2.2v3.6a.2.2 0 00.2.2h3.6a.2.2 0 00.2-.2zm8 .05a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25v3.5a.25.25 0 00.25.25h3.5a.25.25 0 00.25-.25zM5.5 0a.47.47 0 01.35.15A.47.47 0 016 .5v5a.51.51 0 01-.5.5h-5a.47.47 0 01-.35-.15A.47.47 0 010 5.5v-5A.47.47 0 01.15.15.47.47 0 01.5 0zm8 0a.47.47 0 01.35.15.47.47 0 01.15.35v5a.51.51 0 01-.5.5h-5a.51.51 0 01-.5-.5v-5a.47.47 0 01.15-.35A.47.47 0 018.5 0zM13 9.2a.2.2 0 00-.2-.2H9.2a.2.2 0 00-.2.2v3.6a.2.2 0 00.2.2h3.6a.2.2 0 00.2-.2zm-8 0a.2.2 0 00-.2-.2H1.2a.2.2 0 00-.2.2v3.6a.2.2 0 00.2.2h3.6a.2.2 0 00.2-.2zM13.5 8a.51.51 0 01.5.5v5a.51.51 0 01-.5.5h-5a.51.51 0 01-.5-.5v-5a.51.51 0 01.5-.5zm-8 0a.51.51 0 01.5.5v5a.51.51 0 01-.5.5h-5a.47.47 0 01-.35-.15.47.47 0 01-.15-.35v-5a.47.47 0 01.15-.35A.47.47 0 01.5 8z"
            fill="currentColor"
            fillRule="evenodd"
            id="app-outlined_svg__card"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgAppOutlined;
