import * as React from 'react';

function SvgDefeat(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="defeat_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="defeat_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M4.17 4.17a.51.51 0 01.71 0l1.77 1.77a.5.5 0 00.7 0l1.77-1.77a.5.5 0 01.71.71L8.06 6.65a.5.5 0 000 .7c.47.48 1.31 1.31 1.78 1.78a.49.49 0 010 .69.51.51 0 01-.37.15.51.51 0 01-.36-.15L7.35 8.06a.5.5 0 00-.7 0L4.89 9.82a.51.51 0 01-.36.15.51.51 0 01-.37-.15.49.49 0 010-.69l1.78-1.78a.5.5 0 000-.7L4.17 4.88a.51.51 0 010-.71zM7 1a6 6 0 11-6 6 6 6 0 016-6zm0-1a7 7 0 11-7 7 7 7 0 017-7z"
            fill="#323333"
            fillRule="evenodd"
            id="defeat_svg__defeat"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgDefeat = React.memo(SvgDefeat);
export default MemoSvgDefeat;
