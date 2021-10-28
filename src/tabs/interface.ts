import React from 'react';

export interface TabProps {
  /**
   	初始化选中面板的 `key`
  */
  defaultActiveKey?: string;
  /**
   开启受控模式，当前激活 `tab` 面板的 `key`
   */
  activeKey?: string;
  /**
   切换面板的回调
   */
  onChange?: (key: string) => void;
   /**
   外层容器，自定义类名
   */
  className?: string;
  /**
  外层容器，自定义样式
  */
  style?: React.CSSProperties;
  /**
  标签面板组件
  */
  children?: React.ReactNode;
  /**
  * 组件大小
  */
  size?: 'small' | 'normal'
}

export interface TabPanelProps {
  /**
   key
   */
  key?: string | number;
  /**
   * className
   */
  className?: string;
  /**
   选项卡头显示文字
   */
  tab?: React.ReactNode;
  /**
   选项卡禁用
   */
  disabled?: boolean;
  /**
   卡头前缀
   */
  prefix?: React.ReactNode;
  /**
   标签面板组件
   */
  children?: React.ReactNode;
 /**
  样式
  */
  style?: React.CSSProperties
}

export interface TabButtonProps {
   /**
   key
   */
   key?: string | number;
  /**
   * button内容
   */
  tab?: string;
  /**
   * 不可选状态
   */
  disabled?: boolean;
  /** 
   * 前缀元素
   */
  prefix?: React.ReactNode;
/** 
   * 前缀元素
   */
  realKey?: string | number;
  /** 
   * onChange
   */
  onChange?: (string: string) => void;
  /** 
   * 选中key
   */
  localActiveKey?: string;
  /** 
   * 设置localActiveKey
   */
  setLocalActiveKey?: (string: string) => void;
  /** 
   * prefixCls
   */
  prefixCls?: string;
  /** 
   * 大小
   */
  size?: 'small' | 'normal';
}