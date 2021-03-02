import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemGroup from '../ItemGroup';
import Item from '../Item';
import { defaultGroupTile, defaultItems, expandItemText } from './data';

describe('ItemGroup', () => {
  it('can render JSX elements', () => {
    const itemLabels = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <ItemGroup title={defaultGroupTile}>
        {itemLabels.map((i) => (
          <Item key={i}>{i}</Item>
        ))}
      </ItemGroup>
    );
    expect(screen.queryByText(defaultGroupTile)).toBeTruthy();
    itemLabels.forEach((i) => {
      expect(screen.queryByText(i)).toBeTruthy();
    });
  });

  it('also can render items prop', () => {
    render(<ItemGroup title={defaultGroupTile} items={defaultItems} />);
    expect(screen.queryByText(defaultGroupTile)).toBeTruthy();
    defaultItems.forEach((i) => {
      expect(screen.queryByText(i.children)).toBeTruthy();
    });
  });

  it('can render subgroups', () => {
    const subgroups = [
      {
        title: 'Subgroup 1',
        items: defaultItems,
      },
      {
        title: 'Subgroup 2',
        items: defaultItems,
      },
    ];
    render(<ItemGroup title={defaultGroupTile} subgroups={subgroups} />);
    expect(screen.queryByText('Subgroup 1')).toBeTruthy();
    expect(screen.queryByText('Subgroup 2')).toBeTruthy();
  });

  it('can be expanded', () => {
    const itemsLength = 20;
    const items = [];
    for (let i = 1; i <= itemsLength; i += 1) {
      items.push({ children: `Item ${i}` });
    }
    render(<ItemGroup title={defaultGroupTile} expandable items={items} />);
    const expandItem = screen.getByText(expandItemText);
    expect(expandItem).not.toBeNull();
    expect(screen.queryAllByRole('option')).toHaveLength(11);
    fireEvent.click(expandItem);
    expect(screen.queryAllByRole('option')).toHaveLength(itemsLength);
  });
});
