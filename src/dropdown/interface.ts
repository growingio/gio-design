import { PopoverProps } from '../popover';

interface DropdownProps extends Omit<PopoverProps, 'children'> {
  children: React.ReactElement;
}

export default DropdownProps;
