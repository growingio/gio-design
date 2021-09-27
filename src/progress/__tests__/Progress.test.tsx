import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default } from '../demos/Progress.stories';
import Progress from '../index';

describe('Testing progress', () => {
  it('basic progress', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('without props', () => {
    render(<Progress />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('without icon', () => {
    render(<Progress percent={1} status="exception" showInfo={false} format={(percent) => percent} />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
