import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemSubgroup from '../ItemSubgroup';
import Item from '../Item';
import { defaultGroupTile, defaultItems, expandItemText } from './data';

describe('ItemSubgroup', () => {
  it('renders JSX elements', () => {
    const itemLabels = ['Item 1', 'Item 2', 'Item 3'];
    render(
      <ItemSubgroup title={defaultGroupTile}>
        {itemLabels.map((i) => (
          <Item key={i}>{i}</Item>
        ))}
      </ItemSubgroup>
    );
    expect(screen.queryByText(defaultGroupTile)).toBeTruthy();
    itemLabels.forEach((i) => {
      expect(screen.queryByText(i)).toBeTruthy();
    });
  });

  it('also can render items prop', () => {
    render(<ItemSubgroup title={defaultGroupTile} items={defaultItems} />);
    expect(screen.queryByText(defaultGroupTile)).toBeTruthy();
    defaultItems.forEach((i) => {
      expect(screen.queryByText(i.children)).toBeTruthy();
    });
  });

  it('can be expanded', () => {
    const itemsLength = 20;
    const items = [];
    for (let i = 1; i <= itemsLength; i += 1) {
      items.push({ children: `Item ${i}` });
    }
    render(<ItemSubgroup title={defaultGroupTile} expandable items={items} />);
    const expandItem = screen.getByText(expandItemText);
    expect(expandItem).not.toBeNull();
    expect(screen.queryAllByRole('option')).toHaveLength(11);
    fireEvent.click(expandItem);
    expect(screen.queryAllByRole('option')).toHaveLength(itemsLength);
  });
});
