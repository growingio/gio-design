import * as React from 'react';

export interface BaseInputProps {
    showOpt?: boolean
    errorMsg?: string
    label?: string
    wrapStyle?: React.CSSProperties
    onOk?: () => void
    onCancel?: () => void
}

export interface InputProps extends BaseInputProps {
    value: string;
    type?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    maxLength?: number;
    placeholder?: string;
    inputStyle?: React.CSSProperties;
    [key: string]: any;
}

export type InputNumberProps = Pick<InputProps, 'onPressEnter' | 'disabled' | 'placeholder' | 'inputStyle'> & BaseInputProps & {
    value: number;
    onChange: (value: number) => void;
    max?: number;
    min?: number;
    [key: string]: any;
}

export type TextAreaProps = Pick<InputProps, 'value' | 'disabled' | 'maxLength' | 'placeholder' | 'inputStyle'> & BaseInputProps & {
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    [key: string]: any;
}