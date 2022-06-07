import { render } from '@testing-library/react';
import React from 'react';
import Col from '..';
import Row from '../../row';

describe('Testing Col', () => {
  it('should render correctly', () => {
    const { container } = render(<Col />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-col');
  });
  it('should render with className', () => {
    const { container } = render(<Col className="test" />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-col test');
  });
  it('should render with order prop', () => {
    const { container } = render(<Col order={1} />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-col-order-1');
  });
  it('should render with span prop', () => {
    const { container } = render(<Col span={2} />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-col-span-2');
  });
  it('should render with offset prop', () => {
    const { container } = render(<Col offset={2} />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-col-offset-2');
  });
  it('render by component li', () => {
    const { container } = render(<Col component="li" />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });
  it(' render wrapped by Row', () => {
    const { container } = render(
      <Row gutter={10}>
        <Col span={2}>
          <div className="box">
            <div>1</div>
          </div>
        </Col>
      </Row>
    );
    expect(container.querySelector('div.gio-col')).toHaveStyle('padding: 5px 5px 5px 5px;');
  });
});
