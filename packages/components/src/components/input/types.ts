import * as React from 'react';

export interface InputProps {
    value: string;
    type?: 'password' | 'textarea' | 'hidden' | 'text';
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    maxLength?: number;
    allowClear?: boolean;
    errorMsg?: string;
    label?: string;
    showExpand?: boolean;
    placeholder?: string;
    inputStyle?: React.CSSProperties;
    [key: string]: any;
}