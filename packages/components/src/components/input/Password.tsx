import * as React from 'react';
import { ViewOutlined, UnviewOutlined } from '@gio-design/icons';
import Input from './Input';
import usePrefix from '../../utils/hooks/use-prefix-cls';
import { InputProps } from './interfaces';

const Password: React.FC<InputProps> = (props) => {
  const prefixCls = usePrefix('input');
  const [visible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const renderSuffix = () =>
    visible ? (
      <ViewOutlined className={`${prefixCls}-container-suffix-icon`} onClick={toggleVisible} />
    ) : (
      <UnviewOutlined className={`${prefixCls}-container-suffix-icon`} onClick={toggleVisible} />
    );

  return <Input {...props} type={visible ? 'text' : 'password'} suffix={renderSuffix()} />;
};

export default Password;
