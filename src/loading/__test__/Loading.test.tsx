import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from '../index';

import { Default } from '../demos/Loading.stories';

describe('Test Loading', () => {
  const getLoading = (args: any) => <Loading {...args}>这是一个测试</Loading>;

  it('default', () => {
    const wrapper = render(<Default {...Default.args} />);
    expect(wrapper).toBeTruthy();
  });

  it('default', () => {
    const { container } = render(<Loading />);
    expect(container.getElementsByClassName('gio-loading')).toHaveLength(1);
  });

  it('props titlePosition and title', () => {
    const { container } = render(getLoading({ titlePosition: 'right', title: '测试' }));
    expect(container.getElementsByClassName('.gio-loading-title-right')).toBeTruthy();
  });

  it('props indicator', () => {
    const { rerender } = render(
      <Loading size="large">
        <div>测试</div>
      </Loading>
    );
    rerender(
      <Loading>
        <div>测试</div>
      </Loading>
    );
    expect(screen.getByText('测试')).toBeTruthy();
  });
  it('props titlePosition and title', () => {
    const { container } = render(getLoading({ titlePosition: 'right', title: '测试' }));
    expect(container.getElementsByClassName('.gio-loading-title-right')).toBeTruthy();
  });

  it('props delay', () => {
    const wrapper = render(getLoading({ delay: 500, loading: false }));
    expect(wrapper).toBeTruthy();
  });

  it('props blurColor', () => {
    const wrapper = render(getLoading({ blurColor: 'black' }));
    expect(wrapper).toBeTruthy();
  });

  it('props indicator', () => {
    const { container } = render(getLoading({ indicator: 'indicator' }));
    expect(container.getElementsByClassName('.gio-loading-indicator')).toBeTruthy();
  });
});
