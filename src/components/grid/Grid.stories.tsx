import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { Row, Col } from './index';
import { RowProps, ColProps } from './interface';
import './style/index.less';
import './style/row.less';
import './style/demo.stories.less';

export default {
  title: 'Basic Components/Grid',
  component: Row,
} as Meta;

const Template: Story<RowProps & ColProps> = (args) => {
  const { gutter, direction, justify, alignItems, alignContent, wrap, order, span, offset } = args;
  const rowProps = { gutter, direction, justify, alignItems, alignContent, wrap };
  const rolProps = { order, span, offset };
  return (
    <div className="grid-demo">
      <Row {...args}>
        <Col span={12} className="box">
          <div>100%</div>
        </Col>
      </Row>
      <Row {...rowProps}>
        <Col span={4} className="box" {...rolProps}>
          <div>对参数的修改可在此处看到效果</div>
        </Col>
        <Col span={4} className="box">
          <div>33.33%</div>
        </Col>
        <Col span={4} className="box">
          <div>33.33%</div>
        </Col>
      </Row>
      <Row {...args}>
        <Col span={3} className="box">
          <div>25%</div>
        </Col>
        <Col span={3} className="box">
          <div>25%</div>
        </Col>
        <Col span={3} className="box">
          <div>25%</div>
        </Col>
        <Col span={3} className="box">
          <div>25%</div>
        </Col>
      </Row>
      <Row {...args}>
        <Col span={8} className="box">
          <div>66.66%</div>
        </Col>
        <Col span={4} className="box">
          <div>33.33%</div>
        </Col>
      </Row>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  gutter: [0, 10],
  direction: 'row',
  justify: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'stretch',
  wrap: 'wrap',
  order: 0,
  span: 4,
  offset: 0,
};
