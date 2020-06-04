import * as React from 'react';

export interface GapProps {
  width?: number | string;
  height?: number | string;
  float?: 'left' | 'right';
}

export default class Gap extends React.Component<GapProps, {}> {
  public static defaultProps = {
    width: 0,
    height: 0,
  };

  public constructor(props: GapProps) {
    super(props);
  }

  public render() {
    let height = this.props.height;
    const width = `${this.props.width}${typeof this.props.width === 'number' ? 'px' : ''}`;

    if (this.props.float && !height) {
      height = 1;
    }

    height = `${height}${typeof height === 'number' ? 'px' : ''}`;

    return this.props.height ? (
      <div className='gio-gap' style={{ height }} />
    ) : (
      <span className='gio-gap' style={{ display: 'inline-block', width, height, float: this.props.float }} />
    );
  }
}
