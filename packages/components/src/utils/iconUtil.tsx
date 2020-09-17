import * as React from 'react';
import CaretDownOutlined from '@gio-design/icons/es/CaretDownOutlined';
import LoadingOutlined from '@gio-design/icons/es/LoadingOutlined';
import CheckOutlined from '@gio-design/icons/es/CheckOutlined';
import Close from '@gio-design/icons/es/Close';
import CloseCircleFilled from '@gio-design/icons/es/CloseCircleFilled';
import SearchOutlined from '@gio-design/icons/es/SearchOutlined';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function getIcons({
  suffixIcon,
  clearIcon,
  menuItemSelectedIcon,
  removeIcon,
  loading,
  multiple,
  prefixCls,
}: {
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  menuItemSelectedIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  loading?: boolean;
  multiple?: boolean;
  prefixCls: string;
}) {
  // Clear Icon
  let mergedClearIcon = clearIcon;
  if (!clearIcon) {
    mergedClearIcon = <CloseCircleFilled size='12px' />;
  }

  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon;
  } else if (loading) {
    mergedSuffixIcon = <LoadingOutlined rotating size='12px' />;
  } else {
    const iconCls = `${prefixCls}-suffix`;
    mergedSuffixIcon = ({ open, showSearch }: { open: boolean; showSearch: boolean }) => {
      if (open && showSearch) {
        return <SearchOutlined className={iconCls} size='12px' />;
      }
      return <CaretDownOutlined className={iconCls} size='12px' />;
    };
  }

  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = <CheckOutlined size='12px' />;
  } else {
    mergedItemIcon = null;
  }

  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = <Close size='12px' />;
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  };
}
