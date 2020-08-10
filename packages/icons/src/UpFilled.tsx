import * as React from 'react';

function SvgUpFilled(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="up-filled_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="up-filled_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6.61 4.49a.5.5 0 01.78 0l3 3.7a.51.51 0 01.06.53A.5.5 0 0110 9H4a.5.5 0 01-.45-.28.51.51 0 01.06-.53z"
            fill="currentColor"
            fillRule="evenodd"
            id="up-filled_svg__up-2"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgUpFilled = React.memo(SvgUpFilled);
export default MemoSvgUpFilled;
