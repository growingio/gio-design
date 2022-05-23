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
    const { container } = render(
      <Skeleton loading delay={500} paragraph={{ row: 4, width: '100%' }} active={false} avatar={{ size: 'small' }} />
    );
    expect(container.getElementsByClassName('gio-skeleton-paragraph')[0].getElementsByTagName('p').length).toBe(4);
  });

  it('has title paragraph', () => {
    const { container } = render(<Skeleton paragraph={{ row: 4, width: '100%' }} title />);
    expect(container.getElementsByClassName('gio-skeleton-title').length).toBe(1);
    expect(container.getElementsByClassName('gio-skeleton-paragraph')[0].getElementsByTagName('p').length).toBe(4);
  });

  it('has only title', () => {
    const { container } = render(<Skeleton title />);
    expect(container.getElementsByClassName('gio-skeleton-title').length).toBe(1);
  });

  it('rowWidth is array', () => {
    const { container } = render(<Skeleton paragraph={{ row: 3, width: [200, 300, '100%'] }} />);
    expect(container.getElementsByClassName('gio-skeleton-paragraph')[0].getElementsByTagName('p').length).toBe(3);
    expect(container.getElementsByClassName('gio-skeleton-paragraph')[0].getElementsByTagName('p')[0].style.width).toBe(
      '200px'
    );
  });

  it('loading is false', () => {
    render(<Skeleton loading={false}>内容</Skeleton>);
    expect(screen.getByText('内容')).toBeTruthy();
  });

  it('SkeletonImage', () => {
    const { container } = render(<SkeletonImage delay={500} width={200} color="#000000" />);
    expect(container.getElementsByClassName('gio-skeleton-image').length).toBe(1);
  });

  it('SkeletonImage loading false', () => {
    const { container } = render(<SkeletonImage loading={false}>内容</SkeletonImage>);
    expect(container.getElementsByClassName('gio-skeleton-image').length).toBe(0);
    expect(screen.getByText('内容')).toBeTruthy();
  });
});
