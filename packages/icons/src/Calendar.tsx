import * as React from 'react';

function SvgCalendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14.01 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="calendar_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="calendar_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M10.5 7h-1a.5.5 0 010-1h1a.5.5 0 010 1zm-3 0h-1a.5.5 0 010-1h1a.5.5 0 010 1zm-3 0h-1a.5.5 0 010-1h1a.5.5 0 010 1zm6 3h-1a.5.5 0 010-1h1a.5.5 0 010 1zm-3 0h-1a.5.5 0 010-1h1a.5.5 0 010 1zm-3 0h-1a.5.5 0 010-1h1a.5.5 0 010 1zm-3-6.95a.53.53 0 00-.5.53v7.93a.54.54 0 00.53.54h10.94a.54.54 0 00.53-.54V3.58a.53.53 0 00-.53-.53h-1.33a.13.13 0 00-.1 0 .12.12 0 000 .1v.35a.5.5 0 01-1 0v-.31a.14.14 0 00-.14-.14H4.14a.14.14 0 00-.14.14v.31a.5.5 0 01-1 0v-.31a.12.12 0 000-.1.13.13 0 00-.1 0zM9.86 2a.14.14 0 00.14-.14V1.5a.5.5 0 011 0v.36a.14.14 0 00.14.14H13a1 1 0 011 1v9a1 1 0 01-1 1H1a1 1 0 01-1-1V3a1 1 0 011-1h1.86A.14.14 0 003 1.86V1.5a.5.5 0 011 0v.36a.14.14 0 00.14.14z"
            fill="#323333"
            fillRule="evenodd"
            id="calendar_svg__calendar"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgCalendar = React.memo(SvgCalendar);
export default MemoSvgCalendar;
