import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgFilter2Outlined(wrapperProps: IconProps) {
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
      <g id="filter-2-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="filter-2-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M3.5 1a.5.5 0 11-.5.5.5.5 0 01.5-.5zm1.55 1a.21.21 0 00-.19.12 1.49 1.49 0 01-2.72 0A.21.21 0 002 2H.5a.47.47 0 01-.35-.15.48.48 0 010-.7A.47.47 0 01.5 1H2a.13.13 0 00.12-.08A1.5 1.5 0 013.5 0a1.48 1.48 0 011.36.88.21.21 0 00.19.12h8.45a.47.47 0 01.35.15.48.48 0 010 .7.47.47 0 01-.35.15zm5.45 4.5a.5.5 0 11-.5.5.5.5 0 01.5-.5zm1.55 1a.21.21 0 00-.19.12 1.49 1.49 0 01-2.72 0A.21.21 0 009 7.5H.5a.47.47 0 01-.35-.15.48.48 0 010-.7.47.47 0 01.35-.15H9a.13.13 0 00.12-.08 1.5 1.5 0 011.38-.92 1.48 1.48 0 011.36.88.21.21 0 00.19.12h1.45a.5.5 0 010 1zM3.5 12a.5.5 0 11-.5.5.5.5 0 01.5-.5zm1.55 1a.21.21 0 00-.19.12 1.49 1.49 0 01-2.72 0A.21.21 0 002 13H.5a.47.47 0 01-.35-.15.48.48 0 010-.7A.47.47 0 01.5 12H2a.13.13 0 00.12-.08A1.5 1.5 0 013.5 11a1.48 1.48 0 011.36.88.21.21 0 00.19.12h8.45a.5.5 0 010 1z"
            fill="currentColor"
            fillRule="evenodd"
            id="filter-2-outlined_svg__filter-2"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgFilter2Outlined;
