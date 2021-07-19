import React from 'react';
import { render } from '@testing-library/react';
import { Default } from '../Space.stories';
import Space from '../index';

describe('Testing space', () => {
  it('basic space', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.getElementsByClassName('gio-space-item')).toHaveLength(3);
  });

  it('empty space', () => {
    const { container } = render(<Space size={10} autoWrap />);
    expect(container.getElementsByClassName('gio-space')).toHaveLength(0);
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
