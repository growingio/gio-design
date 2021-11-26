import { isEmpty } from 'lodash';
import React from 'react';
import { ListProps } from '.';
import { ModelType, OptionProps } from './interfance';

type OtherProps = ListProps;

export const isMultipe = (model: ModelType) => model === 'multiple';
export const isCascader = (model: ModelType) => model === 'cascader';

const deepChildren = (children?: OptionProps[]): any[] => {
  if (children) {
    return [...children, ...deepChildren(children?.[0]?.childrens as OptionProps[])];
  }
  return [];
};
const generateValue = (child?: OptionProps[]) =>
  child?.reduce((prev, curr) => (curr.value ? [...prev, curr.value] : prev), []).join('.');
export const generateString = (value?: string, children?: OptionProps[]) => {
  if (!isEmpty(children)) {
    return `${generateValue(deepChildren(children))}.${value}`;
  }
  return value ?? '';
};

// ReactNode To Options
export function convertNodeToOption(node: React.ReactElement, otherProps?: OtherProps): OptionProps {
  const {
    props: { value, children, label, ...restProps },
  } = node as React.ReactElement & { props: OptionProps };
  const option = { value, label: label ?? children, ...restProps };
  return { prefix: otherProps?.prefix?.(option), suffix: otherProps?.suffix?.(option), ...option };
}

export function convertChildrenToData(nodes: React.ReactNode, otherProps: OtherProps): OptionProps[] {
  const nodeOptions: OptionProps[] = [];
  React.Children.forEach(nodes, (node: React.ReactElement) => {
    if (!React.isValidElement(node)) {
      return;
    }
    nodeOptions.push(convertNodeToOption(node, otherProps));
  });
  return nodeOptions;
}

export function convertOption(option: OptionProps, otherProps?: OtherProps): OptionProps {
  const { value, children, label, ...restProps } = option;
  const val = { value, label: label ?? children, ...restProps };
  return { prefix: otherProps?.prefix?.(option), suffix: otherProps?.suffix?.(option), ...val } as OptionProps;
}
export function convertOptions(options: OptionProps[], otherProps: OtherProps): OptionProps[] {
  return options.reduce((prev, curr) => [...prev, convertOption(curr, otherProps)], []);
}

export const generateSelectParent = (label: string | React.ReactNode, value: string, parent?: OptionProps[]) =>
  parent
    ? [
        {
          label: parent?.[0]?.label,
          value: parent?.[0]?.value,
          childrens: [
            {
              label,
              value,
            },
          ],
        },
      ]
    : [
        {
          label,
          value,
        },
      ];
