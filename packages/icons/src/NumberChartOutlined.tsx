import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgNumberChartOutlined(wrapperProps: IconProps) {
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
    <svg
      viewBox="0 0 78 78"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      fill="currentColor"
      {...props}
    >
      <path
        d="M77.778 72.229a5.558 5.558 0 01-5.555 5.555H5.556A5.558 5.558 0 010 72.23V5.562A5.558 5.558 0 015.556.007h66.667a5.558 5.558 0 015.555 5.555V72.23zm-5.555-47.222a2.779 2.779 0 00-2.778-2.778H8.334a2.779 2.779 0 00-2.778 2.778v44.289c0 .777.311 1.522.861 2.072s1.294.86 2.072.86h60.8c.778 0 1.523-.31 2.073-.86s.86-1.295.86-2.072v-44.29zM27.95 64.296c0 .6-.205 1.105-.61 1.516-.406.406-1.017.611-1.834.611-.817 0-1.417-.205-1.8-.61-.389-.412-.583-.917-.583-1.517V30.973c0-.605.155-1.1.46-1.494.306-.389.862-.583 1.678-.583.65 0 1.162.16 1.528.477.367.323.734.678 1.1 1.067l19.956 25.417c.289.372.789.516 1.233.366.45-.155.75-.577.75-1.05v-24.2c0-.605.172-1.1.522-1.494.345-.389.967-.583 1.862-.583.894 0 1.527.177 1.894.533.367.355.55.867.55 1.544v33.373c0 .605-.15 1.1-.456 1.494-.305.389-.866.583-1.683.583-.572 0-1.067-.15-1.494-.45a5.924 5.924 0 01-1.195-1.144s-14.51-18.222-19.9-24.983a1.104 1.104 0 00-1.233-.356 1.114 1.114 0 00-.745 1.05v23.756zM72.223 8.34c0-.739-.295-1.444-.811-1.967a2.798 2.798 0 00-1.967-.81H8.334c-.74 0-1.445.294-1.967.81a2.798 2.798 0 00-.811 1.967v5.556c0 .738.294 1.444.811 1.966a2.798 2.798 0 001.967.811h61.11c.74 0 1.445-.294 1.968-.81a2.798 2.798 0 00.81-1.967V8.34z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgNumberChartOutlined;
