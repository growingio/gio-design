import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  size?: 'large' | 'middle' | 'small';
  prefix?: React.ReactNode;
  prefixWidth?: number;
  suffix?: React.ReactNode;
  suffixWidth?: number;
  forwardRef?:
    | React.RefObject<HTMLInputElement>
    | React.MutableRefObject<HTMLInputElement>
    | React.LegacyRef<HTMLInputElement>;
}

export interface InputNumberProps extends Omit<InputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  resize?: boolean;
  autosize?: boolean;
  style?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}
