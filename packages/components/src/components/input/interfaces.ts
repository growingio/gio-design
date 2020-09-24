import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  size?: 'large' | 'medium' | 'small';
  suffix?: React.ReactNode;
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
  inputStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  forwardRef?:
    | React.RefObject<HTMLTextAreaElement>
    | React.MutableRefObject<HTMLTextAreaElement>
    | React.LegacyRef<HTMLTextAreaElement>;
}
