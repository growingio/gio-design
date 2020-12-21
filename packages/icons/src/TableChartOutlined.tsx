import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgTableChartOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
      width: !size ? '16px' : size,
      height: !size ? '16px' : size,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
  };
  const file = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <g id="table-chart-outlined_svg__\u56FE\u5C42_2" data-name="\u56FE\u5C42 2">
        <g id="table-chart-outlined_svg__\u56FE\u5C42_1-2" data-name="\u56FE\u5C42 1">
          <path
            d="M12.8 3a.21.21 0 00.2-.2V1.5a.47.47 0 00-.15-.35.47.47 0 00-.35-.15h-11a.47.47 0 00-.35.15.47.47 0 00-.15.35v1.3a.21.21 0 00.2.2zM9.87 4a.17.17 0 00-.14.06.2.2 0 00-.06.14v1.93a.21.21 0 00.2.2h2.93a.2.2 0 00.14-.06.17.17 0 00.06-.14V4.2a.21.21 0 00-.2-.2zM5.53 4a.21.21 0 00-.2.2v1.93a.17.17 0 00.06.14.2.2 0 00.14.06h2.94a.2.2 0 00.14-.06.17.17 0 00.06-.14V4.2a.21.21 0 00-.2-.2zM1.2 4a.21.21 0 00-.2.2v1.93a.17.17 0 00.06.14.2.2 0 00.14.06h2.93a.21.21 0 00.2-.2V4.2a.2.2 0 00-.06-.14.17.17 0 00-.14-.06zm8.67 3.33a.17.17 0 00-.14.06.2.2 0 00-.06.14v1.94a.2.2 0 00.06.14.17.17 0 00.14.06h2.93a.21.21 0 00.2-.2V7.53a.21.21 0 00-.2-.2zm-4.34 0a.21.21 0 00-.2.2v1.94a.21.21 0 00.2.2h2.94a.21.21 0 00.2-.2V7.53a.21.21 0 00-.2-.2zm-4.33 0a.21.21 0 00-.2.2v1.94a.21.21 0 00.2.2h2.93a.17.17 0 00.14-.06.2.2 0 00.06-.14V7.53a.2.2 0 00-.06-.14.17.17 0 00-.14-.06zM13 10.87a.17.17 0 00-.06-.14.2.2 0 00-.14-.06H9.87a.21.21 0 00-.2.2v1.63a.5.5 0 00.5.5h2.33a.5.5 0 00.5-.5zm-7.47-.2a.2.2 0 00-.14.06.17.17 0 00-.06.14v1.63a.5.5 0 00.5.5h2.34a.5.5 0 00.5-.5v-1.63a.17.17 0 00-.06-.14.2.2 0 00-.14-.06zM3.83 13a.5.5 0 00.5-.5v-1.63a.21.21 0 00-.2-.2H1.2a.2.2 0 00-.14.06.17.17 0 00-.06.14v1.63a.5.5 0 00.5.5zM14 4v9a1 1 0 01-1 1H1a1 1 0 01-1-1V1a1 1 0 011-1h12a1 1 0 011 1v3z"
            fill="currentColor"
            fillRule="evenodd"
            id="table-chart-outlined_svg__table-chart"
          />
        </g>
      </g>
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgTableChartOutlined;
