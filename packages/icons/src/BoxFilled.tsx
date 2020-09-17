import * as React from 'react';

function SvgBoxFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 60 61" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M.588 36.882l10-21.764h38.824l10 21.764h-23.53a5.882 5.882 0 11-11.764 0H.588z" fill="#F7F8FC" />
        <path
          d="M.588 36.882h23.53a5.882 5.882 0 1011.764 0h23.53v20.53a3 3 0 01-3 3H3.588a3 3 0 01-3-3v-20.53z"
          fill="#FFF"
        />
        <path
          d="M47.436 15.618a3.497 3.497 0 013.18 2.038h0l8.564 18.64c.211.458.32.957.32 1.461h0V57c0 .966-.392 1.841-1.025 2.475A3.489 3.489 0 0156 60.5h0H4a3.489 3.489 0 01-2.475-1.025A3.489 3.489 0 01.5 57h0V37.757a3.5 3.5 0 01.32-1.46h0l8.564-18.64a3.497 3.497 0 013.18-2.04h0z"
          stroke="#DCDFED"
        />
        <path
          d="M.588 36.882h23.53a5.882 5.882 0 1011.764 0h23.53"
          stroke="#DCDFED"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          stroke="#DCDFED"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M30 1v9.412M40.588 2.261l-4.706 8.151M19.412 2.261l4.706 8.151"
        />
      </g>
    </svg>
  );
}

const MemoSvgBoxFilled = React.memo(SvgBoxFilled);
export default MemoSvgBoxFilled;
