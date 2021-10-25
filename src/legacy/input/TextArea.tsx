import React, { useMemo } from 'react';
import { TextAreaProps } from './interface';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import classNames from 'classnames';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { prefix, disabled, placeholder = '请输入...', rows = 2, style = {}, ...rest } = props;

  const inputPrefixCls = usePrefixCls('input');
  const prefixCls = usePrefixCls('textArea');

  const textAreaClass = useMemo(
    () =>
      classNames(inputPrefixCls, prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
      }),
    [inputPrefixCls, prefixCls, disabled]
  );

  return (
    <textarea
      {...rest}
      disabled={disabled}
      className={textAreaClass}
      placeholder={placeholder}
      rows={rows}
      style={{ ...style, resize: disabled ? 'none' : 'vertical' }}
      ref={ref}
    />
  );
});

export default TextArea;
