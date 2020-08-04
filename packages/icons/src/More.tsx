import * as React from 'react';

function SvgMore(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 14 14' width='1em' height='1em' {...props}>
      <g id='more'>
        <path
          d='M7,1A1,1,0,1,1,6,2,1,1,0,0,1,7,1ZM7,6A1,1,0,1,1,6,7,1,1,0,0,1,7,6Zm0,5a1,1,0,1,1-1,1A1,1,0,0,1,7,11Z'
          style={{ fill: 'currentColor' }}
        />
      </g>
    </svg>
  );
}

const MemoSvgMore = React.memo(SvgMore);
export default MemoSvgMore;
