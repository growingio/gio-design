import { render, screen } from '@testing-library/react';
import React from 'react';
import Empty from '../Empty';
import List from '..';

describe('testing List->Empty', () => {
  it('render empty node', () => {
    render(<Empty emptyNode={<span>Empty</span>}><List> <List.Item value="1">List Item 1</List.Item></List></Empty>)
    expect(screen.queryByText('Empty')).toBeFalsy();
    expect(screen.getByText('List Item 1')).toBeTruthy();
  })
})

