import React from 'react';
import { ListItemProps, ListItemGroupProps } from '../list/interfaces';

interface TabNavItem {
  /**
   * Child elment of tab nav item
   */
  children: React.ReactNode;
  /**
   * React key of tab nav item
   */
  key: string;
}

export interface BasePickerProps {
  /**
   * SearchBar configuration
   */
  searchBar?: {
    /**
     * Searchbar's placeholder
     */
    placeholder?: string;
    /**
     * Callback when user input in search bar
     */
    onSearch: (query: string) => void;
  };
  /**
   * TabNav configuration
   */
  tabNav?: {
    items: TabNavItem[];
    onChange?: (key: string) => void;
  };
  /**
   * Loading state of picker
   */
  loading?: boolean;
  /**
   * Empty state of picker
   */
  emptyPrompt?: {
    /**
     * Customize description
     */
    description: React.ReactNode;
    /**
     * Customize child element
     */
    children?: React.ReactNode;
  };
  /**
   * Data record array to be displayed
   */
  // dataSource?: T[];
  // renderItem?: (item: T, index: number) => React.ReactNode;
  renderItems?: () => React.ReactNode;
  /**
   * main content render
   */
  renderContent?: () => React.ReactNode;
  items?: (ListItemGroupProps | ListItemProps)[];
  /**
   * Callback when select some data
   */
  // onSelect?: (record: T) => void;
  /**
   * The footer for custom actions
   */
  footer?: React.ReactNode;
  detailVisible?: boolean;
  renderDetail?: () => React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}
