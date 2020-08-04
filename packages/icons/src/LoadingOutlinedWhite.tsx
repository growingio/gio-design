import * as React from 'react';

function SvgLoadingOutlinedWhite(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 16 16' {...props}>
      <g transform='translate(.5 .5)' stroke='#FFF' fill='none' fillRule='evenodd'>
        <circle opacity={0.4} cx={7.5} cy={7.5} r={7.5} />
        <path d='M15 7.5A7.5 7.5 0 007.5 0' strokeLinecap='round' />
      </g>
    </svg>
  );
}

const MemoSvgLoadingOutlinedWhite = React.memo(SvgLoadingOutlinedWhite);
export default MemoSvgLoadingOutlinedWhite;
