import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgDelete(wrapperProps: IconProps) {
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
      <g id="delete_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="delete_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M9 1.2a.2.2 0 00-.2-.2H5.2a.2.2 0 00-.2.2v.6a.2.2 0 00.2.2h3.6a.2.2 0 00.2-.2zm1 9.3a.5.5 0 01-1 0v-5a.5.5 0 011 0zm-5 0a.5.5 0 01-.85.35.47.47 0 01-.15-.35v-5a.5.5 0 01.85-.35.47.47 0 01.15.35zm2.5 0a.5.5 0 01-1 0v-5a.5.5 0 011 0zm4-7A.5.5 0 0011 3H3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h8a.5.5 0 00.5-.5zm-1.5-2a.47.47 0 00.15.35.47.47 0 00.35.15H13a.5.5 0 010 1h-.34a.17.17 0 00-.16.16V13a1 1 0 01-1 1h-9a1 1 0 01-1-1V3.16A.17.17 0 001.34 3H1a.5.5 0 010-1h2.5a.47.47 0 00.35-.15A.47.47 0 004 1.5V1a1 1 0 01.29-.71A1 1 0 015 0h4a1 1 0 01.71.29A1 1 0 0110 1z"
            fill="currentColor"
            fillRule="evenodd"
            id="delete_svg__delete"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgDelete;
