import Input from './Input';
import InputButton from './InputButton';
import InputNumber from './InputNumber';
import Password from './Password';
import TextArea from './TextArea';

Input.InputNumber = InputNumber;
Input.Password = Password;
Input.TextArea = TextArea;
Input.Button = InputButton;

export * from './interface';

export default Input;
