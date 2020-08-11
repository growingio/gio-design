import * as React from 'react';

function SvgView(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 78 78"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      width="1em"
      height="1em"
      {...props}
    >
      <path fill="none" d="M0 .006h77.778v77.778H0z" />
      <g transform="translate(-61.111 -2911.11) scale(5.55556)">
        <path
          d="M11.741 531.925l-.246-.362a.998.998 0 010-1.126l.246-.362.009-.011A7.839 7.839 0 0118 527c2.555 0 4.831 1.2 6.259 3.075l.246.362a.998.998 0 010 1.126l-.246.362A7.843 7.843 0 0118 535a7.843 7.843 0 01-6.259-3.075zm11.983-.936A6.941 6.941 0 0018 528a6.942 6.942 0 00-5.724 2.988c-.004.007-.005.016-.001.023h.001A6.941 6.941 0 0018 534a6.942 6.942 0 005.724-2.988c.004-.007.005-.016.001-.023h-.001zM18 529a2 2 0 11-.001 4.001A2 2 0 0118 529zm0 1a1 1 0 110 2 1 1 0 010-2z"
          fill="currentColor"
        />
        <clipPath id="view_svg__a">
          <path d="M11.741 531.925l-.246-.362a.998.998 0 010-1.126l.246-.362.009-.011A7.839 7.839 0 0118 527c2.555 0 4.831 1.2 6.259 3.075l.246.362a.998.998 0 010 1.126l-.246.362A7.843 7.843 0 0118 535a7.843 7.843 0 01-6.259-3.075zm11.983-.936A6.941 6.941 0 0018 528a6.942 6.942 0 00-5.724 2.988c-.004.007-.005.016-.001.023h.001A6.941 6.941 0 0018 534a6.942 6.942 0 005.724-2.988c.004-.007.005-.016.001-.023h-.001zM18 529a2 2 0 11-.001 4.001A2 2 0 0118 529zm0 1a1 1 0 110 2 1 1 0 010-2z" />
        </clipPath>
        <g clipPath="url(#view_svg__a)">
          <path d="M18 529a2 2 0 11-.001 4.001A2 2 0 0118 529zm0 1a1 1 0 110 2 1 1 0 010-2z" fill="currentColor" />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgView = React.memo(SvgView);
export default MemoSvgView;
