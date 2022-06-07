import { render, screen } from '@testing-library/react';
import React from 'react';
import Row from '..';
import { Col } from '../..';

describe('Testing Row', () => {
  it('should render correctly', () => {
    const { container } = render(<Row />);
    expect(container.querySelector('div')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('gio-row');
  });

  it('render with prop gutter', () => {
    const { container } = render(<Row gutter={10} />);
    expect(container.querySelector('div.gio-row')).toHaveStyle('margin: -5px -5px 5px -5px;');
  });
  it('render with array gutter value', () => {
    const { container } = render(
      <Row component="ul" gutter={[10, 20]}>
        <Col component="li" span={6} />
        <Col component="li" span={6} />
      </Row>
    );
    screen.debug();
    expect(container.querySelector('ul')).toBeInTheDocument();
    expect(container.querySelector('ul')).toHaveStyle('margin: -10px -5px 10px -5px;');
    expect(container.querySelector('li:first-child')).toHaveStyle('padding: 10px 5px 10px 5px');
  });
});
