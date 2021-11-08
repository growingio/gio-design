import React from 'react';

export type IFilterChildren = (
  children: React.ReactNode,
  filter: (child: React.ReactNode) => boolean
) => React.ReactNode[];

const filterChildren: IFilterChildren = (children, filter) => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (filter(child)) {
      result.push(child);
    }
  });

  return result;
};

export default filterChildren;
