import React, { useMemo } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { TextAreaProps } from './interface';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, disabled, rows = 2, style, className, ...rest } = props;

  const inputPrefixCls = usePrefixCls('input', customizePrefixCls);
  const prefixCls = usePrefixCls('textarea');

  const textAreaClass = useMemo(
    () =>
      classNames(inputPrefixCls, prefixCls, className, {
        [`${prefixCls}__disabled`]: disabled,
      }),
    [inputPrefixCls, prefixCls, disabled, className]
  );

  const styles = useMemo(() => {
    const resize = disabled ? 'none' : style?.resize || 'none';
    return {
      ...(style || {}),
      resize,
    };
  }, [style, disabled]);

  return (
    <textarea
      data-testid="input-textarea"
      {...rest}
      disabled={disabled}
      className={textAreaClass}
      rows={rows}
      style={styles}
      ref={ref}
    />
  );
});

export default TextArea;
