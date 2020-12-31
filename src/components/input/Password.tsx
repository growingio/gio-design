import React, { useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { EyeOutlined, EyeSlashOutlined } from '@gio-design/icons';
import Input from './Input';
import usePrefix from '../../utils/hooks/use-prefix-cls';
import { InputProps } from './interfaces';

const Password: React.FC<InputProps> = (props) => {
  const { disabled } = props;
  const prefixCls = usePrefix('input');
  const [visible, setVisible] = React.useState(false);

  const passwordSuffixIconCls = classnames(`${prefixCls}__suffix-icon`, {
    [`${prefixCls}__suffix-icon-disabled`]: disabled,
  });

  const toggleVisible = useCallback(() => {
    if (disabled) {
      return;
    }
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [visible, disabled]);

  const passwordSuffix = useMemo(
    () =>
      visible ? (
        <EyeOutlined className={passwordSuffixIconCls} onClick={toggleVisible} />
      ) : (
        <EyeSlashOutlined className={passwordSuffixIconCls} onClick={toggleVisible} />
      ),
    [passwordSuffixIconCls, toggleVisible, visible]
  );

  return <Input {...props} disabled={disabled} type={visible ? 'text' : 'password'} suffix={passwordSuffix} />;
};

export default Password;
