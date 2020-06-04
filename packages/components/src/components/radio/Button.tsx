import * as React from 'react';
import { Radio } from 'antd';
import classnames from 'classnames';

const RButton = Radio.Button;

export default class Button extends RButton {
  public render() {
    const element = super.render();
    return React.cloneElement(element, {
      className: classnames(`gio-radio-button`, this.props.className, element.props.className),
    });
  }
}
