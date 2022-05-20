import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Button from '../../button/Button';
import { List, Selection } from '../../list';
import { ListPicker, Recent } from '../index';

describe('test listPicker', () => {
  const options = [
    {
      label: `List Item 1`,
      value: '1',
      disabled: false,
    },
    {
      label: `List Item 2`,
      value: '2',
      disabled: false,
    },
    {
      label: `List Item 3`,
      value: '3',
      disabled: true,
    },
  ];
  const selectionOptions = [
    {
      label: `List Item 1`,
      value: '1',
      disabled: false,
      groupId: '1',
      groupName: 'group1',
    },
    {
      label: `List Item 3`,
      value: '3',
      disabled: false,
      groupId: '1',
      groupName: 'group1',
    },
    {
      label: `List Item 2`,
      value: '2',
      disabled: false,
      groupId: '2',
      groupName: 'group2',
    },
  ];
  it('render normal listPicker', () => {
    render(
      <ListPicker placeholder="请选择">
        <List options={options} />
      </ListPicker>
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByText('请选择'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('render normal recent', () => {
    render(
      <ListPicker placeholder="请选择">
        <Recent />
        <List options={options} />
      </ListPicker>
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByText('请选择'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('uncontrol value onChange', () => {
    render(
      <ListPicker placeholder="请选择">
        <Recent />
        <List options={options} />
      </ListPicker>
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('List Item 2'));
    expect(screen.getByText('List Item 2')).toBeTruthy();
  });

  it('multiple ande needConfirm', () => {
    render(
      <ListPicker model="multiple" needConfirm placeholder="请选择" onChange={jest.fn()}>
        <Recent />
        <List options={options} />
      </ListPicker>
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('List Item 2'));
    fireEvent.click(screen.getByText('List Item 1'));
    act(() => {
      fireEvent.click(screen.getByText('确定'));
    });
    expect(screen.getByText('List Item 2,List Item 1')).toBeTruthy();
  });

  it('recent', async () => {
    render(
      <ListPicker placeholder="请选择" onChange={jest.fn()}>
        <Selection options={selectionOptions}>
          <Recent />
        </Selection>
      </ListPicker>
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('List Item 1'));
    await new Promise((resolve) => setTimeout(resolve, 0));
    act(() => {
      fireEvent.click(screen.getByText('List Item 1'));
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.getAllByText('List Item 1')).toHaveLength(3);
    act(() => {
      fireEvent.click(screen.getAllByText('List Item 1')[1]);
    });
    expect(screen.getAllByText('List Item 1')).toHaveLength(1);
  });

  it('control value without onChange', () => {
    render(
      <ListPicker placeholder="请选择" value="1" onChange={jest.fn()}>
        <Recent />
        <List options={options} />
      </ListPicker>
    );
    fireEvent.click(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByText('List Item 2'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('multiple control value without onChange', () => {
    render(
      <ListPicker placeholder="请选择" model="multiple" needConfirm value={['1']} onChange={jest.fn()}>
        <Recent />
        <List options={options} />
      </ListPicker>
    );
    fireEvent.click(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByText('List Item 2'));
    fireEvent.click(screen.getByText('确定'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('onclear', () => {
    render(
      <ListPicker hidePrefix placeholder="请选择" allowClear onClear={() => jest.fn()} onChange={() => jest.fn()}>
        <List options={options} />
      </ListPicker>
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getByText('List Item 1'));
    userEvent.hover(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText('请选择')).toBeTruthy();
  });
  //
  it(' custom trigger and default props', () => {
    render(
      <ListPicker
        placeholder="请选择"
        trigger="click"
        onVisibleChange={jest.fn()}
        prefixCls="test-picker"
        placement="bottomLeft"
        confirmText="确定"
        separator=""
        valueSeparator="."
        style={{}}
        overlayClassName="test-list-picker-overlay"
        customTrigger={() => <Button onClick={() => jest.fn()}>点击</Button>}
        allowClear
        value="1"
        recentId="test"
        data-testid="test"
        autoWidth
        strategy="absolute"
        needEmpty
        onClear={() => jest.fn()}
        onChange={() => jest.fn()}
      >
        <Recent />
        <List options={options} />
      </ListPicker>
    );
    fireEvent.click(screen.getByText('点击'));
    expect(screen.getByText('点击')).toBeTruthy();
  });
});
