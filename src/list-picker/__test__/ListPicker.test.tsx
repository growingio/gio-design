import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { DesignProvider } from '@gio-design/utils';
import { Basic, Disabled, Empty, Groups, Size } from '../demos/ListPicker.stories';
import ListPicker from '../ListPicker';
import enUS from '../../locales/en-US';
import zhCN from '../../locales/zh-CN';

describe('ListPicker', () => {
  it('has static propties', () => {
    expect(ListPicker.Item).toBeTruthy();
    expect(ListPicker.Group).toBeTruthy();
    expect(ListPicker.Subgroup).toBeTruthy();
    expect(ListPicker.Divider).toBeTruthy();
  });

  it('renders items', () => {
    render(<Basic {...Basic.args} />);
    expect(screen.queryAllByText(/Item/)).toHaveLength(5);
  });

  it('renders disabled items', () => {
    const onSelectSpy = jest.fn();
    render(<Disabled {...Disabled.args} onSelect={onSelectSpy} />);
    fireEvent.click(screen.getByText('文本 3'));
    expect(onSelectSpy).not.toHaveBeenCalled();
  });

  it('renders groups', () => {
    const onSelectSpy = jest.fn();
    render(<Groups {...Groups.args} onSelect={onSelectSpy} />);
    expect(screen.queryByText('Group 1')).toBeTruthy();
    expect(screen.queryAllByText(/Subgroup/)).toHaveLength(5);
    expect(screen.queryAllByText('Item 9')).toHaveLength(6);

    let items = screen.getAllByText('Item 1');
    fireEvent.click(items[0]);
    expect(onSelectSpy).toHaveBeenCalledWith('group-3-item-1', 'Item 1');
    fireEvent.click(items[1]);
    expect(onSelectSpy).toHaveBeenCalledWith('group-2-item-1', 'Item 1');
    items = screen.getAllByText('Item 9');
    fireEvent.click(items[items.length - 1]);
    expect(onSelectSpy).toHaveBeenCalledWith('group-1-subgroup-4-item-9', 'Item 9');

    fireEvent.keyPress(items[0], { key: 'Enter', code: 'Enter', charCode: 13 });

    const expandItems = screen.getAllByText('展开全部');
    fireEvent.click(expandItems[0]);
    expect(screen.queryAllByText('展开全部')).toHaveLength(expandItems.length - 1);

    fireEvent.click(expandItems[1]);
    expect(screen.queryAllByText('展开全部')).toHaveLength(expandItems.length - 2);
  });

  it('render empty when no children and items', () => {
    render(<Empty {...Empty.args} />);
    expect(screen.queryByText('暂无数据')).toBeTruthy();
  });

  it('renders with multi languages', () => {
    const { rerender } = render(
      <DesignProvider locale={enUS}>
        <Empty {...Empty.args} />
        <Groups {...Groups.args} />
      </DesignProvider>
    );
    expect(screen.queryByText('No data')).toBeTruthy();
    expect(screen.queryAllByText('Expand all').length).toBeGreaterThan(1);

    rerender(
      <DesignProvider locale={zhCN}>
        <Empty {...Empty.args} />
        <Groups {...Groups.args} onSelect={undefined} />
      </DesignProvider>
    );
    expect(screen.queryByText('暂无数据')).toBeTruthy();
    expect(screen.queryAllByText('展开全部').length).toBeGreaterThan(1);

    let items = screen.getAllByText('Item 1');
    fireEvent.click(items[0]);
    fireEvent.click(items[1]);
    items = screen.getAllByText('Item 9');
    fireEvent.click(items[items.length - 1]);
  });

  it('has different sizes', () => {
    const { container } = render(<Size />);
    expect(container.querySelector('.gio-list-picker--small')).not.toBeNull();
  });
});
