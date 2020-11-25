import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgUnlockOutlined(wrapperProps: IconProps) {
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
      <g id="unlock-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="unlock-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7 9a.51.51 0 01.5.5v1a.5.5 0 01-1 0v-1A.51.51 0 017 9zm5-1.5a.51.51 0 00-.5-.5h-9a.47.47 0 00-.35.15.47.47 0 00-.15.35v5a.47.47 0 00.15.35.47.47 0 00.35.15h9a.51.51 0 00.5-.5zm1 5.5a1 1 0 01-1 1H2a1 1 0 01-.71-.29A1 1 0 011 13V7a1 1 0 011-1h.8a.21.21 0 00.2-.2V4a4 4 0 018 0 .47.47 0 01-.15.35.48.48 0 01-.7 0A.47.47 0 0110 4a3 3 0 00-6 0v1.8a.2.2 0 00.2.2H12a1 1 0 011 1z"
            fill="currentColor"
            fillRule="evenodd"
            id="unlock-outlined_svg__no_permission"
            data-name="no permission"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgUnlockOutlined;
