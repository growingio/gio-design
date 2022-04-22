import React, { DOMAttributes, useContext, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import classNames from 'classnames';
import { RightFilled } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import Popover from '../../popover';
import { CascaderItemProps, OptionProps, BaseItemProps } from '../interface';
import BaseItem from './baseItem';
import WithRef from '../../utils/withRef';
import List from '../List';
import { convertChildrenToData, generateSelectParent, generateString } from '../util';
import { ListContext } from '../context';
import TriggerContext from '../../popover/context';

const CascaderItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  CascaderItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> & { isItem?: boolean } = (
  { label, value, children, items: childrens = [], disabled, onClick: propsOnClick, strategy = 'fixed', ...rest },
  ref?
) => {
  const prefixCls = usePrefixCls('cascader');
  const popoverClassName = `${prefixCls}--content`;
  const [hovered, setHovered] = useState(false);

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
                items={child?.items as CascaderItemProps[]}
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

  const renderItem = (
    <TriggerContext.Provider value={popoverContext}>
      <Popover
        placement="rightTop"
        onVisibleChange={(v) => setHovered(v)}
        overlayClassName={popoverClassName}
        // document click contains node
        getContainer={(node) => node || document.body}
        content={content()}
        strategy={strategy}
        // distoryOnHide
        delay={200}
        offset={[0, 12]}
      >
        <BaseItem
          data-testid="item-base"
          {...rest}
          className={classNames(prefixClsItem, rest?.className)}
          ref={ref}
          label={label}
          value={value}
          disabled={mergedDisabled}
          hovered={hovered}
          suffix={React.isValidElement(children) || !isEmpty(childrens) ? <RightFilled size="14px" /> : undefined}
          onClick={
            React.isValidElement(children) || !isEmpty(childrens)
              ? (itemValue, event) => propsOnClick?.(itemValue, event)
              : handleOnClick
          }
        />
      </Popover>
    </TriggerContext.Provider>
  );
  return renderItem;
};
CascaderItem.isItem = true;
export default WithRef(CascaderItem);
