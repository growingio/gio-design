import { DownFilled } from '@gio-design/icons';
import React, { useEffect, useRef, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { usePrefixCls, useLocale, useControlledState } from '@gio-design/utils';
import { Props, CascaderInstance } from './interface';
import { dataKeyMapping, getTitleBySelected, mergeKeyMapping, useDynamicData, withPrefix } from './helper';
import Dropdown from '../dropdown';
import Input from '../input';
import Menu, { Props as MenuProps } from './menu';
import SearchBar from './search-bar';
import defaultLocale from './locales/zh-CN';

export type CascaderProps = Props;

export const Cascader = React.forwardRef<CascaderInstance, PropsWithChildren<Props>>((props, ref) => {
  const locale = useLocale('Cascader');
  const { selectPlaceholder }: { selectPlaceholder: string } = {
    ...defaultLocale,
    ...locale,
  };

  const {
    prefixCls,
    className,
    placeholder = selectPlaceholder,
    searchPlaceholder,
    input,
    size,
    disabled,
    open,
    title: originTitle,
    separator = '/',
    lazySearch,
    keyword: originKeyword,
    overlayClassName,
    dataSource = [],
    trigger = 'hover',
    dropdownTrigger = 'click',
    placement = 'bottomLeft',
    getDropdownContainer,
    destroyTooltipOnHide = true,
    value,
    defaultValue,
    keyMapping: _keyMapping,
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
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const keyMapping = mergeKeyMapping(_keyMapping);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useControlledState(value, defaultValue);
  const merTitle = originTitle ?? getTitleBySelected(keyMapping, separator, dataSource, value);
  const [title, setTitle] = useControlledState(
    merTitle,
    getTitleBySelected(keyMapping, separator, dataSource, defaultValue)
  );
  const [keyword, setKeyword] = useDynamicData(originKeyword);
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [dropdownVisible, setDropdownVisible] = useDynamicData(!!visible);
  const wrapperCls = usePrefixCls('cascader-legacy', prefixCls);
  const withWrapperCls = withPrefix(wrapperCls);
  const onSelect: Props['onSelect'] = (data, parents = [], event) => {
    const { label: mapLabel, value: mapValue } = dataKeyMapping(data, keyMapping);
    const titles = parents.reduce((acc, b) => [dataKeyMapping(b, keyMapping).label, acc].join(separator), mapLabel);

    setTitle(titles || '');
    setSelected(mapValue);
    userChange?.(data, parents, event);
    setTimeout(() => {
      // 1. 可以让用户看到选中操作的效果
      // 2. 可以防止 unmount 后 setState
      setDropdownVisible(false);
      onVisibleChange?.(false);
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
  const mergedVisible = visible === undefined ? dropdownVisible : dropdownVisible && visible;

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

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownVisible(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [setDropdownVisible]);

  React.useImperativeHandle(ref, () => ({
    getOverlay: () => overlayRef.current,
    getInputWrapper: () => titleRef.current,
  }));

  return (
    <Dropdown
      prefixCls={prefixCls}
      disabled={disabled}
      visible={mergedVisible}
      placement={placement}
      getTooltipContainer={getDropdownContainer}
      overlayClassName={classNames(withWrapperCls('dropdown'), overlayClassName)}
      trigger={dropdownTrigger}
      onVisibleChange={handleVisibleChange}
      overlayStyle={overlayStyle}
      destroyTooltipOnHide={destroyTooltipOnHide}
      overlay={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div ref={overlayRef} className={classNames(className, withWrapperCls('panel'), 'cascader-legacy-menu-list')}>
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
      <div className={classNames(wrapperCls, className, withWrapperCls('title'))} style={style} ref={titleRef}>
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
  );
});

export default Cascader;
