import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Controlled, Placement } from '../Popconfirm.stories';
import Popconfirm from '../index';

describe('Testing popconfirm', () => {
  it('basic popconfirm', () => {
    render(<Default {...Default.args} />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    fireEvent.click(screen.getByRole('button', { name: '取 消' }));
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('controlled popconfirm', () => {
    render(<Controlled {...Controlled.args} />);
    fireEvent.click(screen.getByRole('button', { name: /click me/i }));
    fireEvent.click(screen.getByRole('button', { name: '确 认' }));
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('placement popconfirm', () => {
    render(<Placement {...Placement.args} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('删除物品属性后，相关数据将停止计算，历史数据保留。')).toBeTruthy();
  });

  it('change ok and cancel text', () => {
    render(
      <Popconfirm title="我是一个栗子" okText="OK" cancelText="Cancel">
        <span>Click Me</span>
      </Popconfirm>
    );
    expect(screen.getByText('Click Me')).toBeTruthy();
  });
});
