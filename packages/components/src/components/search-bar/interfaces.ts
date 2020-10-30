export interface SearchBarProps {
  showStorage?: boolean;
  storageNum?: number;
  allowClearStorage?: boolean;
  showClear?: boolean;
  disabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  inputWrapStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  id: string;
}
