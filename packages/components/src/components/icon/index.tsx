import React, { MouseEvent } from 'react';
import { assign, noop, omit } from 'lodash';
import classnames from 'classnames';
import { isNumber } from '../../utils/helpers';
import { iconfontUrl } from '../../constants';

const styleMap: any = {
  small: { width: '12px', height: '12px' },
  middle: { width: '14px', height: '14px' },
  mediumLarge: { width: '16px', height: '16px' },
  large: { width: '18px', height: '18px' },
  huge: { width: '24px', height: '24px' },
  textBottom: { verticalAlign: 'text-bottom' },
};
const disabledStyle = {
  fill: '#E1DAE6',
  cursor: 'not-allowed',
};
const baseStyle = {
  width: '14px;',
  height: '14px',
  overflow: 'hidden',
  verticalAlign: '-0.15em',
};

// attention!!!!! 这个已经废弃。
// 新的在packages/icon/index.js

export interface IconProps {
  name: string;
  size?: 'huge' | 'large' | 'middle' | 'small' | 'mediumLarge' | number | string;
  disablePointer?: boolean;
  valign?: string;
  fill?: string;
  onClick?: (e?: MouseEvent<HTMLElement>) => void;
  verticalAlign?: string;
  style?: React.CSSProperties;
  svgStyle?: {
    [name: string]: string;
  };
  className?: string;
  svgClassName?: string;
  disabled?: boolean;
}

class Icon extends React.Component<IconProps> {
  public static defaultProps = {
    name: '',
    size: 'middle',
    disablePointer: false,
    valign: '',
    fill: '',
    onClick: noop,
    disabled: false,
  };

  public constructor(props: IconProps) {
    super(props);
    if (!document.getElementById('giconJs')) {
      const fontJs = document.createElement('script');
      fontJs.id = 'giconJs';
      fontJs.src = iconfontUrl;
      document.getElementsByTagName('head')[0].appendChild(fontJs);
    }
  }

  public render() {
    const size: string = this.props.size as string;
    const valign: string = this.props.size as string;
    const style = assign(
      {},
      baseStyle,
      this.props.disablePointer ? {} : { cursor: 'pointer' },
      this.props.fill ? { fill: this.props.fill } : {},
      styleMap[size],
      styleMap[valign],
      this.props.svgStyle,
      this.props.disabled ? disabledStyle : {}
    );

    if (isNumber(this.props.size)) {
      style.width = this.props.size + 'px';
      style.height = this.props.size + 'px';
    }

    if (typeof this.props.size === 'string' && (this.props.size as string).includes('%')) {
      style.width = this.props.size;
      style.height = this.props.size;
    }

    if (this.props.verticalAlign) {
      style.verticalAlign = this.props.verticalAlign;
    }
    // icon所对应的svg
    const iconSvg = (
      <svg className={classnames('gio-icon', 'gio-' + this.props.name, this.props.svgClassName)} style={style}>
        <use xlinkHref={'#' + this.props.name} />
      </svg>
    );
    return (
      <span
        {...omit(this.props, 'svgStyle', 'disablePointer', 'valign')}
        onClick={this.props.disabled ? noop : this.props.onClick}
        style={this.props.style || {}}
        className={classnames('gio-icon-wrapper', this.props.className, 'x')}
      >
        {iconSvg}
      </span>
    );
  }
}

export default Icon;
