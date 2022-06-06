import { render } from '@testing-library/react';
import React from 'react';
import Grid from '..';

describe('Testing Grid', () => {
  it('should render correctly', () => {
    const { container } = render(<Grid />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-grid');
  });
  it('should render with className', () => {
    const { container } = render(<Grid className="test" />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-grid test');
  });
  it('should render with style', () => {
    const { container } = render(<Grid style={{ color: 'red' }} />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveStyle('color: red');
  });
  it('render by component p', () => {
    const { container } = render(<Grid component="p" />);
    expect(container.querySelector('p')).toBeInTheDocument();
    expect(container.querySelector('p')).toHaveClass('gio-grid');
  });
  it('render with flex css prop', () => {
    const { container } = render(
      <Grid
        direction="column"
        alignContent="center"
        justify="center"
        alignItems="flex-start"
        wrap="nowrap"
        span={2}
        gap="10px"
      >
        <div className="box">
          <div>1</div>
        </div>
        <div className="box">
          <div>2</div>
        </div>
        <div className="box">
          <div>3</div>
        </div>
      </Grid>
    );
    expect(container.querySelector('div.gio-grid')).toHaveStyle(
      '--gio-grid-direction: column; --gio-grid-justify: center; --gio-grid-align-items: flex-start; --gio-grid-align-content: center; --gio-grid-span: 2; --gio-grid-gap: 10px; --gio-grid-wrap: nowrap;'
    );
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-collapse', 'false');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-container', 'false');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-full', 'false');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-gap', 'true');
  });
  it('render with container prop true and collapse prop true', () => {
    const { container } = render(
      <Grid container collapse span={12}>
        <div className="box">
          <div>1</div>
        </div>
        <div className="box">
          <div>2</div>
        </div>
        <div className="box">
          <div>3</div>
        </div>
      </Grid>
    );
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-collapse', 'true');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-container', 'true');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-full', 'true');
    expect(container.querySelector('div.gio-grid')).toHaveAttribute('data-gap', 'false');
  });
});
