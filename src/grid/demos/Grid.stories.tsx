import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Row, { RowProps } from '../../row';
import Col, { ColProps } from '../../col';
import Grid from '../Grid';
import '../style/index.less';
import '../../row/style';
import '../../col/style';
import '../style/demo.stories.less';
import Docs from './GridPage';

export default {
  title: 'upgraded/Grid',
  component: Grid,
  subcomponents: { Row, Col },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const GridDemo: Story<RowProps & ColProps> = () => (
    <Grid className="grid-demo">
    <div  className="box">
      <div>1</div>
    </div>
    <div  className="box">
      <div>2</div>
    </div>
    <div  className="box">
      <div>3</div>
    </div>
    <div  className="box">
      <div>4</div>
    </div>
    <div  className="box">
      <div>5</div>
    </div>
    </Grid>
  );



  export const RowDefault: Story<RowProps & ColProps> = () => (<div  className="grid-demo">
  <Row>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
    <Col span={2} className="box">
      <div>1/6</div>
    </Col>
  </Row>
  <Row>
    <Col span={4} className="box">
      <div>1/3</div>
    </Col>
    <Col span={4} className="box">
      <div>1/3</div>
    </Col>
    <Col span={4} className="box">
      <div>1/3</div>
    </Col>
  </Row>
  <Row>
    <Col span={6} className="box">
      <div>1/2</div>
    </Col>
    <Col span={6} className="box">
      <div>1/2</div>
    </Col>
  </Row>
  <Row>
    <Col span={12} className="box">
      <div>12/12</div>
    </Col>
  </Row>
</div>)

export const RowGutter: Story<RowProps & ColProps> = () => (<div  className="grid-demo">
    <Row gutter={[10,10]}>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
    </Row>
  </div>)


export const RowDirection: Story<RowProps & ColProps> = () => (<div  className="grid-demo">
    <Row direction="column">
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
      <Col span={2} className="box">
        <div>1/6</div>
      </Col>
    </Row>
  </div>)


export const ColOrder: Story<RowProps & ColProps> = () => (<div  className="grid-demo">
    <Row >
      <Col span={2} className="box" order={2}>
        <div>1| order:2</div>
      </Col>
      <Col span={2} className="box" order={3}>
        <div>2| order:3</div>
      </Col>
      <Col span={2} className="box" order={1}>
        <div>3| order:1</div>
      </Col>
      <Col span={2} className="box" order={6}>
        <div>4| order:6</div>
      </Col>
      <Col span={2} className="box" order={4}>
        <div>5| order:4</div>
      </Col>
      <Col span={2} className="box" order={5}>
        <div>6| order:5</div>
      </Col>
    </Row>
  </div>)
