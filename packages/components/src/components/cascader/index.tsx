import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { DropdownProps } from '../dropdown/interface';
import { NodeData } from './menu-item';
import { SizeType } from '../config-provider/SizeContext';
import { withPrefix } from './helper';
import Dropdown from '../dropdown';
import Input from '../input';
import MenuOverlayer, { Props as MenuListProps } from './menu-overlayer';
import SearchBar from './search-bar';

export interface Props extends Omit<MenuListProps, 'depth' | 'onClick' | 'origintOnClick'> {
  prefixCls?: string;
  size?: SizeType;
  disable?: boolean;
  placeholder?: string;
  separator?: string;
  // MenuList props
  onClick?: MenuListProps['origintOnClick'];
  input?: React.ReactElement;

  // dropdown props
  visible?: boolean;
  placement?: DropdownProps['placement'];
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
    input,
    separator = '/',
    overlayClassName,
    dataSource = [],
    trigger = 'click',
    dropdownTrigger = 'click',
    placement = 'bottomLeft',
    header,
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
  const [dropdownVisible, setDropdownVisible] = useState(false);
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
    setTimeout(() => {
      // 1. 可以让用户看到选中操作的效果
      // 2. 可以防止 unmount 后 setState
      setDropdownVisible(false);
    }, 120);
  };
  const handleVisibleChange = (v: boolean) => {
    setDropdownVisible(v);
    onVisibleChange?.(v);
    setCanOpen(false);
  };
  const handleTrigger: MenuListProps['onTrigger'] = (nodeData, event) => {
    userOnTrigger?.(nodeData, event);
    setCanOpen(true);
  };
  useEffect(() => {
    if (dropdownVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [dropdownVisible]);

  return (
    <div className={mergedWrapperCls}>
      <Dropdown
        visible={visible === undefined ? dropdownVisible : dropdownVisible && visible}
        placement={placement}
        getTooltipContainer={getDropdownContainer}
        overlayClassName={classNames(withWrapperCls('dropdown'), overlayClassName)}
        trigger={dropdownTrigger}
        onVisibleChange={handleVisibleChange}
        overlayInnerStyle={{ marginTop: -8 }}
        overlay={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <MenuOverlayer
            {...others}
            origintOnClick={onClick}
            open={canOpen}
            trigger={trigger}
            header={header === false ? false : <SearchBar ref={inputRef} onSearch={setKeyword} />}
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
          {React.isValidElement(input) ? { input } : <Input readOnly placeholder={placeholder} value={title} />}
        </div>
      </Dropdown>
    </div>
  );
};

export default Cascader;
