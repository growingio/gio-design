import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgLeftDoubleOutlined(wrapperProps: IconProps) {
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
      <g id="left-double-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="left-double-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7.34 7.71L7 7.35a.48.48 0 010-.7l4.94-4.95a.5.5 0 01.71 0 .5.5 0 010 .7L8.19 6.86a.19.19 0 000 .28l4.47 4.47a.48.48 0 010 .68.51.51 0 01-.72 0zm-5.63 0l-.36-.36a.51.51 0 010-.7L6.3 1.7a.5.5 0 01.7 0 .48.48 0 010 .7L2.56 6.86a.19.19 0 000 .28L7 11.61a.48.48 0 010 .68.52.52 0 01-.73 0z"
            fill="currentColor"
            fillRule="evenodd"
            id="left-double-outlined_svg__right-double"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgLeftDoubleOutlined;
