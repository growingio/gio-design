import classNames from 'classnames';
import React, { DOMAttributes } from 'react';
import { isEmpty, isString, noop } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interfance';
import Tooltip from '../../tooltip';
import WithRef from '../../utils/withRef';

const defaultContentRender = (element: React.ReactNode | Element) => element;
const renderIcon = (className: string, prefix: React.ReactNode) => <span className={className}>{prefix}</span>;
const BaseItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  BaseItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> = (props, ref?) => {
  const {
    label,
    value,
    className,
    style,
    prefix,
    suffix,
    children,
    disabled,
    selected,
    disabledTooltip,
    onClick,
    contentRender = defaultContentRender,
  } = props;

  const prefixCls = `${usePrefixCls(PREFIX)}--item`;

  const content = children ?? label;
  const prefixIcon = prefix ? renderIcon(`${prefixCls}-prefix-icon`, prefix) : undefined;
  const suffixIcon = suffix ? renderIcon(`${prefixCls}-suffix-icon`, suffix) : undefined;

  const contentElement = isString(content) ? (
    <>
      {prefixIcon}
      <span className={classNames(`${prefixCls}--text`, `${prefixCls}--ellipsis`)} title={content?.toString()}>
        {content}
      </span>
      {suffixIcon}
    </>
  ) : (
    <>{content}</>
  );
  return (
    <Tooltip
      disabled={!disabled || isEmpty(disabledTooltip)}
      strategy="fixed"
      title={disabledTooltip}
      getContainer={() => document.body}
    >
      <li
        style={style}
        className={classNames(
          className,
          prefixCls,
          {
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--actived`]: selected,
          },
          className
        )}
        key={value}
        aria-hidden="true"
        ref={ref}
        onClick={() => (!disabled ? onClick?.(value) : noop)}
      >
        {contentRender?.(contentElement)}
      </li>
    </Tooltip>
  );
};

export default WithRef(BaseItem);
