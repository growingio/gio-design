import { isEmpty } from 'lodash';
import React from 'react';
import { ModelType, OptionProps } from './interfance';

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
export function convertNodeToOption(node: React.ReactElement): OptionProps {
  const {
    props: { value, children, label, ...restProps },
  } = node as React.ReactElement & { props: OptionProps };
  return { value, label: label ?? children, ...restProps };
}

export function convertChildrenToData(nodes: React.ReactNode): OptionProps[] {
  const nodeOptions: OptionProps[] = [];
  React.Children.forEach(nodes, (node: React.ReactElement) => {
    if (!React.isValidElement(node)) {
      return;
    }
    nodeOptions.push(convertNodeToOption(node));
  });
  return nodeOptions;
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
