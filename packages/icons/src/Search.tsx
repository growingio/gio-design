import * as React from 'react';

function SvgSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 14.01 14" width="1em" height="1em" {...props}>
      <defs>
        <style />
      </defs>
      <g id="search_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="search_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M6 1a5 5 0 11-5 5 5 5 0 015-5zm4.48 10.19a1 1 0 00-1.28-.13A5.83 5.83 0 016 12a6 6 0 115.07-2.79 1 1 0 00.13 1.26c.93 1 2.65 2.68 2.65 2.68a.49.49 0 01-.7.7z"
            fill="#323333"
            fillRule="evenodd"
            id="search_svg__search"
          />
        </g>
      </g>
    </svg>
  );
}

const MemoSvgSearch = React.memo(SvgSearch);
export default MemoSvgSearch;
