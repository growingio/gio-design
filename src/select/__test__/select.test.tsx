import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Button from '../../button/Button';
import { Item } from '../../list';
import Select from '../index';

describe('test select', () => {
  const options = [
    {
      label: `List Item 1`,
      value: 1,
      disabled: false,
    },
    {
      label: `List Item 2`,
      value: 2,
      disabled: false,
    },
    {
      label: `List Item 3`,
      value: 3,
      disabled: true,
    },
  ];
  it('render normal select with children', () => {
    render(
      <Select>
        {options.map((v) => (
          <Item value={v.value} label={v.label} />
        ))}
      </Select>
    );

    expect(screen.getByTestId('select')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });
  it('render normal select with options', () => {
    render(<Select options={options} />);

    expect(screen.getByTestId('select')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('render normal select with Option', () => {
    render(
      <Select>
        {options.map((v) => (
          <Select.Option value={v.value} label={v.label} />
        ))}
      </Select>
    );
    expect(screen.getByTestId('select')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });

  it('select custom trigger', () => {
    render(
      <Select
        options={options}
        prefixCls="test"
        customTrigger={() => <Button onClick={() => jest.fn()}>点击</Button>}
      />
    );
    fireEvent.click(screen.getByText('点击'));
    expect(screen.getByText('点击')).toBeTruthy();
  });

  it('select onChange', () => {
    render(<Select options={options} />);

    expect(screen.getByTestId('select')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    // screen.debug();
    expect(screen.getByText('List Item 1')).toBeTruthy();
    act(() => {
      fireEvent.click(screen.getByText('List Item 1'));
    });
  });

  it('select onClear and test function callback', () => {
    render(
      <Select
        options={options}
        onChange={() => jest.fn()}
        onClear={() => jest.fn()}
        allowClear
        placeholder="请选择"
        onVisibleChange={jest.fn()}
      />
    );

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    // screen.debug();
    expect(screen.getByText('List Item 1')).toBeTruthy();
    act(() => {
      fireEvent.click(screen.getByText('List Item 1'));
    });
    expect(screen.getByText('List Item 1')).toBeTruthy();
    userEvent.hover(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText('请选择')).toBeTruthy();
  });

  it('select onClear undefined', () => {
    render(<Select options={options} allowClear onClear={undefined} onChange={undefined} placeholder="请选择" />);

    expect(screen.getByText('请选择')).toBeTruthy();
    fireEvent.click(screen.getByTestId('select'));
    // screen.debug();
    expect(screen.getByText('List Item 1')).toBeTruthy();
    act(() => {
      fireEvent.click(screen.getByText('List Item 1'));
    });
    expect(screen.getByText('List Item 1')).toBeTruthy();
    userEvent.hover(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByText('List Item 1'));
    fireEvent.click(screen.getByRole('img'));
    expect(screen.getByText('请选择')).toBeTruthy();
  });

  it('select custom defaultValue', () => {
    render(
      <Select
        options={options}
        placement="top"
        disabled
        hidePrefix
        autoWidth
        needEmpty={false}
        prefixCls="test"
        defaultValue={1}
      />
    );
    // fireEvent.click(screen.getByText('List Item 1'));
    expect(screen.getByText('List Item 1')).toBeTruthy();
  });
});

describe('test base Option', () => {
  it('test Options', () => {
    render(<Select.Option value="1" label="2" />);
  });
});
