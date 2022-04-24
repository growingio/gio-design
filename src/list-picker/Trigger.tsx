import React, { useContext, useMemo } from 'react';
import Input from '../input';
import { ListContext } from '../list/context';
import { collectOptions } from '../list/util';
import WithRef from '../utils/withRef';
import { TriggerProps } from './interface';

const Trigger: React.ForwardRefRenderFunction<HTMLInputElement, TriggerProps> = (props, ref) => {
  const {
    value,
    title,
    placeholder,
    onClear,
    children,
    hidePrefix = false,
    prefix: propPrefix,
    suffix: propSuffix,
    visible,
    separator = '',
    valueSeparator = '.',
    model = 'single',
    ...rest
  } = props;
  const { options, setOptions, getOptionByValue, getLabelByValue } = useContext(ListContext);
  setOptions?.(collectOptions(children));

  const handleClear = (e: React.MouseEvent<Element, MouseEvent>) => {
    onClear?.(e);
    e.stopPropagation();
  };

  const prefix = useMemo(() => {
    if (!hidePrefix) {
      return propPrefix ?? getOptionByValue?.(value as string)?.prefix;
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options?.size, hidePrefix, propPrefix, value]);

  const suffix = useMemo(
    () => propSuffix ?? getOptionByValue?.(value as string)?.suffix,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options?.size, hidePrefix, propSuffix, value]
  );
  return (
    <Input.Button
      ref={ref}
      data-testid="list-picker-trigger"
      prefix={prefix}
      suffix={suffix}
      active={visible}
      placeholder={placeholder}
      value={title ?? getLabelByValue?.(value as React.ReactText, separator, valueSeparator, model)}
      onClear={handleClear}
      {...rest}
    />
  );
};

export default WithRef(Trigger);
