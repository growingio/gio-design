import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Selection from '../Selection';
import List, { Item } from '..';
import { SelectionProps } from '../interface';

describe('testing Selection', () => {
  it('render list wrapped by Selection', () => {
    const mockSelectionChange = jest.fn();
    const Select = () => <Selection onChange={v => mockSelectionChange(v)}>
      <List id="l1" title="列表1" >
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>

      </List>
      <List id="l2" title="列表2">

        <Item value="3">List Item 3,List Item 3,List Item 3,List Item 3,</Item>
        <Item value="4">
          List Item 4
        </Item>

      </List>
      <List needEmpty />
    </Selection>

    const { container } = render(<Select />);

    expect(container.querySelector('.gio-list--selection--title')).toBeTruthy();
    fireEvent.click(screen.getByText('List Item 1'));
    expect(mockSelectionChange).toHaveBeenCalledWith('1')
  });

  it('render list wrapped by Selection with prop[options] ', () => {
    const groupedListOptions: SelectionProps['options'] = [
      { groupId: 'g1', groupName: 'group 1', value: '1.1', label: 'item 1' },
      { groupId: 'g1', groupName: 'group 1', value: '1.2', label: 'item 2' },
      { groupId: 'g2', groupName: 'group 2', value: '2.1', label: 'item 3' },
      { groupId: 'g2', groupName: 'group 2', value: '2.2', label: 'item 4' },
    ]
    const mockSelectionChange = jest.fn();
    const Select = () => <Selection options={groupedListOptions} onChange={(v) => mockSelectionChange(v)} />

    const { container } = render(<Select />);

    expect(container.querySelector('.gio-list--selection--title')).toBeTruthy();
    fireEvent.click(screen.getByText('item 1'));
    expect(mockSelectionChange).toHaveBeenCalledWith('1.1')
  })
})
