import * as React from 'react';
import { Radio } from 'antd';
import classnames from 'classnames';

const RGroup = Radio.Group;

export default class Group extends RGroup {
  public render() {
    const element = super.render();
    return React.cloneElement(element, {
      className: classnames(`gio-radio-group`, this.props.className, element.props.className, {
        small: this.props.size === 'small',
      }),
    });
  }
}
