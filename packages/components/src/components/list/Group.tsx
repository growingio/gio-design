import React from 'react';
import { noop } from 'lodash';
import { GroupProps } from './interface';
import { withConfigConsumer, ConfigConsumerProps } from '../config-provider';

class Group extends React.PureComponent<GroupProps & ConfigConsumerProps> {
  public static defaultProps = {
    onSelect: noop,
    style: {},
  };

  private handleSelect = () => {
    const { onSelect, onClick, option } = this.props;
    onSelect && onSelect(option);
    onClick && onClick(option);
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
      prefixCls,
    } = this.props;

    return (
      <div
        className={`${prefixCls}-option group`}
        style={{ ...style, color: '#1248E9' }}
        onClick={this.handleSelect}
        aria-hidden="true"
      >
        {icon}
        {labelRenderer ? labelRenderer(option, true) : name}
      </div>
    );
  }
}

export default withConfigConsumer<GroupProps>({ subPrefixCls: 'select' })(Group);
