import { concat, difference, indexOf, isArray, isEmpty, isNil, isUndefined } from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import React from 'react';
import { ListProps, MaybeArray, ModelType, OptionProps } from './interface';

interface OtherProps extends Omit<ListProps, 'prefix' | 'suffix'> {
  prefix?: ((option?: OptionProps) => string | React.ReactNode) | React.ReactNode;
  suffix?: ((option?: OptionProps) => string | React.ReactNode) | React.ReactNode;
}

export const isMultipe = (model: ModelType) => model === 'multiple';
export const isCascader = (model: ModelType) => model === 'cascader';
export const isVaildFunctionCallBack = (opt: any, cb?: ((option?: OptionProps) => React.ReactNode) | React.ReactNode) =>
  React.isValidElement(cb) ? cb : (cb as (option?: OptionProps) => React.ReactNode)?.(opt);
export const getResultValue = (value?: (string | number)[], val?: string | number) => {
  if (indexOf(value, val) !== -1) {
    return difference(value, [val]);
  }
  if (typeof val === 'string') {
    return concat(value, val);
  }
  return value;
  //  ?  :
};
export const selectStatus = (value?: string | number, values?: MaybeArray<string | number>) => {
  if (!isNil(value)) {
    return isArray(values) ? (values as (string | number)[])?.indexOf(value) !== -1 : values === value;
  }
  return false;
};
const deepChildren = (children?: OptionProps[]): any[] => {
  if (children) {
    return [...children, ...deepChildren(children?.[0]?.items as OptionProps[])];
  }
  return [];
};
const generateValue = (child?: OptionProps[]) =>
  child?.reduce((prev, curr) => (curr?.value ? [...prev, curr?.value] : prev), []).join('.');
export const generateString = (value?: string | number, children?: OptionProps[]) => {
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
  const prefix = isVaildFunctionCallBack(option, otherProps?.prefix);
  const suffix = isVaildFunctionCallBack(option, otherProps?.suffix);
  return { prefix, suffix, ...option };
}

export function convertChildrenToData(nodes: React.ReactNode, otherProps: OtherProps): OptionProps[] {
  const nodeOptions: OptionProps[] = [];
  toArray(nodes).forEach((node: React.ReactElement) => {
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
  const prefix = isVaildFunctionCallBack(option, otherProps?.prefix);
  const suffix = isVaildFunctionCallBack(option, otherProps?.suffix);
  return { prefix, suffix, ...val } as OptionProps;
}
export function convertOptions(options: OptionProps[], otherProps: OtherProps): OptionProps[] {
  return options.reduce((prev, curr) => [...prev, convertOption(curr, otherProps)], []);
}

export const generateSelectParent = (label: string | React.ReactNode, value: string | number, parent?: OptionProps[]) =>
  parent
    ? [
        {
          label: parent?.[0]?.label,
          value: parent?.[0]?.value,
          items: [
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

export const collectOption = (child: React.ReactNode, otherProps?: OtherProps): OptionProps | undefined => {
  if (React.isValidElement(child)) {
    const {
      props: { value, children, label, ...restProps },
    } = child as React.ReactElement & { props: OptionProps };
    const option = { value, label: label ?? children, ...restProps };
    const prefix = isVaildFunctionCallBack(option, otherProps?.prefix);
    const suffix = isVaildFunctionCallBack(option, otherProps?.suffix);

    return { prefix, suffix, ...option };
  }
  return undefined;
};

export const collectOptions = (childs?: React.ReactNode | OptionProps): OptionProps[] => {
  const optionsArr: OptionProps[] = [];
  toArray(childs).forEach((child) => {
    const { props, type } = child as React.ReactElement & { props: OptionProps } & {
      props: { options?: OptionProps[] };
    } & { type: any };
    const value = props?.value;
    const children = props?.children;
    const prefix = props?.prefix;
    const options = props?.options;
    const suffix = props?.suffix;

    const isItem = type?.isItem;
    const isList = type?.isList;
    const isRecent = type?.isRecent;
    const isSelection = type?.isSelection;
    const isSelect = type?.isSelect;
    if (React.isValidElement(child) && isUndefined(isRecent)) {
      let listPrefix;
      let listSuffix;
      if (isSelection && isArray(options)) {
        optionsArr.push(...convertOptions(options, {}));
      }
      // options
      if ((isList || isSelect) && isArray(options)) {
        listPrefix = prefix;
        listSuffix = suffix;
        optionsArr.push(...convertOptions(options, { prefix: listPrefix, suffix: listSuffix }));
      }
      // JSX items
      if (isItem && !isUndefined(value)) {
        const opt = collectOption(child, { prefix: listPrefix, suffix: listSuffix });
        if (!isUndefined(opt)) optionsArr?.push(opt);
      }

      if (!isUndefined(children)) {
        // 继续遍历
        optionsArr.push(...collectOptions(children));
      }
    }
  });
  return optionsArr;
};
