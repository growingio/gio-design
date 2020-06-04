import * as React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import { DropDownProps } from 'antd/lib/dropdown';
import 'antd/lib/dropdown/style/index.css';

class Dropdown extends React.Component<DropDownProps> {
  public render() {
    return <AntdDropdown {...this.props} />;
  }
}

export default Dropdown;
