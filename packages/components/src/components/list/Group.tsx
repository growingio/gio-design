import React from 'react';
import { noop } from 'lodash';
import { GroupProps } from './interface';

export default class Group extends React.PureComponent<GroupProps> {

  static defaultProps = {
    onSelect: noop,
    style: {},
  };

  private handleSelect = () => {
    const { onSelect,  option} = this.props;
    onSelect && onSelect(option);
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
      <div className="gio-select-option group" style={{ ...style, color: '#1248E9' }} onClick={this.handleSelect} aria-hidden="true">
        {icon}
        {labelRenderer ? labelRenderer(option, true) : name}
      </div>
    );
  }
}

