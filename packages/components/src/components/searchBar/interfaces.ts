export interface SearchBarProps {
  showStorage?: boolean;
  storageNum?: number;
  allowClearStorage?: boolean;
  showClear?: boolean;
  disabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  inputStyle?: React.CSSProperties;
  inputWrapStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;

  value: string;
  onChange: (value: string) => void;
  id: string;
}
