import * as React from 'react';

function SvgWarning(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width='1em' height='1em' viewBox='0 0 59 59' fillRule='evenodd' {...props}>
      <path
        d='M29.167 0c16.096 0 29.167 13.072 29.167 29.168 0 16.095-13.07 29.166-29.167 29.166-16.095 0-29.166-13.07-29.166-29.166S13.07 0 29.167 0zm0 37.5a4.168 4.168 0 010 8.333 4.168 4.168 0 01-4.166-4.165c0-2.3 1.866-4.167 4.166-4.167zm3.938-22.707a2.073 2.073 0 00-.53-1.605 2.078 2.078 0 00-1.541-.687h-3.733c-.588 0-1.146.25-1.542.687a2.073 2.073 0 00-.53 1.605l1.78 17.791c.042.425.4.75.83.75h2.658c.429 0 .787-.325.829-.75l1.779-17.791z'
        fill='currentColor'
      />
    </svg>
  );
}

const MemoSvgWarning = React.memo(SvgWarning);
export default MemoSvgWarning;
