import React from 'react';
import _ from 'lodash';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Default, Group } from '../demos/Checkbox.stories';
import Checkbox from '../index';
import CheckboxGroup from '../group';

afterEach(cleanup);

describe('Testing checkbox', () => {
  const options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
  ];
  it('default', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
  });

  it('checked checkbox', () => {
    const changeMock = jest.fn();
    render(<Checkbox onChange={changeMock} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(changeMock).toBeCalled();
  });

  it('group checkbox', () => {
    const props = {
      disabled: false,
      direction: 'horizontal',
    };
    render(<Group />);
    render(<Group {...props} />);
  });

  it('group checkbox', () => {
    render(<Group {...Group.args} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
  });

  it('group change', () => {
    const changeMock = jest.fn();
    render(<Group {..._.set(Group.args, 'onChange', changeMock)} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(changeMock).toBeCalled();
  });

  it('string options', () => {
    render(<Group {..._.set(Group.args, 'options', ['yes', 'no'])} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(2);
  });

  it('CheckboxGroup options', () => {
    render(<CheckboxGroup options={options} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
  });

  it('CheckboxGroup value', () => {
    render(<CheckboxGroup options={options} value={null} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
  });

  it('value !== undefined and change value', () => {
    const changeMock = jest.fn();
    _.set(Group.args, 'onChange', changeMock);
    const { rerender } = render(<Group {..._.set(Group.args, 'value', ['yes', 'no'])} />);
    _.set(Group.args, 'value', ['yes']);
    rerender(<Group {...Group.args} />);
    fireEvent.click(screen.getAllByRole('checkbox')[0]);
    expect(changeMock).toBeCalledTimes(1);
  });
});
