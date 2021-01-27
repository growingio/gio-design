import React from 'react';
import { render } from '@testing-library/react';
import { Row, Col } from '..';

describe('Testing Grid', () => {
  it('should be stable', () => {
    const { asFragment } = render(
      <Row gutter={[10, 10]}>
        <Col span={3}>0</Col>
        <Col order={1}>3</Col>
        <Col>1</Col>
        <Col span={7}>
          <Row>
            <Col span={6} offset={3}>
              4
            </Col>
            <Col span={3}>5</Col>
          </Row>
        </Col>
      </Row>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
