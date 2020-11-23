import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFilterOutlined(wrapperProps: IconProps) {
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
      <g id="filter-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="filter-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6 6.46L5.56 6zM7.5 13a.51.51 0 00.5-.5V6.86a1 1 0 01.28-.69l4.16-4.32a.55.55 0 00.1-.55.51.51 0 00-.46-.3H1.92a.51.51 0 00-.46.3.53.53 0 00.1.55l4 4.15.16.17a1 1 0 01.28.69v5.64a.51.51 0 00.5.5zM9 13a1 1 0 01-1 1H6a1 1 0 01-1-1V7.28a1 1 0 00-.27-.69L.89 2.53A1.5 1.5 0 012 0h10a1.5 1.5 0 011.09 2.53L9.27 6.59a1 1 0 00-.27.69z"
            fill="currentColor"
            fillRule="evenodd"
            id="filter-outlined_svg__filter"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFilterOutlined;
