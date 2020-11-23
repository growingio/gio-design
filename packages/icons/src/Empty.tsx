import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgEmpty(wrapperProps: IconProps) {
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
    <svg viewBox="0 0 60 60" fill="currentColor" {...props}>
      <defs>
        <clipPath id="empty_svg__clip-path">
          <path fill="currentColor" d="M0 0h60v60H0z" />
        </clipPath>
        <style>{'.empty_svg__cls-5{fill:#dcdfed}'}</style>
      </defs>
      <g id="empty_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g clipPath="url(#empty_svg__clip-path)" id="empty_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            id="empty_svg__\u8DEF\u5F84-6"
            d="M.59 35.88l8.79-19.14a4.5 4.5 0 014.09-2.62h33.06a4.5 4.5 0 014.09 2.62l8.79 19.14H35.88a5.88 5.88 0 11-11.76 0H.59z"
            fillRule="evenodd"
            fill="currentColor"
          />
          <path
            id="empty_svg__\u77E9\u5F62"
            d="M.59 35.88h23.53a5.88 5.88 0 1011.76 0h23.53v20.53a3 3 0 01-3 3H3.59a3 3 0 01-3-3V35.88z"
            fill="currentColor"
            fillRule="evenodd"
          />
          <path
            className="empty_svg__cls-5"
            d="M56 60H4a4 4 0 01-4-4V36.76a3.87 3.87 0 01.37-1.67l8.56-18.64a3.94 3.94 0 011.48-1.7 4 4 0 012.15-.63h34.88a4 4 0 012.15.63 3.94 3.94 0 011.48 1.7l8.56 18.64a3.87 3.87 0 01.37 1.67V56a4 4 0 01-4 4zM12.56 15.12a3 3 0 00-1.62.47 3 3 0 00-1.1 1.28L1.27 35.5A3 3 0 001 36.76V56a3 3 0 003 3h52a3 3 0 003-3V36.76a3 3 0 00-.27-1.26l-8.57-18.63a2.94 2.94 0 00-1.11-1.28 3 3 0 00-1.61-.47z"
            fill="currentColor"
          />
          <path
            className="empty_svg__cls-5"
            d="M30 42.26a6.38 6.38 0 01-6.36-5.88H.59a.5.5 0 01-.5-.5.5.5 0 01.5-.5h23.53a.51.51 0 01.5.5 5.38 5.38 0 1010.76 0 .51.51 0 01.5-.5h23.53a.5.5 0 01.5.5.5.5 0 01-.5.5h-23A6.38 6.38 0 0130 42.26zM30 10.91a.75.75 0 01-.75-.75V.75a.75.75 0 011.5 0v9.41a.75.75 0 01-.75.75zM35.88 10.91a.71.71 0 01-.37-.1.75.75 0 01-.28-1l4.71-8.15a.74.74 0 011-.28.76.76 0 01.28 1l-4.71 8.15a.75.75 0 01-.63.38zM24.12 10.91a.75.75 0 01-.65-.37l-4.71-8.15a.76.76 0 01.28-1 .75.75 0 011 .28l4.71 8.15a.75.75 0 01-.28 1 .71.71 0 01-.35.09z"
            fill="currentColor"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgEmpty;
