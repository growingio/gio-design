import React, { useCallback, useMemo } from 'react';
import { EyeOutlined, EyeSlashOutlined } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import Input from './Input';
import { PasswordProps } from './interface';

const Password = React.forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
  const { disabled, prefixCls: customizePrefixCls } = props;
  const prefixCls = usePrefixCls('input-new', customizePrefixCls);
  const [visible, setVisible] = React.useState(false);

  const passwordSuffixIconCls = classNames(`${prefixCls}__suffix-icon`, {
    [`${prefixCls}__suffix-icon-disabled`]: disabled,
  });

  const toggleVisible = useCallback(() => {
    if (disabled) {
      return;
    }
    setVisible(!visible);
  }, [visible, disabled]);

  const passwordSuffix = useMemo(
    () =>
      visible ? (
        <EyeSlashOutlined className={passwordSuffixIconCls} onClick={toggleVisible} />
      ) : (
        <EyeOutlined className={passwordSuffixIconCls} onClick={toggleVisible} />
      ),
    [passwordSuffixIconCls, toggleVisible, visible]
  );
  return <Input {...props} type={visible ? 'text' : 'password'} suffix={passwordSuffix} ref={ref} />;
});

export default Password;
