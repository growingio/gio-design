import * as React from 'react';
import { LoadingBlackOutlined, Check, Close, CloseCircleFilled, Search } from '@gio-design/icons';

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
    mergedClearIcon = <CloseCircleFilled />;
  }

  // Arrow item icon
  let mergedSuffixIcon = null;
  if (suffixIcon !== undefined) {
    mergedSuffixIcon = suffixIcon;
  } else if (loading) {
    mergedSuffixIcon = <LoadingBlackOutlined />;
  } else {
    const iconCls = `${prefixCls}-suffix`;
    mergedSuffixIcon = ({ showSearch }: { open: boolean; showSearch: boolean }) => {
      if (showSearch) {
        return <Search className={iconCls} />;
      }
      return null;
    };
  }

  // Checked item icon
  let mergedItemIcon = null;
  if (menuItemSelectedIcon !== undefined) {
    mergedItemIcon = menuItemSelectedIcon;
  } else if (multiple) {
    mergedItemIcon = <Check />;
  } else {
    mergedItemIcon = null;
  }

  let mergedRemoveIcon = null;
  if (removeIcon !== undefined) {
    mergedRemoveIcon = removeIcon;
  } else {
    mergedRemoveIcon = <Close />;
  }

  return {
    clearIcon: mergedClearIcon,
    suffixIcon: mergedSuffixIcon,
    itemIcon: mergedItemIcon,
    removeIcon: mergedRemoveIcon,
  };
}
