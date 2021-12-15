import React, { DOMAttributes, useContext, useEffect, useMemo } from 'react';
import { isEmpty, noop } from 'lodash';
import classNames from 'classnames';
import { RightFilled } from '@gio-design/icons';
import Popover from '../../popover';
import { CascaderItemProps, OptionProps } from '../interfance';
import BaseItem from './baseItem';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import WithRef from '../../utils/withRef';
import List from '../List';
import { convertChildrenToData, generateSelectParent, generateString } from '../util';
import { ListContext } from '../context';

const CascaderItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  CascaderItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> & { isItem?: boolean } = (
  { label, value, children, childrens = [], disabled, onClick: propsOnClick, strategy = 'fixed', ...rest },
  ref?
) => {
  const prefixCls = usePrefixCls('cascader');
  const popoverClassName = `${prefixCls}--content`;
  /** context */
  const context = useContext(ListContext);
  const { disabled: contextDisabled, selectParent, onClick: contextOnClick, setOptions } = context;
  /** end */
  const childSelectPrent = generateSelectParent(label, value, selectParent);
  const childNodeOptions = convertChildrenToData(children, {});
  const mergedOptions = useMemo(() => [...childNodeOptions, ...childrens], [childNodeOptions, childrens]);
  const mergedDisabled = disabled ?? contextDisabled;

  useEffect(() => {
    setOptions?.(mergedOptions as OptionProps[]);
  }, [mergedOptions, setOptions]);

  // list
  const prefixClsItem = `${prefixCls}--item`;

  const handleOnClick = () => {
    if (!mergedDisabled) {
      contextOnClick?.(generateString(value, selectParent));
      propsOnClick?.(generateString(value, selectParent));
    }
  };
  const content = () => {
    /** options render */
    if (!isEmpty(childrens)) {
      return (
        <ListContext.Provider
          value={{ ...context, disabled: mergedDisabled, model: 'cascader', selectParent: childSelectPrent }}
        >
          <List className={`${prefixCls}--list`}>
            {childrens?.map((child) => (
              <CascaderItem
                {...child}
                label={child?.label}
                value={child?.value}
                childrens={child?.childrens as CascaderItemProps[]}
              />
            ))}
          </List>
        </ListContext.Provider>
      );
    }

    /** JSX */
    return (
      <ListContext.Provider
        value={{ ...context, disabled: mergedDisabled, model: 'cascader', selectParent: childSelectPrent }}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children, { className: classNames(children?.props?.className, `${prefixCls}--list`) })
          : children}
      </ListContext.Provider>
    );
  };

  const PopoverRender = (element: React.ReactNode): React.ReactElement => {
    if (!isEmpty(childrens) || React.isValidElement(children)) {
      return (
        <div className={prefixClsItem}>
          <Popover
            placement="rightTop"
            overlayClassName={popoverClassName}
            // document click contains node
            getContainer={(node) => node || document.body}
            content={content()}
            strategy={strategy}
            distoryOnHide={false}
            offset={[0, 12]}
          >
            <span>{element}</span>
          </Popover>
        </div>
      );
    }

    return <>{element}</>;
  };
  const renderItem = (
    <BaseItem
      data-testid="item-base"
      {...rest}
      ref={ref}
      label={label}
      value={value}
      disabled={mergedDisabled}
      suffix={React.isValidElement(children) || !isEmpty(childrens) ? <RightFilled size="14px" /> : undefined}
      onClick={React.isValidElement(children) || !isEmpty(childrens) ? noop : handleOnClick}
    />
  );
  return PopoverRender(renderItem);
};
CascaderItem.isItem = true;
export default WithRef(CascaderItem);
