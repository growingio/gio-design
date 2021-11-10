import React from 'react';
import { render, screen } from '@testing-library/react';
import List from '../List';
import { defaultItems, properties } from './data';

describe('List', () => {
  it('has static propties', () => {
    expect(List.Item).toBeTruthy();
    expect(List.ItemGroup).toBeTruthy();
    expect(List.ItemSubgroup).toBeTruthy();
    expect(List.Divider).toBeTruthy();
  });

  it('render empty when no children and items', () => {
    render(<List />);
    expect(screen.queryByText('No data')).toBeNull();
  });

  it('renders with JSX style API', () => {
    render(
      <List>
        <List.ItemGroup title="Group 1">
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
          <List.Item>Item 3</List.Item>
        </List.ItemGroup>
        <List.ItemGroup title="Group 2">
          <List.ItemSubgroup title="Subgroup 1">
            <List.Item>Item 1</List.Item>
            <List.Item>Item 2</List.Item>
            <List.Item>Item 3</List.Item>
          </List.ItemSubgroup>
        </List.ItemGroup>
      </List>
    );
    expect(screen.queryByText('Group 1')).toBeTruthy();
    expect(screen.queryByText('Subgroup 1')).toBeTruthy();
    expect(screen.getAllByText('Item 1')).toHaveLength(2);
  });

  it('renders items', () => {
    render(<List items={defaultItems} />);
    expect(screen.getAllByRole('option')).toHaveLength(defaultItems.length);
  });

  it('renders groups', () => {
    render(<List items={properties} expandable />);
    expect(screen.queryByText('事件属性'));
    expect(screen.queryByText('地域信息'));
    expect(screen.queryByText('商品 01'));
  });
});
