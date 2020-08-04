import * as React from 'react';

function SvgCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="check_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="check_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M5.76 10.9l-.35.35a.5.5 0 01-.71 0l-.37-.37L.81 7.36a.51.51 0 010-.7.49.49 0 01.36-.15.47.47 0 01.35.15L4.89 10a.19.19 0 00.28 0l7.28-7.27a.48.48 0 01.36-.15.51.51 0 01.37.15.53.53 0 01.15.36.56.56 0 01-.15.37z"
            fill="#323333"
            fillRule="evenodd"
            id="check_svg__check"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgCheck = React.memo(SvgCheck);
export default MemoSvgCheck;
