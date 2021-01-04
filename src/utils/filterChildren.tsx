import React from 'react';

export type IFilterChildren = (
  children: React.ReactNode,
  filter: (child: React.ReactNode) => boolean
) => React.ReactNodeArray;

const filterChildren: IFilterChildren = (children, filter) => {
  const result: React.ReactNodeArray = [];

  React.Children.forEach(children, (child) => {
    if (filter(child)) {
      result.push(child);
    }
  });

  return result;
};

export default filterChildren;
