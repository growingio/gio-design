import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Placement } from '../Dropdown.stories';
import Dropdown from '../index';
import Button from '../../../legacy/button';

describe('Testing dropdown', () => {
  it('default dropdown', () => {
    render(<Default {...Default.args} />);
    fireEvent.click(screen.getByRole('button', { name: /更多功能/i }));
    expect(screen.getByText('用户属性')).toBeTruthy();
  });

  it('placement dropdown', () => {
    render(<Placement {...Placement.args} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('tooltip')).toHaveLength(1);
  });

  it('function overlay', () => {
    const overlays = () => <div id="overlay-content">我是下拉内容</div>;
    render(
      <Dropdown overlay={overlays()} trigger="hover">
        <Button>点击</Button>
      </Dropdown>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    fireEvent.click(screen.getByText('我是下拉内容'));
    expect(screen.getByText('我是下拉内容')).toBeTruthy();
  });
});
