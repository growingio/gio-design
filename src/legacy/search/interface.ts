import { InputProps } from '../input/interface';

export interface SearchProps extends InputProps {
  onSearch?: (value: string) => void;
}
