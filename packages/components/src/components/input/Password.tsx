import * as React from 'react';
import Input, { prefixCls } from './Input';
import { ViewOutlined, UnviewOutlined } from '@gio-design/icons';
import { InputProps } from './interfaces';

const Password: React.FC<InputProps> = (props) => {
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
