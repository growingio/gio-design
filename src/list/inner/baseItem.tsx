import classNames from 'classnames';
import React, { DOMAttributes, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty, isString } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interface';
import Tooltip from '../../tooltip';
import WithRef from '../../utils/withRef';
import { ListContext } from '../context';
import { generateString, selectStatus } from '../util';

const defaultContentRender = (element: React.ReactNode | Element): React.ReactElement => element as React.ReactElement;
const renderIcon = (className: string, prefix: React.ReactNode) => <span className={className}>{prefix}</span>;
const InnerBaseItem = WithRef<HTMLLIElement, BaseItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>>(
  (props, ref?) => {
    const {
      label,
      title,
      value,
      className,
      style,
      prefix: propPrefix,
      suffix: propSuffix,
      children,
      disabled,
      disabledTooltip,
      onClick,
      contentRender = defaultContentRender,
      wrapper = defaultContentRender,
      onMouseEnter,
      onMouseLeave,
      hovered: propsHovered,
      ...rest
    } = props;
    const prefixCls = `${usePrefixCls(PREFIX)}--item`;
    const {
      model,
      value: contextValue,
      disabled: contextDisabled,
      prefix: contextPrefix,
      suffix: contextSuffix,
      onClick: contextOnClick,
      selectParent,
    } = useContext(ListContext);
    const mergedDisabled = disabled ?? contextDisabled;
    const [hovered, setHovered] = useState(false);
    const selected = useMemo(() => {
      if (model === 'cascader') {
        // 最顶级
        if (!selectParent) {
          return contextValue?.toString()?.split('.')?.[0] === value?.toString();
        }
        // 次级
        return (contextValue as string).startsWith(generateString(value, selectParent)?.toString());
      }
      if (model === 'multiple') {
        return false;
      }
      return selectStatus?.(value, contextValue);
    }, [contextValue, model, selectParent, value]);

    useEffect(
      () => () => {
        setHovered(false);
      },
      []
    );

    /** ============ prefix suffix  ================  */
    const prefix = useMemo(
      () => propPrefix ?? contextPrefix?.({ label, value, disabled, disabledTooltip }),
      [contextPrefix, disabled, disabledTooltip, label, propPrefix, value]
    );
    const suffix = useMemo(
      () => propSuffix ?? contextSuffix?.({ label, value, disabled, disabledTooltip }),
      [contextSuffix, disabled, disabledTooltip, label, propSuffix, value]
    );
    const prefixIcon = prefix ? renderIcon(`${prefixCls}-prefix-icon`, prefix) : undefined;
    const suffixIcon = suffix ? renderIcon(`${prefixCls}-suffix-icon`, suffix) : undefined;
    /** ======= end =========== */

    /** =================== events =================== */

    const handleOnClick = (event: React.MouseEvent<HTMLLIElement>) => {
      if (mergedDisabled) {
        event.stopPropagation();
        return;
      }
      /** cascader click 从上级来 */
      if (model !== 'cascader') {
        contextOnClick?.(value, event);
      }
      onClick?.(value, event);
    };
    const content = children ?? label;

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
    const renderElement = (
      <Tooltip
        disabled={!mergedDisabled || isEmpty(disabledTooltip)}
        strategy="fixed"
        title={disabledTooltip}
        getContainer={() => document.body}
      >
        <li
          data-testid="item-base"
          style={style}
          onMouseEnter={(e) => {
            setHovered(true);
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            setHovered(false);
            onMouseLeave?.(e);
          }}
          className={classNames(
            className,
            prefixCls,
            {
              [`${prefixCls}--disabled`]: mergedDisabled,
              [`${prefixCls}--actived`]: selected,
              [`${prefixCls}--hovered`]: !mergedDisabled ? propsHovered || hovered : false,
            },
            className
          )}
          key={value}
          aria-hidden="true"
          ref={ref}
          onClick={handleOnClick}
          title={title || (!disabled && isString(content) && content) || undefined}
          {...rest}
        >
          {contentRender?.(contentElement)}
        </li>
      </Tooltip>
    );

    return wrapper(renderElement) as ReactElement;
  }
);
const BaseItem: React.ForwardRefExoticComponent<
  BaseItemProps & Omit<React.RefAttributes<HTMLLIElement>, 'onClick' | 'onChange' | 'onMouseEnter' | 'onMouseLeave'>
> & {
  isItem?: boolean;
} = InnerBaseItem;
BaseItem.isItem = true;
export default BaseItem;
