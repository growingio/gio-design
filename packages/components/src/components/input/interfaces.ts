import * as React from 'react';

export interface InputProps {
  value: string;
  type?: string;
  onChange: (value: string) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  placeholder?: string;
  inputStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  size?: 'large' | 'medium' | 'small';
  suffix?: React.ReactNode;
  [key: string]: any;
}

export interface InputNumberProps extends InputProps {
  max?: number;
  min?: number;
}

export type TextAreaProps = Pick<
  InputProps,
  'value' | 'disabled' | 'maxLength' | 'placeholder' | 'inputStyle' | 'wrapStyle'
> & {
  onChange: (value: string) => void;
  resize?: boolean;
  [key: string]: any;
};
