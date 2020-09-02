import React from 'react';
import { noop } from 'lodash';
import { GroupProps } from './interface';

export default class Group extends React.PureComponent<GroupProps> {
  public static defaultProps = {
    onSelect: noop,
    style: {},
  };

  public render() {
    const {
      name,
      icon,
      style,
      // isMultiple,
      // showGroupCheckBox = false,
      // isSelected,
      // indeterminate,
      option,
      labelRenderer,
    } = this.props;

    return (
      <div className="gio-select-option group" style={{ ...style, color: '#1248E9' }} onClick={this.handleSelect}>
        {icon}
        {labelRenderer ? labelRenderer(option, true) : name}
      </div>
    );
  }

  private handleSelect = () => {
    this.props.onSelect && this.props.onSelect(this.props.option);
  };
}
