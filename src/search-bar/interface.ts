import { InputProps } from '../input/interface';

export interface SearchBarProps extends InputProps {
  onSearch?: (value: string) => void;
}
