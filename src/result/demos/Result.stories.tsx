import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from '@storybook/addon-actions';
import React from "react";
import { ArrowsLeftOutlined, ErrorFilled, ErrorOutlined, ReloadOutlined } from "@gio-design/icons";
import Result, { ResultProps } from "..";
import { Button, Card, Link } from "../..";
import Docs from './ResultPage'
import '../style'

export default {
  title: 'upgraded/Result',
  component: Result,
  parameters: {
    docs: {
      page: Docs,
    },
    argTypes: {
      description: {
        control: { type: 'text' },
      },
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45839',
      allowFullscreen: true,
    },
  },
} as Meta;
const DefaultTemplate: Story<ResultProps> = (args) => <Result {...args} />;
export const Default = DefaultTemplate.bind({});
Default.args = {
  type: 'empty',
  extra: <Button type="primary" >返回首页</Button>
}

export const NotFound = () => <Result type="404" extra={<Button prefix={<ArrowsLeftOutlined />} type="primary">Back Home</Button>} />;

export const Unauthorized = () => <Result type="403" extra={<Button type="primary" >返回首页</Button>} />;

export const ServerError = () => <Result type="500" title="Oooops!!!" description="Sorry, something went wrong." extra={<Button type="primary" prefix={<ArrowsLeftOutlined />}>返回首页</Button>} />;

export const Error = () => <Result

  image={<ErrorFilled color="#ff688f" size="64" />}
  title="Submission Failed"
  description="Please check and modify the following information before resubmitting."
  extra={<><Button type="primary" >Submit Again</Button><Button type="secondary">Back to list</Button></>}
>
  <div className="error-list">
    <div>
      <h3 style={{ fontSize: '16px', lineHeight: '24px' }}>
        The content you submitted has the following error:
      </h3>
    </div>
    <p style={{ color: '#7b819c' }}>
      <ErrorOutlined style={{ color: '#ff688f', marginRight: '8px' }} />
      Verification fails and does not meet the template specifications. Please refill the template.
      <Link href="#;">Reselect &gt;</Link>
    </p>
    <p style={{ color: '#7b819c' }}>
      <ErrorOutlined style={{ color: '#ff688f', marginRight: '8px' }} />
      Verification fails and does not meet the template specifications. Please refill the template.
      <Link href="#;">Reselect &gt;</Link>
    </p>
  </div>
</Result>

export const Deleted: Story<ResultProps> = () => <Result type="410" title={<div>该单图已删除<Link style={{ marginLeft: '8px' }} href="#;" onClick={() => action('onClick:从当前看板中移除')}>从当前看板中移除</Link></div>} />;

export const Locked: Story<ResultProps> = () => <Result type="423" title="" extra={<div>此看板已取消与你共享<Link style={{ marginLeft: '8px' }} href="#;" onClick={() => action('onClick:取消订阅')}>取消订阅</Link></div>} />;

export const EmptyResult: Story<ResultProps> = () => <Result type="empty-result" description="没有搜索到相关结果" extra={<Button onClick={() => action('onClick:重新查询')}>重新查询</Button>} />;

export const Empty: Story<ResultProps> = () => <Result type="empty" description="你还没有创建内容，快去创建一个吧" extra={<Button onClick={() => action('onClick:新 建')}>新 建</Button>} />;

export const EmptyChart: Story<ResultProps> = () => <Result type="empty-chart" description="你还没有属于自己的看板，快去新建一个吧" extra={<Button onClick={() => action('onClick:新建看板')}>新建看板</Button>} />;

export const EmptyData: Story<ResultProps> = () => <Result type="empty-chart" description="当前查询条件下暂无数据" extra={<Button prefix={<ReloadOutlined />} onClick={() => action('onClick:刷新')}>刷新</Button>} />;

export const EmptySmallSize = () => <div>
  <Card style={{ width: '320px' }}>
    <Result type="empty" size="small" description="未创建相关内容" extra={<Button size="small" onClick={() => action('onClick:新 建')}>新 建</Button>} />
  </Card>
</div>
export const ErrorPageSmallSize = () => <div>
  <Card style={{ width: '320px' }}>
    <Result type="410" size="small" title description extra={<div>该单图已删除<Link style={{ marginLeft: '8px' }} href="#;" onClick={() => action('onClick:从当前看板中移除')}>从当前看板中移除</Link></div>} />
  </Card>
</div>