import { render } from '@testing-library/react';
import React from 'react';
import Divider from '..';

describe('Tesing Divider', () => {
  it('should render correctly', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveClass('gio-divider gio-divider_horizontal');
  });

  it('should render with orientation prop vertical', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveClass('gio-divider gio-divider_vertical');
  });
  it(' render with flexItem prop true', () => {
    const { container } = render(<Divider flexItem />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveClass('gio-divider gio-divider_flex_item');
  });
  it('render with className orientation flexItem', () => {
    const { container } = render(<Divider className="test" flexItem orientation="horizontal" />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveClass('gio-divider gio-divider_flex_item test');
  });
  it('render with className', () => {
    const { container } = render(<Divider className="test" />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveClass('gio-divider test');
  });
  it('render with style', () => {
    const { container } = render(<Divider style={{ color: 'red' }} />);
    expect(container.querySelector('hr')).toBeInTheDocument();
    expect(container.querySelector('hr')).toHaveStyle('color: red');
  });
  it('test ref', () => {
    const ref = React.createRef<HTMLHRElement>();
    render(<Divider ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
