/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../../button';
import Link from '../../legacy/link';
import Tag from '../../tag';
import Banner, { BannerProps } from '../index';
import Docs from './BannerPage';
import '../style';

export default {
  title: 'Components/Banner',
  component: Banner,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const baseContent = (
  <div className="alert-close">
    <span>【GrowingIO在线公共课】欧治云商运营负责人复盘B2B增长实践</span>
    <Button type="secondary" size="small" style={{ margin: '0 0 0 8px' }}>
      立即报名
    </Button>
  </div>
);

const alertContent = (
  <div className="alert-close">
    <span>尊敬的客户您好，工单系统将于2月2日～2月10日暂停服务。</span>
    <Link component="a" to="#">
      查看详情
    </Link>
  </div>
);

const closeableContent = (
  <div className="alert-close" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <div className="alert-close-l">
      <Tag color="beta" size="small" style={{ margin: '0 8px 0 0' }}>
        试用中
      </Tag>
      <span>试用14天后结束</span>
    </div>
    <div className="alert-close-r">
      <span style={{ margin: '0 8px 0 100px' }}>客服专线：010-50914714</span>
      <Button type="secondary" size="small" style={{ margin: '0 8px 0 0' }}>
        商务咨询
      </Button>
    </div>
  </div>
);

const Template: Story<BannerProps> = (args) => <Banner {...args} />;
export const Base = Template.bind({});
export const Alert = Template.bind({});
export const Closeable = Template.bind({});
Base.args = {
  content: baseContent,
  type: 'normal',
  closeable: false,
};
Alert.args = {
  content: alertContent,
  type: 'alert',
  closeable: false,
};
Closeable.args = {
  content: closeableContent,
  type: 'normal',
  closeable: true,
};
