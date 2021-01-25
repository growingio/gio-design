import React from 'react';
import { concat } from 'lodash';
import { Option, OptionProps } from './interface';

interface group {
    groupLabel?: string;
    groupValue?: string | number;
}
// ReactNode To Options
export function convertNodeToOption(node: React.ReactElement, group: group): Option {
    const {
        props: { value, children, ...restProps },
    } = node as React.ReactElement & { props: OptionProps };
    const { groupValue, groupLabel } = group;
    return { value, label: children !== undefined ? children : value, groupValue, groupLabel, ...restProps };
}

export function convertChildrenToData(nodes: React.ReactNode, group = {}): Option[] {
    let nodeOptions: Option[] = [];
    React.Children.forEach(nodes, (node: React.ReactElement) => {
        if (!React.isValidElement(node)) {
            return;
        }
        const {
            type: { isSelectOptGroup },
            props: { children, label, value },
        } = node as React.ReactElement & { type: { isSelectOptGroup?: boolean }, props: OptionProps }; // 联合类型
        if (!isSelectOptGroup) {
            // option
            nodeOptions.push(convertNodeToOption(node, group));
        } else {
            // Group
            nodeOptions = concat(nodeOptions, convertChildrenToData(children, { groupLabel: label, groupValue: value }));
        }
    });
    return nodeOptions;
}
