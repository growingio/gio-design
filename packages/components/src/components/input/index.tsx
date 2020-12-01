import Input from './Input';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';

Input.InputNumber = InputNumber;
Input.Password = Password;
Input.TextArea = TextArea;

export { InputProps, InputNumberProps, TextAreaProps } from './interfaces';
export default Input;
