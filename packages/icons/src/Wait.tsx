import * as React from 'react';

function SvgWait(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 14 14' width='1em' height='1em' {...props}>
      <defs>
        <style />
      </defs>
      <g id='wait_svg__\u56FE\u5C42_2' data-name='\u56FE\u5C42 2'>
        <g id='wait_svg__\u56FE\u5C42_1-2' data-name='\u56FE\u5C42 1'>
          <path
            d='M8 8a.51.51 0 01-.5.5H4a.5.5 0 010-1h2.8a.2.2 0 00.2-.2V4a.5.5 0 011 0zM7 1a6 6 0 11-6 6 6 6 0 016-6zm0-1a7 7 0 11-7 7 7 7 0 017-7z'
            fill='#323333'
            fillRule='evenodd'
            id='wait_svg__wait'
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgWait = React.memo(SvgWait);
export default MemoSvgWait;
