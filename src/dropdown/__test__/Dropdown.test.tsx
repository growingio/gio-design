import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, IconTrigger } from '../demos/Dropdown.stories';
import Dropdown from '../index';
import Button from '../../components/button';

describe('Testing dropdown', () => {
  it('default dropdown', () => {
    render(<Default {...Default.args} />);
    fireEvent.click(screen.getByRole('button', { name: /更多功能/i }));
    expect(screen.getByText('用户属性')).toBeTruthy();
  });

  it('placement dropdown', () => {
    render(<IconTrigger {...IconTrigger.args} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getAllByRole('tooltip')).toHaveLength(1);
  });

  it('function overlay', () => {
    const overlays = () => <div id="overlay-content">我是下拉内容</div>;
    render(
      <Dropdown overlay={overlays} trigger="hover">
        <Button>点击</Button>
      </Dropdown>
    );
    fireEvent.mouseEnter(screen.getByRole('button'));
    fireEvent.click(screen.getByText('我是下拉内容'));
    expect(screen.getByText('我是下拉内容')).toBeTruthy();
  });

  it('change prefix', () => {
    const clickMock = jest.fn();
    const visibleChangeMock = jest.fn();
    render(
      <Dropdown
        subPrefixCls="gio"
        overlay={<Button onClick={clickMock}>我是下拉内容</Button>}
        onVisibleChange={visibleChangeMock}
        placement="right"
      >
        <Button>点击</Button>
      </Dropdown>
    );
    fireEvent.click(screen.getByRole('button', { name: '点 击' }));
    expect(screen.getByText('我是下拉内容')).toBeTruthy();
    expect(visibleChangeMock).toBeCalled();

    fireEvent.click(screen.getByRole('button', { name: '我是下拉内容' }));
    expect(clickMock).toBeCalled();
  });

  it('set visible to true', () => {
    render(
      <Dropdown visible overlay={<span>我是下拉内容</span>}>
        <Button>点击</Button>
      </Dropdown>
    );
    expect(screen.getByText('我是下拉内容')).toBeTruthy();
  });
});
