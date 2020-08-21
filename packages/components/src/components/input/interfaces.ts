import * as React from 'react';

export interface InputProps {
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

export type InputNumberProps = Pick<InputProps, 'onPressEnter' | 'disabled' | 'placeholder' | 'inputStyle'> & {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  min?: number;
  [key: string]: any;
};

export type TextAreaProps = Pick<InputProps, 'value' | 'disabled' | 'maxLength' | 'placeholder' | 'inputStyle' | 'wrapStyle'> & {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  resize?: boolean;
  [key: string]: any;
};
