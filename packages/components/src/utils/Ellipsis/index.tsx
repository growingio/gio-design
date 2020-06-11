import * as React from 'react';
import { Tooltip } from 'antd';

interface P {
  line?: number;
  title?: React.ReactNode;
  maxWidth?: string;
  style?: object;
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
}

class Ellipsis extends React.PureComponent<P> {
  public state = {
    tooltip: false,
  };
  private textRef: HTMLSpanElement | null = null;
  public componentDidMount() {
    this.detectTooltip();
  }
  public componentDidUpdate(prevProps: P) {
    if (prevProps.title !== this.props.title) {
      this.detectTooltip();
    }
  }
  public render() {
    const { children, line, title, maxWidth, style, placement } = this.props;
    const _style = { maxWidth, ...style };
    if (!line) {
      return (
        <Tooltip
          title={this.state.tooltip ? title : ''}
          placement={placement}
          overlayStyle={{ wordWrap: 'break-word' }}
        >
          <span className='gio-ui-single-line-ellipsis' ref={this.setTextRef} style={_style}>
            {children}
          </span>
        </Tooltip>
      );
    }
    return (
      <Tooltip title=''>
        <span
          className={`gio-ui-ellipsis gio-ui-ellipsis__line--${line}`}
          style={{
            boxOrient: 'vertical',
            lineClamp: line,
            ..._style,
          }}
          ref={this.setTextRef}
        >
          {children}
        </span>
      </Tooltip>
    );
  }
  private setTextRef = (ref: HTMLSpanElement) => {
    if (ref) {
      this.textRef = ref;
    } else {
      this.textRef = null;
    }
  };
  private detectTooltip = () => {
    this.setTooltip();
    // IE、Firefox下多行省略不兼容，限制行数。
    this.limitLineNumbers();
  };
  private setTooltip = () => {
    let tooltip = false;
    if (this.textRef && this.textRef.scrollWidth > this.textRef.clientWidth) {
      tooltip = true;
    }
    if (tooltip !== this.state.tooltip) {
      this.setState({ tooltip });
    }
  };
  private limitLineNumbers = () => {
    const { line } = this.props;
    if (!line) {
      return;
    }
    if (this.textRef) {
      const lineHeight = parseInt(getComputedStyle(this.textRef)['line-height' as any], 10);
      if (typeof lineHeight === 'number' && !isNaN(lineHeight)) {
        this.textRef.style.maxHeight = line * lineHeight + 'px';
      }
    }
  };
}

export default Ellipsis;
