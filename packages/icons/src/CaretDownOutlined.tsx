import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgCaretDownOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="caret-down-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="caret-down-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M7.39 9.51a.5.5 0 01-.78 0l-3-3.7a.51.51 0 01-.06-.53A.5.5 0 014 5h6a.5.5 0 01.45.28.51.51 0 01-.06.53z"
            fill="currentColor"
            fillRule="evenodd"
            id="caret-down-outlined_svg__down-2"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgCaretDownOutlined;
