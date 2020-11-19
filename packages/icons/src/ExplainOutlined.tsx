import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgExplainOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path
        d="M512 32a480 480 0 10480 480A480.565 480.565 0 00512 32zm0 903.53A423.53 423.53 0 11935.53 512 424.094 424.094 0 01512 935.53z"
        fill="currentColor"
      />
      <path
        d="M504.659 661.647a48 48 0 00-35.012 13.553 45.176 45.176 0 00-14.118 34.447 46.87 46.87 0 0016.942 34.447 48.565 48.565 0 0035.011 14.118 50.824 50.824 0 0032.753-13.553 48 48 0 0016.941-35.012A45.176 45.176 0 00543.06 675.2a48.565 48.565 0 00-38.4-13.553zm12.423-396.423a156.988 156.988 0 00-118.023 43.482A156.988 156.988 0 00358.4 421.647h72.847a112.941 112.941 0 0118.07-68.894 75.106 75.106 0 0166.071-27.106 78.494 78.494 0 0156.47 20.33 76.8 76.8 0 0119.766 56.47 79.624 79.624 0 01-19.2 49.694l-11.295 12.988a334.87 334.87 0 00-77.364 84.142 134.965 134.965 0 00-13.553 64.376v11.294h73.412v-10.73a90.918 90.918 0 0110.729-44.611 112.941 112.941 0 0128.235-35.012 677.647 677.647 0 0056.47-53.082 131.012 131.012 0 0025.977-82.447 122.541 122.541 0 00-40.659-97.694 151.341 151.341 0 00-107.294-36.141z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgExplainOutlined;
