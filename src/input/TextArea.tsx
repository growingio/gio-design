import React, { useMemo } from 'react';
import classNames from 'classnames';
import { TextAreaProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { prefixCls: customizePrefixCls, disabled, rows = 2, style, ...rest } = props;

  const inputPrefixCls = usePrefixCls('input-new', customizePrefixCls);
  const prefixCls = usePrefixCls('textarea-new');

  const textAreaClass = useMemo(
    () =>
      classNames(inputPrefixCls, prefixCls, {
        [`${prefixCls}__disabled`]: disabled,
      }),
    [inputPrefixCls, prefixCls, disabled]
  );

  const styles = useMemo(() => {
    const resize = disabled ? 'none' : style?.resize || 'none';
    return {
      ...(style || {}),
      resize,
    };
  }, [style, disabled]);

  return <textarea {...rest} disabled={disabled} className={textAreaClass} rows={rows} style={styles} ref={ref} />;
});

export default TextArea;
