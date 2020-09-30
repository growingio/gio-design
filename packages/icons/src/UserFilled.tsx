import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgUserFilled(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    color,
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '1rem' : size,
    height: !size ? '1rem' : size,
  };
  const file = (
    <svg
      viewBox="0 0 14 14"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M7.51 0c.115.005 1.228.073 1.852.821.658.789.699 1.398.749 1.684.049.286-.009 1.533-.036 1.671l.004.004.029.029c.128.136.551.696-.124 1.573 0 0-.435 1.089-.818 1.532 0 0-.092.162-.103.238-.01.076-.007.553.065.678.071.125.469.807 1.028.866.558.061 1.276-.115 1.665.177.386.29 1.78 1.445 2.025 2.414.244.971.3 2.051-.63 2.313H.78c-.926-.261-.872-1.341-.626-2.312.244-.969 1.636-2.124 2.024-2.414.39-.291 1.107-.116 1.666-.177.559-.059.957-.741 1.028-.866.073-.125.076-.601.065-.678a1.023 1.023 0 00-.103-.238c-.381-.443-.817-1.532-.817-1.532-.779-1.015-.09-1.606-.09-1.606-.027-.139-.087-1.386-.038-1.671.051-.287.092-.896.75-1.684C5.297.033 6.5 0 6.5 0h1.01zm-.357 9.734h-.296a.201.201 0 00-.198.164l-.332 1.786a.2.2 0 00.075.195l.466.358a.198.198 0 00.242.001l.479-.36c.06-.045.09-.12.076-.194l-.314-1.785a.202.202 0 00-.198-.165zm.068-1.002h-.437c-.239 0-.372.151-.372.34l.265.437a.197.197 0 00.17.097h.312a.2.2 0 00.17-.095l.271-.439c0-.188-.139-.34-.379-.34z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgUserFilled;
