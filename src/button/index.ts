import WithSubComponent from '../utils/withSubComponent';
import InternalButton from './Button';
import IconButton from './IconButton';

const Button = WithSubComponent(InternalButton, { IconButton });

export type { ButtonProps, IconButtonProps, ButtonType } from './interface';
export { Button, IconButton };

export default Button;
