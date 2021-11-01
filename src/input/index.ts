import WithSubComponent from '../utils/withSubComponent';

import Input from './Input';
import InputButton from './InputButton';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';

export { InputProps, InputButtonProps, PasswordProps, TextAreaProps, InputNumberProps } from './interface';

export { InputButton, InputNumber, TextArea, Password };

export default WithSubComponent(Input, { InputNumber, Password, TextArea, Button: InputButton });
