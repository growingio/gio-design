import WithSubComponent from '../utils/withSubComponent';
import Button from './Button';
import IconButton from './IconButton';

export type { ButtonProps, ButtonType, IconButtonProps } from './interface';
export { IconButton };

export default WithSubComponent(Button, { IconButton });
