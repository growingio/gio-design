import React from 'react';
import { render, screen } from '@testing-library/react';
import Grid, { Row, Col } from '..';
import { Default } from '../demos/Grid.stories';

describe('Testing Grid', () => {
  it('default grid', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByText('25%')).toHaveLength(4);
  });

  it('should be stable', () => {
    render(
      <Row gutter={[10, 10]}>
        <Col span={3}>0</Col>
        <Col order={1}>3</Col>
        <Col>1</Col>
        <Col span={7}>
          <Row gutter={undefined}>
            <Col span={6} offset={3}>
              4
            </Col>
            <Col span={3}>5</Col>
          </Row>
        </Col>
      </Row>
    );
    expect(screen.getAllByText(1)).toHaveLength(1);
  });

  it('empty grid', () => {
    render(<Grid />);
    expect(screen.queryByText(/^./)).toBeNull();
  });

  it('should render nested', () => {
    const { container } = render(
      <Grid
        span={12}
        gap={1}
        direction="row"
        wrap="wrap"
        justify="center"
        alignItems="center"
        alignContent="center"
        component="span"
        container
        collapse
      >
        <Row component="span" gutter={12}>
          <Col component="span">123</Col>
        </Row>
      </Grid>
    );
    expect(container.getElementsByClassName('gio-grid')).not.toBeNull();
  });
});
