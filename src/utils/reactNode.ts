import React, { isValidElement } from 'react';

export function replaceElement(
  element: React.ReactNode,
  replacement: React.ReactNode,
  props: unknown
): React.ReactNode {
  if (!isValidElement(element)) return replacement;

  return React.cloneElement(element, typeof props === 'function' ? props() : props);
}

export function cloneElement(element: React.ReactNode, props?: unknown): React.ReactElement {
  return replaceElement(element, element, props) as React.ReactElement;
}
