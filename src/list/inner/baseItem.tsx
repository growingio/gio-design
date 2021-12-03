import classNames from 'classnames';
import React, { DOMAttributes, ReactElement, useContext, useMemo } from 'react';
import { isEmpty, isString } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interfance';
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
    const selected = useMemo(() => {
      if (model === 'cascader') {
        return (contextValue as string)?.startsWith(generateString(value, selectParent)?.toString());
      }
      return selectStatus?.(value, contextValue);
    }, [contextValue, model, selectParent, value]);
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

    const handleOnClick = () => {
      if (!mergedDisabled) {
        /** cascader click 从上级来 */
        if (model !== 'cascader') {
          contextOnClick?.(value);
        }
        onClick?.(value);
      }
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
      <Tooltip disabled={!mergedDisabled || isEmpty(disabledTooltip)} strategy="fixed" title={disabledTooltip}>
        <li
          style={style}
          className={classNames(
            className,
            prefixCls,
            {
              [`${prefixCls}--disabled`]: mergedDisabled,
              [`${prefixCls}--actived`]: selected,
            },
            className
          )}
          key={value}
          aria-hidden="true"
          ref={ref}
          onClick={handleOnClick}
        >
          {contentRender?.(contentElement)}
        </li>
      </Tooltip>
    );

    return wrapper(renderElement) as ReactElement;
  }
);
const BaseItem: React.ForwardRefExoticComponent<
  BaseItemProps & Omit<React.RefAttributes<HTMLLIElement>, 'onClick' | 'onChange'>
> & {
  isBaseItem?: boolean;
} = InnerBaseItem;
BaseItem.isBaseItem = true;
export default BaseItem;
