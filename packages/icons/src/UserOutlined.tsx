import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgUserOutlined(wrapperProps: IconProps) {
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
        <style>{'.user-outlined_svg__cls-2{fill:currentColor;fill-rule:evenodd}'}</style>
      </defs>
      <g id="user-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="user-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <g id="user-outlined_svg__user-variale">
            <path
              className="user-outlined_svg__cls-2"
              d="M13.85 11.69a6.15 6.15 0 00-2-2.42c-.39-.29-1.11-.11-1.66-.17s-1-.74-1-.87a2.07 2.07 0 01-.07-.68 1.12 1.12 0 01.11-.24A7.25 7.25 0 0010 5.78c.79-1 .1-1.6.1-1.6a12.79 12.79 0 000-1.67A3 3 0 009.36.82 2.77 2.77 0 007.5 0h-1a2.77 2.77 0 00-1.86.82 3 3 0 00-.75 1.69 11.14 11.14 0 000 1.67s-.69.59.09 1.6a7.49 7.49 0 00.81 1.54 1 1 0 01.11.23 1.83 1.83 0 01-.07.68c-.07.13-.47.81-1 .87s-1.26-.1-1.65.17a6.15 6.15 0 00-2 2.42c-.24 1-.3 2.05.63 2.31h12.41c.93-.26.87-1.34.63-2.31"
              fill="currentColor"
            />
            <path
              d="M12.72 13.14c-.41.1-5.18.1-5.72.09s-5.3 0-5.72-.09S1 12.61 1.11 12a4.16 4.16 0 011.52-1.83c.41-.26.53-.15 1.6-.3a2.13 2.13 0 001.6-1.51 2.75 2.75 0 000-1.32 7 7 0 01-.53-.91C5.21 6 5 5.61 5 5.61c-.63-.75-.3-1.1-.24-1.14s.06-.28 0-.76A6.25 6.25 0 015 2C5.12 1 6.64.82 6.64.82h.72S8.88 1 9.05 2a6.25 6.25 0 01.11 1.7c0 .48 0 .73.05.76s.39.4-.21 1.15c0 0-.19.43-.23.55a7.56 7.56 0 01-.53.9 2.63 2.63 0 00-.05 1.32 2.13 2.13 0 001.59 1.51c1.06.15 1.18 0 1.59.3A4.16 4.16 0 0112.89 12c.1.59.26 1-.17 1.12"
              fill="currentColor"
              fillRule="evenodd"
            />
            <path
              className="user-outlined_svg__cls-2"
              d="M7.16 9.61h-.31a.19.19 0 01-.17-.1l-.27-.44a.34.34 0 01.37-.34h.44a.34.34 0 01.38.34l-.27.44a.21.21 0 01-.17.1M7.59 11.88l-.48.36a.21.21 0 01-.24 0l-.47-.36a.19.19 0 01-.07-.2l.33-1.78a.2.2 0 01.2-.17h.29a.2.2 0 01.2.17l.32 1.78a.22.22 0 01-.08.2"
              fill="currentColor"
            />
          </g>
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgUserOutlined;
