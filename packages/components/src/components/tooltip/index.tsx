import * as React from 'react';
import { Tooltip as AtndTooltip } from 'antd';

import 'antd/lib/tooltip/style/index.css';

export interface PropsType {
  title: React.ReactNode;
  arrowPointAtCenter?: boolean;
  autoAdjustOverflow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  overlayClassName?: string;
  overlayStyle?: object;
  placement?:
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
  trigger?: 'hover' | 'focus' | 'click';
  defaultVisible?: boolean;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const Tooltip = (props: PropsType) => (props.disabled ? <>{props.children}</> : <AtndTooltip {...props} />);

export default Tooltip;
