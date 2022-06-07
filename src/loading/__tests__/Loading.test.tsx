import { render, screen } from '@testing-library/react';
import React from 'react';
import Loading from '..';
import { sleep } from '../../utils/test';

describe('Testing Loading', () => {
  it('should render correctly', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-loading');
  });
  it('render with prop size', () => {
    const { container } = render(<Loading size="small" />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-loading gio-loading-small');
  });

  it('render with children', () => {
    const { container } = render(
      <Loading loading>
        <div>content</div>
      </Loading>
    );
    expect(container.querySelector('div.gio-loading')).toBeInTheDocument();
    expect(screen.queryByText('content')).toBeTruthy();
  });
  it('render with prop indicator', () => {
    const { container } = render(<Loading indicator={<div>loading</div>} />);
    expect(container.querySelector('.gio-loading-indicator')).toBeInTheDocument();
    expect(screen.queryByText('loading')).toBeTruthy();
  });
  it('render with prop title and titlePosition', () => {
    const { container } = render(<Loading title="loading" titlePosition="right" />);
    expect(container.querySelector('.gio-loading-title')).toBeInTheDocument();
    expect(container.querySelector('.gio-loading-title')).toHaveClass('gio-loading-title-right');
  });
  it('render with prop blurColor black', () => {
    const { container } = render(
      <Loading blurColor="black">
        <div className="content">content</div>
      </Loading>
    );
    expect(container.querySelector('.gio-loading-container')).toHaveClass('gio-loading-container-blur-black');
  });
  it('set loading prop with delay', async () => {
    jest.useFakeTimers('modern');
    const { container, rerender } = render(<Loading delay={100} />);
    expect(container.querySelector('.gio-loading-ring')).toBeInTheDocument();
    rerender(<Loading loading={false} delay={100} />);
    expect(container.querySelector('.gio-loading-ring')).toBeInTheDocument();
    await sleep(100);
    jest.runOnlyPendingTimers();
    expect(container.querySelector('.gio-loading-ring')).not.toBeInTheDocument();
  });
});
