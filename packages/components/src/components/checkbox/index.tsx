import * as React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import cn from 'classnames';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import 'antd/lib/checkbox/style/index.css';
import './style.less';

export interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onChange?: (event: CheckboxChangeEvent) => void;
  disabled?: boolean;
  value?: any;
  indeterminate?: boolean;
}

const Checkbox: React.SFC<CheckboxProps> = ({ className, ...props }) => (
  <AntCheckbox className={cn(className, 'gio-checkbox')} {...props} />
);

Checkbox.defaultProps = {};

export const Group = AntCheckbox.Group;
export default Checkbox;
