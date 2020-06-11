import * as React from 'react';
import { Switch } from 'antd';

export interface SwitchProps {
  size?: 'default' | 'small';
  checked?: boolean;
  checkedChildren?: string | React.ReactNode;
  unCheckedChildren?: string | React.ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (checked: boolean) => void;
}

class GIOSwitch extends React.PureComponent<SwitchProps, {}> {
  public static defaultProps = {
    size: 'default',
    defaultChecked: false,
    disabled: false,
    loading: false,
  };

  public constructor(props: SwitchProps) {
    super(props);
  }

  public render() {
    return <Switch {...this.props} />;
  }
}

export default GIOSwitch;
