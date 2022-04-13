import React, { useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import Popover from '../../../../popover';
import PropertyPicker from './PropertyPicker';
import { PropertyValue, PropertySelectorProps } from './interfaces';
import Selector from './components/selector-pro';
import './style';
import IconRender from './PropertyValueIconRender';
import PropertyCard from './PropertyCard';
import { dimensionToPropertyItem, promisify } from './util';
import defaultLocale from './locales/zh-CN';

const PropertySelector: React.FC<PropertySelectorProps> = (props) => {
  const localeText = useLocale('PropertyPicker') || defaultLocale;
  const {
    borderless = true,
    size = 'middle',
    disabled,
    placeholder = localeText.placeholderText,
    dropdownVisible,
    onDropdownVisibleChange,
    className,
    value,
    dataSource,
    onSelect,
    onChange,
    hideInputDetail = false,
    ...pickerRestProps
  } = props;
  const [dropdownVisibleInner, setDropdownVisibleInner] = useState(dropdownVisible);
  const [currentValue, setCurrentValue] = useControlledState(value, undefined);

  const inputText = useMemo(() => currentValue?.name || currentValue?.label, [currentValue]);
  const inputValueRef = useRef<HTMLSpanElement | null>(null);

  const clsPrifx = usePrefixCls('property-selector-legacy');
  const selectorCls = classNames(clsPrifx, className);
  function handleDropDownVisibleChange(show: boolean) {
    onDropdownVisibleChange?.(show);
    setDropdownVisibleInner(show);
  }
  function handleValueChange(newValue: PropertyValue) {
    onChange?.(newValue);
  }
  function handleSelect(item: PropertyValue) {
    setCurrentValue(item);
    onSelect?.(item);
    setDropdownVisibleInner(false);
  }
  const propertyValue = useMemo(() => {
    if (!currentValue) return undefined;
    const foundValue = dataSource.find((item) => [item.key, item.id].includes(currentValue.value));
    if (!foundValue) return currentValue;
    return dimensionToPropertyItem(foundValue as any, localeText as any);
  }, [currentValue, dataSource, localeText]);

  const dropdownRender = () => (
    <PropertyPicker
      className={`${clsPrifx}-dropdown`}
      {...pickerRestProps}
      shouldUpdateRecentlyUsed={dropdownVisibleInner}
      value={propertyValue}
      dataSource={dataSource}
      onChange={handleValueChange}
      onSelect={handleSelect}
    />
  );
  const fetchDetail = pickerRestProps.fetchDetailData ?? ((data: any) => data);
  const inputRender = () => {
    const content = () => propertyValue && <PropertyCard nodeData={propertyValue} fetchData={promisify(fetchDetail)} />;
    return (
      propertyValue && (
        <>
          <Popover
            overlayClassName="property-card-overlay"
            placement="bottomLeft"
            disabled={hideInputDetail}
            content={content()}
          >
            <span className="inner-input-wrap" ref={inputValueRef}>
              <span className="icon">
                <IconRender group={propertyValue?.iconId} />
              </span>
              <span>{inputText}</span>
            </span>
          </Popover>
        </>
      )
    );
  };
  return (
    <>
      <Selector
        size={size}
        className={selectorCls}
        borderless={borderless}
        disabled={disabled}
        placeholder={placeholder}
        dropdownVisible={dropdownVisibleInner}
        dropdownRender={dropdownRender}
        onDropdownVisibleChange={handleDropDownVisibleChange}
        valueRender={inputRender}
      />
    </>
  );
};
export default PropertySelector;
