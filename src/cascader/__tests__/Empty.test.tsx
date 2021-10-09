import React from 'react';
import { render, screen } from '@testing-library/react';
import Empty from '../empty';

describe('<Empty />', () => {
  it('should provider a default tips', () => {
    render(<Empty />);

    expect(screen.getByText('暂无数据')).toBeTruthy();
  });
});
