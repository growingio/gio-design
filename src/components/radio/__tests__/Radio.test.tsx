import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Group } from '../Radio.stories';
import Radio from '../index';

describe('Testing radio', () => {
  it('basic radio', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });

  it('radio group', () => {
    const { container } = render(<Group {...Group.args} />);
    fireEvent.click(screen.getAllByRole('radio')[0]);
    expect(container.getElementsByClassName('gio-radio-checked')[0]).toBeTruthy();
  });

  it('should render only in valid options', () => {
    const changeMock = jest.fn();
    const { container } = render(
      <Radio.Group options={[{ label: 'opA', value: 'opA' }, 'opC', null, undefined]}>
        <Radio value="a" onChange={changeMock}>
          A
        </Radio>
        <Radio>B</Radio>
        <div>div</div>
        {false}
      </Radio.Group>
    );
    fireEvent.click(screen.getAllByRole('radio')[2]);
    expect(container.getElementsByClassName('gio-radio')).toHaveLength(3);
    expect(changeMock).toBeCalledTimes(1);
  });

  it('change group selected radio', () => {
    const changeMock = jest.fn();
    render(
      <Radio.Group
        options={[
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
        ]}
        value="A"
        onChange={changeMock}
      />
    );
    fireEvent.click(screen.getAllByRole('radio')[2]);
    expect(changeMock).toBeCalledTimes(1);
  });
});
