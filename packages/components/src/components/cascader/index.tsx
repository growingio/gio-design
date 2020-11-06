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
  open?: boolean;
  placeholder?: string;
  // MenuList props
  onClick?: MenuListProps['origintOnClick'];

  // dropdown props
  overlayClassName?: string;
  onVisibleChange?: DropdownProps['onVisibleChange'];
  dropdownTrigger?: DropdownProps['trigger'];
  getDropdownContainer?: DropdownProps['getTooltipContainer'];
}

const Cascader: React.FC<Props> = (props) => {
  const {
    prefixCls,
    className,
    dataSource = [],
    overlayClassName,
    trigger = 'click',
    dropdownTrigger = 'click',
    getDropdownContainer,
    placeholder,
    value,
    open,
    onClick,
    onSelect: userChange,
    onVisibleChange,
    ...others
  } = props;
  const inputRef = useRef<HTMLInputElement>();
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const { getPrefixCls } = useContext(ConfigContext);
  const wrapperCls = getPrefixCls('cascader', prefixCls);
  const mergedWrapperCls = classNames(wrapperCls, className);
  const withWrapperCls = withPrefix(wrapperCls);
  const onChange = (data: NodeData) => {
    const menuPath = data['-gioMenuPath']
      ?.filter((s) => s && s.label)
      .map((d) => d.label)
      .join('/');
    setTitle(menuPath || '');
    userChange?.(data);
  };
  let dropdownVisible = false;
  const handleVisibleChange = (v: boolean) => {
    dropdownVisible = v;
    onVisibleChange?.(v);
  };
  const afterVisibleChange = () => {
    if (dropdownVisible) {
      inputRef.current?.focus();
    }
  };

  return (
    <div className={mergedWrapperCls}>
      <Dropdown
        visible={open}
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
            trigger={trigger}
            header={<SearchBar ref={inputRef} onSearch={setKeyword} />}
            className={withWrapperCls('panel')}
            value={value}
            searchBy={keyword}
            dataSource={dataSource}
            onSelect={onChange}
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
