import React from 'react';
import { PopoverProps } from '../popover/interface';

type ReactRender = () => React.ReactNode;

export interface TooltipLink {
  name?: string;
  link: string;
}

export interface TooltipProps extends Omit<PopoverProps, 'content'> {
  overlay?: React.ReactNode;
  title?: React.ReactNode;

  subPrefixCls?: string;

  tooltipLink?: TooltipLink;
  /**
   被包裹的元素
   */
  children: React.ReactElement;
}
