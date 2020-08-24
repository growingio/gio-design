import * as React from 'react';
import Input from './Input';
import { View, Unview } from '@gio-design/icons';
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

  const renderSuffix = () => (visible ? <View onClick={toggleVisible} /> : <Unview onClick={toggleVisible} />);

  return <Input {...props} type={visible ? 'text' : 'password'} suffix={renderSuffix()} />;
};

export default Password;
