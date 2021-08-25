import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import React from 'react';
import Cascader from '..';
import { Default, KeyMapping, Group, Trigger, Search, Custom, Async, Tooltip } from '../Cascader.stories';

const menu = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b', children: [{ label: 'b-1', value: 'b-1' }] },
];

describe('Testing cascader', () => {
  it('basic cascader', () => {
    render(<Default {...Default.args} />);
    fireEvent.click(screen.getByRole('img'));
    fireEvent.mouseEnter(screen.getAllByRole('button')[3]);
    expect(screen.getByText('Option C-1')).toBeTruthy();

    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getAllByText('option A')).toHaveLength(1);
  });

  it('render key mapping cascader', () => {
    render(<KeyMapping {...KeyMapping.args} />);
    fireEvent.click(screen.getByRole('img'));
    fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'option A' } });
    expect(screen.queryByText('option B')).toBeNull();
  });

  it('render group cascader', () => {
    render(<Group {...Group.args} />);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(screen.getAllByText('option', { exact: false })).toHaveLength(4);
    fireEvent.click(screen.getAllByRole('img')[2]);
    expect(screen.getByText('option B-1')).toBeTruthy();
  });

  it('render trigger cascader', () => {
    render(<Trigger {...Trigger.args} />);
    fireEvent.click(screen.getByRole('img'));
    fireEvent.click(screen.getByText('option B'));
    waitFor(() => expect(screen.getByText('B-1')).toBeTruthy());
  });

  it('render search cascader', () => {
    const { container } = render(<Search {...Search.args} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    fireEvent.click(screen.getAllByRole('checkbox')[2]);
    fireEvent.click(screen.getByLabelText('down-filled'));
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { value: 'option' } });
    fireEvent.keyDown(container.getElementsByTagName('input')[0], { key: 'Enter' });
  });

  it('render custom cascader', () => {
    render(<Custom {...Custom.args} />);
    fireEvent.click(screen.getAllByRole('img')[1]);
    fireEvent.click(screen.getAllByRole('img')[0]);
    expect(screen.getByText('option A')).toBeTruthy();
  });

  it('render async cascader', async () => {
    const { container } = render(<Async {...Async.args} />);
    fireEvent.focus(container.getElementsByTagName('input')[0]);
  });

  it('render tooltip cascader', async () => {
    render(<Tooltip {...Tooltip.args} />);
  });

  it('can render menu-item by user', () => {
    const { container } = render(
      <Cascader dataSource={menu} visible onRender={(t) => <span className="custom-item">{t.label}</span>} />
    );
    expect(container.querySelectorAll('.custom-item')).toHaveLength(0);
  });

  it('can use keyboard to trigger sub-menu', () => {
    render(<Cascader visible dataSource={menu} />);

    act(() => {
      fireEvent.keyDown(screen.getAllByRole('button')[1], { key: ' ' });
      fireEvent.keyUp(screen.getAllByRole('button')[1], { key: ' ' });
    });
    waitFor(() => {
      expect(screen.getByText('b-1')).toBeTruthy();
    });
  });

  it('can deep search a word', async () => {
    const dataSource = [{ label: 'foo', value: 1, children: [{ label: 'bar', value: 2 }] }];
    render(<Cascader visible deepSearch dataSource={dataSource} trigger="click" />);

    expect(screen.getByText('foo')).toBeTruthy();

    act(() => {
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'f' } });
    });

    // deep search childNode
    act(() => {
      fireEvent.change(screen.getAllByRole('textbox')[1], { target: { value: 'b' } });
    });

    // open a sub-menu
    act(() => {
      fireEvent.click(screen.getAllByRole('button')[1], {
        currentTarget: {},
      });
    });
  });
});
