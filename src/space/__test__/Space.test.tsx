import React from 'react';
import { render } from '@testing-library/react';
import { Default } from '../demos/Space.stories';
import Space from '../index';

describe('Testing space', () => {
  it('basic space', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.getElementsByClassName('gio-space-item')).toHaveLength(3);
  });

  it('empty space', () => {
    const { container } = render(<Space size={10} autoWrap align="center" />);
    expect(container.getElementsByClassName('gio-space')).toHaveLength(0);
  });

  it('render chlidren', () => {
    const { container } = render(
      <Space size={[1, 2]} direction="horizontal" split="|">
        <span>点击</span>
        {undefined}
        {123}
      </Space>
    );
    expect(container.getElementsByClassName('gio-space-item')).toHaveLength(2);
  });

  it('empty split', () => {
    const { container } = render(
      <Space direction="vertical" split="">
        <span>点击</span>
        {undefined}
        {123}
      </Space>
    );
    expect(container.getElementsByClassName('gio-space-item')).toHaveLength(2);
  });

  it('not render undefined chlidren', () => {
    const { container } = render(
      <Space direction="vertical" split="|">
        <span>点击</span>
        {undefined}
        {123}
      </Space>
    );
    expect(container.getElementsByClassName('gio-space-item')).toHaveLength(2);
  });
});
