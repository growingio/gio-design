import React from 'react';
import _ from 'lodash';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Default, Group } from '../Checkbox.stories';
import Checkbox from '../index';

afterEach(cleanup);

describe('Testing checkbox', () => {
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
    render(<Group {...Group.args} />);
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
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
