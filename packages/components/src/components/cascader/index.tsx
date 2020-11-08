import React, { useContext, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { DropdownProps } from '../dropdown/interface';
import { NodeData } from './menu-item';
import { SizeType } from '../config-provider/SizeContext';
import { withPrefix } from './helper';
import Dropdown from '../dropdown';
import MenuList, { Props as MenuListProps } from './menu-list';
import SearchBar from './search-bar';

export interface Props extends Omit<MenuListProps, 'onClick' | 'origintOnClick'> {
  prefixCls?: string;
  size?: SizeType;
  disable?: boolean;
  placeholder?: string;
  separator?: string;
  // MenuList props
  onClick?: MenuListProps['origintOnClick'];

  // dropdown props
  visible?: boolean;
  overlayClassName?: string;
  onVisibleChange?: DropdownProps['onVisibleChange'];
  dropdownTrigger?: DropdownProps['trigger'];
  getDropdownContainer?: DropdownProps['getTooltipContainer'];
}

const Cascader: React.FC<Props> = (props) => {
  const {
    prefixCls,
    className,
    placeholder,
    separator = '/',
    overlayClassName,
    dataSource = [],
    trigger = 'click',
    dropdownTrigger = 'click',
    getDropdownContainer,
    open,
    value,
    visible,
    onClick,
    onTrigger: userOnTrigger,
    onSelect: userChange,
    onVisibleChange,
    ...others
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [canOpen, setCanOpen] = useState(open);
  const [selected, setSelected] = useState(value);
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const { getPrefixCls } = useContext(ConfigContext);
  const wrapperCls = getPrefixCls('cascader', prefixCls);
  const mergedWrapperCls = classNames(wrapperCls, className);
  const withWrapperCls = withPrefix(wrapperCls);
  const onSelect = (data: NodeData, parents: NodeData[]) => {
    const titles = parents.reduce((acc, b) => {
      return [b.label, acc].join(separator);
    }, data.label);

    setTitle(titles);
    setSelected(data.value);
    userChange?.(data, parents);
  };
  let dropdownVisible = false;
  const handleVisibleChange = (v: boolean) => {
    dropdownVisible = v;
    onVisibleChange?.(v);
    setCanOpen(false);
  };
  const afterVisibleChange = () => {
    if (dropdownVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };
  const handleTrigger: MenuListProps['onTrigger'] = (nodeData, event) => {
    userOnTrigger?.(nodeData, event);
    setCanOpen(true);
  };

  return (
    <div className={mergedWrapperCls}>
      <Dropdown
        visible={visible}
        placement="bottomLeft"
        getTooltipContainer={getDropdownContainer}
        overlayClassName={classNames(withWrapperCls('dropdown'), overlayClassName)}
        trigger={dropdownTrigger}
        onVisibleChange={handleVisibleChange}
        afterVisibleChange={afterVisibleChange}
        overlay={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <MenuList
            {...others}
            origintOnClick={onClick}
            open={canOpen}
            trigger={trigger}
            header={<SearchBar ref={inputRef} onSearch={setKeyword} />}
            className={withWrapperCls('panel')}
            value={selected}
            searchBy={keyword}
            dataSource={dataSource}
            onTrigger={handleTrigger}
            onSelect={onSelect}
          />
        }
      >
        <div className={withWrapperCls('title')}>
          <input
            readOnly
            className={withWrapperCls('title-inner')}
            type="text"
            placeholder={placeholder}
            value={title}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default Cascader;
