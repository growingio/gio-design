import * as React from 'react';
import Wrapper from './Wrapper';
import { IconProps } from './interface';

function SvgMapChartOutlined(wrapperProps: IconProps) {
  const { rotating, color, size, ...restProps } = wrapperProps;
  const props = {
    style: {
      color,
    },
    className: rotating ? 'gio-icon-svg gio-icon-rotating' : 'gio-icon-svg',
    width: !size ? '16px' : size,
    height: !size ? '16px' : size,
  };
  const file = (
    <svg
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      fill="currentColor"
      {...props}
    >
      <path
        d="M13.724 4.839c-.429-.565-1.129-.653-1.636-.174L6.987 1.182a1.522 1.522 0 00-.273-.697c-.428-.566-1.13-.653-1.636-.174-.234.217-.35.522-.389.827L1.923 2.967c-.311-.305-.7-.392-1.09-.262-.623.218-.973.915-.779 1.612.117.522.545.871.974.914l.662 3.265c-.312.218-.545.654-.545 1.089 0 .74.506 1.306 1.168 1.306.272 0 .546-.13.74-.305l2.765 1.829c0 .087-.038.174-.038.261 0 .74.506 1.307 1.168 1.307.662 0 1.168-.567 1.168-1.307 0-.218-.038-.436-.117-.609l4.324-5.181c.388.174.856.13 1.207-.175a1.39 1.39 0 00.194-1.872zm-7.477 6.897l-2.766-1.89c.022-.147.022-.515-.039-.652l1.441-1.307c.234.218.546.349.896.349l.639 3.359-.171.141zm5.451-5.33l-4.281 5.188c-.117-.042-.196-.086-.312-.086l-.587-3.404c.468-.261.819-.784.858-1.436l4.322-.262zM2.469 8.322l-.662-3.266 2.531 1.219c0 .088-.039.175-.039.262 0 .261.039.478.117.696L2.975 8.496c-.155-.087-.312-.174-.506-.174zm4.322-6.269l4.907 3.353v.129l-4.439.306c-.195-.479-.584-.828-1.013-.958V2.575c.117-.043.233-.13.351-.217a.776.776 0 00.194-.305zM2.312 3.707l2.57-1.654c.039.043.039.087.078.13.157.174.312.305.506.392v2.308a1.344 1.344 0 00-.817.609L2.312 4.36c0-.217.039-.435 0-.653z"
        fill="currentColor"
      />
    </svg>
  );
  return <Wrapper {...restProps} icon={file} />;
}

export default SvgMapChartOutlined;
