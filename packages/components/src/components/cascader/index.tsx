import { DownFilled } from '@gio-design/icons';
import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { DropdownProps } from '../dropdown/interface';
import { NodeData } from './menu-item';
import { SizeType } from '../config-provider/SizeContext';
import { dataKeyMapping, useDynamicData, withPrefix } from './helper';
import Dropdown from '../dropdown';
import Input from '../input';
import Menu, { Props as MenuProps } from './menu';
import SearchBar from './search-bar';

export interface Props extends MenuProps {
  prefixCls?: string;
  size?: SizeType;
  disabled?: boolean;
  title?: string;
  separator?: string;
  placeholder?: string;
  input?: React.ReactElement;
  // search-bar
  searchPlaceholder?: string;
  lazySearch?: boolean;
  onSearch?: (keyword: string) => void;

  // dropdown props
  visible?: boolean;
  placement?: DropdownProps['placement'];
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  onVisibleChange?: DropdownProps['onVisibleChange'];
  dropdownTrigger?: DropdownProps['trigger'];
  getDropdownContainer?: DropdownProps['getTooltipContainer'];
}

const Cascader: React.FC<Props> = (props) => {
  const {
    prefixCls,
    className,
    placeholder = '请选择',
    searchPlaceholder,
    input,
    size,
    disabled,
    open,
    title: originTitle = '',
    separator = '/',
    lazySearch,
    keyword: originKeyword,
    overlayClassName,
    dataSource = [],
    trigger = 'hover',
    dropdownTrigger = 'click',
    placement = 'bottomLeft',
    getDropdownContainer,
    value,
    keyMapping = {},
    visible,
    onClick,
    onSearch,
    onTrigger: userOnTrigger,
    onSelect: userChange,
    onVisibleChange,
    style,
    overlayStyle,
    ...others
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useDynamicData(value);
  const [title, setTitle] = useDynamicData(originTitle);
  const [keyword, setKeyword] = useDynamicData(originKeyword);
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [dropdownVisible, setDropdownVisible] = useDynamicData(visible);
  const wrapperCls = usePrefixCls('cascader', prefixCls);
  const mergedWrapperCls = classNames(wrapperCls, className);
  const withWrapperCls = withPrefix(wrapperCls);
  const onSelect = (data: NodeData, parents = [] as NodeData[]) => {
    const { label: mapLabel, value: mapValue } = dataKeyMapping(data, keyMapping);
    const titles = parents.reduce((acc, b) => {
      return [dataKeyMapping(b, keyMapping).label, acc].join(separator);
    }, mapLabel);

    setTitle(titles || '');
    setSelected(mapValue);
    userChange?.(data, parents);
    setTimeout(() => {
      // 1. 可以让用户看到选中操作的效果
      // 2. 可以防止 unmount 后 setState
      setDropdownVisible(false);
    }, 80);
  };
  const handleVisibleChange = (v: boolean) => {
    setDropdownVisible(v);
    onVisibleChange?.(v);
    setCanOpen(false);
  };
  const handleTrigger: MenuProps['onTrigger'] = (event, nodeData) => {
    userOnTrigger?.(event, nodeData);
    setCanOpen(true);
  };
  const handleSearch = (kw: string) => {
    onSearch?.(kw);
    setKeyword(kw);
    setCanOpen(false);
  };
  const {
    header = (
      <SearchBar
        size={size}
        ref={inputRef}
        value={keyword}
        onSearch={handleSearch}
        lazySearch={lazySearch}
        placeholder={searchPlaceholder}
      />
    ),
  } = props;

  useEffect(() => {
    if (dropdownVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [dropdownVisible]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.classList.contains(`${wrapperCls}-dropdown`)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('click', handler);

    return () => document.removeEventListener('click', handler);
  }, [setDropdownVisible, wrapperCls]);

  return (
    <div className={mergedWrapperCls} style={style}>
      <Dropdown
        prefixCls={prefixCls}
        disabled={disabled}
        visible={visible === undefined ? dropdownVisible : dropdownVisible && visible}
        placement={placement}
        getTooltipContainer={getDropdownContainer}
        overlayClassName={classNames(withWrapperCls('dropdown'), overlayClassName)}
        trigger={dropdownTrigger}
        onVisibleChange={handleVisibleChange}
        overlayStyle={overlayStyle}
        overlay={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <div className={classNames(className, withWrapperCls('panel'), 'cascader-menu-list')}>
            <Menu
              {...others}
              onClick={onClick}
              open={canOpen}
              trigger={trigger}
              header={header}
              value={selected}
              keyword={keyword}
              dataSource={dataSource}
              onTrigger={handleTrigger}
              onSelect={onSelect}
              keyMapping={keyMapping}
            />
          </div>
        }
      >
        <div className={withWrapperCls('title')}>
          {React.isValidElement(input) ? (
            input
          ) : (
            <Input
              readOnly
              size={size}
              disabled={disabled}
              placeholder={placeholder}
              value={title}
              suffix={<DownFilled size="1em" className={classNames('icon-down', dropdownVisible && 'open')} />}
            />
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default Cascader;
