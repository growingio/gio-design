import { render } from '@testing-library/react';
import React from 'react';
import Progress from '..';

describe('Testing Progress', () => {
  it('should render correctly', () => {
    const { container } = render(<Progress />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-progress');
    expect(container.querySelector('div.gio-progress-stroke')).toHaveStyle('width: 0%;');
  });
  it('render with prop percent', () => {
    const { container } = render(<Progress percent={50} />);
    expect(container.querySelector('div.gio-progress-stroke')).toHaveStyle('width: 50%;');
    expect(container.querySelector('.gio-progress-text')).toHaveTextContent('50%');
    expect(container.querySelector('.gio-progress-active-icon')).not.toBeInTheDocument();
  });
  it('render with prop status active', () => {
    const { container } = render(<Progress status="active" />);
    expect(container.querySelector('div.gio-progress-stroke')).toHaveClass('gio-progress-active');
  });
  it('render with custom format', () => {
    const { container } = render(<Progress percent={50} format={(percent) => `完成${percent}%`} />);
    expect(container.querySelector('.gio-progress-text')).toHaveTextContent('完成50%');
  });
  it('render with prop size', () => {
    const { container } = render(<Progress size="small" />);
    expect(container.querySelector('div.gio-progress-trail')).toHaveClass('gio-progress-small');
  });
  it('render with prop status success', () => {
    const { container } = render(<Progress status="success" />);
    expect(container.querySelector('div.gio-progress-stroke')).toHaveClass('gio-progress-success');
    expect(container.querySelector('.gio-progress-success-icon')).toBeInTheDocument();
  });
  it('render with showInfo false', () => {
    const { container } = render(<Progress showInfo={false} />);
    expect(container.querySelector('div.gio-progress-text')).toBeNull();
  });
});
