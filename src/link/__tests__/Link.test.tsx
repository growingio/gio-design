import { render, screen } from '@testing-library/react';
import React from 'react';
import Link from '..';

describe('Testing Link', () => {
  it('should render correctly', () => {
    const { container } = render(<Link href="//example.com">link</Link>);
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('a')).toHaveClass('gio-link');
    expect(container.querySelector('a')).toHaveAttribute('href', '//example.com');
  });
  it('should render with className', () => {
    const { container } = render(<Link href="//example.com" className="test" />);
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('a')).toHaveClass('gio-link test');
  });
  it('render woth prop disabled', () => {
    const { container } = render(<Link href="//example.com" disabled />);
    expect(container.querySelector('span')).toBeInTheDocument();
    expect(container.querySelector('span')).toHaveClass('gio-link gio-link_disabled');
    expect(container.querySelector('.gio-link')).not.toHaveAttribute('href');
  });
  it('render with component', () => {
    const { container } = render(<Link href="//example.com" component="strong" />);
    expect(container.querySelector('strong')).toBeInTheDocument();
  });
  it('render with target', () => {
    const { container } = render(<Link href="//example.com" target="_blank" />);
    expect(container.querySelector('a')).toHaveAttribute('target', '_blank');
  });
  it('render with prefix', () => {
    const { container } = render(<Link href="//example.com" prefix={<span>$$</span>} />);
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(screen.queryByText('$$')).toBeTruthy();
    expect(container.querySelector('a')).toHaveAttribute('href', '//example.com');
  });
  it('render with prop loading', () => {
    const { container } = render(<Link href="//example.com" loading />);
    expect(container.querySelector('a')).not.toBeInTheDocument();
    expect(container.querySelector('span')).toHaveClass('gio-link gio-link_loading');
    expect(screen.queryByLabelText('loading-two-tone')).toBeTruthy();
  });
  it('render with prop loading and prefix', () => {
    const { container } = render(<Link href="//example.com" loading prefix={<span>$$</span>} />);
    expect(container.querySelector('a')).not.toBeInTheDocument();
    expect(screen.queryByText('$$')).toBeFalsy();
    expect(container.querySelector('span')).toHaveClass('gio-link gio-link_loading');
    expect(screen.queryByLabelText('loading-two-tone')).toBeTruthy();
  });
});
