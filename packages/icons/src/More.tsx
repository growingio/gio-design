import * as React from 'react';

function SvgMore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <path
        className="more_svg__cls-2"
        d="M7 1a1 1 0 11-1 1 1 1 0 011-1zm0 5a1 1 0 11-1 1 1 1 0 011-1zm0 5a1 1 0 11-1 1 1 1 0 011-1z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgMore = React.memo(SvgMore);
export default MemoSvgMore;
