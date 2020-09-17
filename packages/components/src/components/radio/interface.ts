import { Props as RCCheckboxProps } from 'rc-checkbox';

export interface IRadioProps extends Omit<RCCheckboxProps, 'onChange'> {
  defaultChecked?: boolean;
  checked?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
  onChange?: (e: IRadioChangeEvent) => void;
}

export interface TRadioGroupOption {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface IRadioGroupProps {
  className?: string;
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
  defaultValue?: any;
  value?: any;
  onChange?: IRadioProps['onChange'];
  name?: string;
  options?: Array<TRadioGroupOption | string>;
  children?: React.ReactNode;
}

export interface IRadioGroupContext extends Pick<TRadioGroupOption, 'value' | 'disabled'> {
  name?: string;
  onChange: (e: IRadioChangeEvent) => void;
}

export interface IRadioChangeEventTarget extends EventTarget {
  value?: any;
}

export interface IRadioChangeEvent extends Event {
  target: IRadioChangeEventTarget;
}
