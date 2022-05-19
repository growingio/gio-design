import { render, screen } from '@testing-library/react';
import React from 'react';
import SkeletonImage from '../Image';
import Skeleton from '../Skeleton';

describe('Testing Skeleton ', () => {
  it('without params', () => {
    render(<Skeleton />);
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('has params', () => {
    render(
      <Skeleton loading delay={500} paragraph={{ row: 4, width: '100%' }} active={false} avatar={{ size: 'small' }} />
    );
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('has only title', () => {
    render(<Skeleton paragraph={{ row: 4, width: '100%' }} title />);
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('has title paragraph', () => {
    render(<Skeleton title />);
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('rowWidth is array', () => {
    render(<Skeleton paragraph={{ row: 3, width: ['100%', 200, '100%'] }} />);
    expect(screen.getByTestId('skeleton')).toBeTruthy();
  });

  it('loading is false', () => {
    render(<Skeleton loading={false} />);
  });

  it('SkeletonImage', () => {
    render(<SkeletonImage delay={500} width={200} color="#000000" />);
  });

  it('SkeletonImage loading false', () => {
    render(<SkeletonImage loading={false} />);
  });
});
