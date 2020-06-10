import { Radio } from 'antd';
import { assign } from 'lodash';
import RButton from './Button';
import RGroup from './Group';

assign(Radio, {
  Button: RButton,
  Group: RGroup,
});

export const Button = Radio.Button;
export const Group = Radio.Group;

export default Radio;
