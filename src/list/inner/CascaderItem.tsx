import React, { DOMAttributes, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
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
import { BaseItemProps } from '..';
import TriggerContext from '../../popover/context';

const CascaderItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  CascaderItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> & { isItem?: boolean } = (
  { label, value, children, childrens = [], disabled, onClick: propsOnClick, strategy = 'fixed', offset = [0, 12], ...rest },
  ref?
) => {
  const prefixCls = usePrefixCls('cascader');
  const popoverClassName = `${prefixCls}--content`;
  const [hovered,setHovered] = useState(false);

  /** context */
  const context = useContext(ListContext);
  const popoverContext = useContext(TriggerContext);
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

  const handleOnClick: BaseItemProps['onClick'] = (_, event) => {
    if (!mergedDisabled) {
      contextOnClick?.(generateString(value, selectParent), event);
      propsOnClick?.(generateString(value, selectParent), event);
    }
  };
  const content = () => {
    /** options render */
    if (!isEmpty(childrens)) {
      return (
        <ListContext.Provider
          value={{
            ...context,
            isEmpty: false,
            disabled: mergedDisabled,
            model: 'cascader',
            selectParent: childSelectPrent,
          }}
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
        value={{
          ...context,
          isEmpty: false,
          disabled: mergedDisabled,
          model: 'cascader',
          selectParent: childSelectPrent,
        }}
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
          <TriggerContext.Provider value={popoverContext}>
            <Popover
                placement="rightTop"
                onVisibleChange={(v) => setHovered(v)}
                overlayClassName={popoverClassName}
                // document click contains node
                getContainer={() => document.body}
                content={content()}
                strategy={strategy}
                distoryOnHide
                delay={200}
                offset={offset}
              >
                {element}
              </Popover>
          </TriggerContext.Provider>
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
      hovered={hovered}
      onClick={
        React.isValidElement(children) || !isEmpty(childrens)
          ? (itemValue, event) => propsOnClick?.(itemValue, event)
          : handleOnClick
      }
    />
  );
  return PopoverRender(renderItem);
};
CascaderItem.isItem = true;
export default WithRef(CascaderItem);
