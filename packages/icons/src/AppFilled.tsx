import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgAppFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg viewBox="0 0 1024 1024" fill="currentColor" {...props}>
      <defs>
        <style />
      </defs>
      <path
        d="M402.286.002a34.377 34.377 0 0125.6 10.972 34.377 34.377 0 0110.971 25.6v365.712a37.303 37.303 0 01-36.571 36.571H36.573a34.377 34.377 0 01-25.6-10.971 34.377 34.377 0 01-10.97-25.6V36.573a34.377 34.377 0 0110.97-25.6 34.377 34.377 0 0125.6-10.97zm585.14 0a34.377 34.377 0 0125.6 10.972 34.377 34.377 0 0110.971 25.6v365.712a37.303 37.303 0 01-36.571 36.571H621.713a37.303 37.303 0 01-36.57-36.571V36.573a34.377 34.377 0 0110.97-25.6 34.377 34.377 0 0125.6-10.97zm0 585.14a37.303 37.303 0 0136.571 36.571v365.713a37.303 37.303 0 01-36.571 36.571H621.713a37.303 37.303 0 01-36.57-36.571V621.713a37.303 37.303 0 0136.57-36.57zm-585.14 0a37.303 37.303 0 0136.571 36.571v365.713a37.303 37.303 0 01-36.571 36.571H36.573a34.377 34.377 0 01-25.6-10.971 34.377 34.377 0 01-10.97-25.6V621.713a34.377 34.377 0 0110.97-25.6 34.377 34.377 0 0125.6-10.97z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgAppFilled;
