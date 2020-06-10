import * as React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';

class Dropdown extends React.Component<DropDownProps> {
  public render() {
    return <AntdDropdown {...this.props} />;
  }
}

export default Dropdown;
