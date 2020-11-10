import React, { useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { DropdownProps } from '../dropdown/interface';
import { NodeData } from './menu-item';
import { SizeType } from '../config-provider/SizeContext';
import { useDynamicData, withPrefix } from './helper';
import Dropdown from '../dropdown';
import Input from '../input';
import MenuOverlayer, { Props as OverlayerProps } from './menu-overlayer';
import SearchBar from './search-bar';

export interface Props extends Omit<OverlayerProps, 'depth' | 'onClick' | 'originOnClick'> {
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

  onClick?: OverlayerProps['originOnClick'];

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
    trigger = 'click',
    dropdownTrigger = 'click',
    placement = 'bottomLeft',
    header,
    getDropdownContainer,
    value,
    visible,
    onClick,
    onTrigger: userOnTrigger,
    onSelect: userChange,
    onVisibleChange,
    ...others
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useDynamicData(value);
  const [title, setTitle] = useDynamicData(originTitle);
  const [keyword, setKeyword] = useDynamicData(originKeyword);
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [dropdownVisible, setDropdownVisible] = useDynamicData(visible);
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
  const handleTrigger: OverlayerProps['onTrigger'] = (nodeData, event) => {
    userOnTrigger?.(nodeData, event);
    setCanOpen(true);
  };

  useEffect(() => {
    if (dropdownVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [dropdownVisible]);

  return (
    <div className={mergedWrapperCls}>
      <Dropdown
        disabled={disabled}
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
            originOnClick={onClick}
            open={canOpen}
            trigger={trigger}
            header={
              header === false ? (
                false
              ) : (
                <SearchBar
                  size={size}
                  ref={inputRef}
                  value={keyword}
                  onSearch={setKeyword}
                  lazySearch={lazySearch}
                  placeholder={searchPlaceholder}
                />
              )
            }
            className={withWrapperCls('panel')}
            value={selected}
            keyword={keyword}
            dataSource={dataSource}
            onTrigger={handleTrigger}
            onSelect={onSelect}
          />
        }
      >
        <div className={withWrapperCls('title')}>
          {React.isValidElement(input) ? (
            { input }
          ) : (
            // @TODO size={size}
            <Input readOnly placeholder={placeholder} value={title} />
          )}
        </div>
      </Dropdown>
    </div>
  );
};

export default Cascader;
