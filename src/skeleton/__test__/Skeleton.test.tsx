import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default, Image } from '../demos/Skeleton.stories';
import Skeleton from '../index';

describe('Testing skeleton', () => {
  it('basic skeleton', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.getElementsByClassName('gio-skeleton-content')).toHaveLength(1);
  });

  it('image skeleton', () => {
    const { container } = render(<Image {...Image.args} />);
    expect(container.getElementsByClassName('gio-skeleton-image')).toHaveLength(1);
  });

  it('without avatar and title', () => {
    const { container } = render(
      <Skeleton paragraph={false} title={false}>
        子组件
      </Skeleton>
    );
    expect(container.getElementsByClassName('gio-skeleton')).toHaveLength(1);
  });

  it('image skeleton', () => {
    render(
      <Skeleton avatar paragraph loading={false}>
        <span>子组件</span>
      </Skeleton>
    );
  });

  it('image skeleton', () => {
    render(
      <Skeleton.Image>
        <span>子组件</span>
      </Skeleton.Image>
    );
  });

  it('image skeleton width false loading', () => {
    const { container } = render(
      <Skeleton.Image loading={false} width={120} color="red">
        <span>子组件</span>
      </Skeleton.Image>
    );
    expect(screen.getByText('子组件')).toBeTruthy();
    expect(container.getElementsByClassName('gio-skeleton')).toHaveLength(0);
  });
});
