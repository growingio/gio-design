import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Button from '../button';
import Banner, { BannerProps } from './index';
import './style'

export default {
    title: 'Components/Functional/Banner',
    component: Banner,
} as Meta;

const normalContent = (
  <div className="alert-close">
    【GrowingIO在线公共课】欧治云商运营负责人复盘B2B增长实践
    <Button type="secondary" size="small" style={{ margin: '0 0 0 8px' }}>
      立即报名
    </Button>
  </div>
);

const Template : Story<BannerProps> = (args) => <Banner {...args} />;
export const Default = Template.bind({});
Default.args = {
    content: normalContent,
    type: 'normal',
    closeable: true,
}