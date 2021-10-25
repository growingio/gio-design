import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeOutlined, RightDoubleOutlined, ShareOutlined, TagOutlined } from '@gio-design/icons';
import Breadcrumb, { BreadcrumbProps } from '..';
import Link from '../../link';
import '../style';

export default {
  title: 'Upgraded/Breadcrumb',
  component: Breadcrumb,
} as Meta;

const Template: Story<BreadcrumbProps> = (args) => (
  <>
    <h3>简单的面包屑</h3>
    <Breadcrumb {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumb>
  </>
);

export const Default = Template.bind({});
Default.args = {
  separator: '/',
};

const IconTemplate: Story<BreadcrumbProps> = (args) => (
  <>
    <h3>带图标的面包屑</h3>
    <Breadcrumb {...args}>
      <Link prefix={<HomeOutlined />} href="/">
        主页
      </Link>
      <Link prefix={<ShareOutlined />} href="https://www.growingio.com">
        二级导航
      </Link>
      <Link prefix={<TagOutlined />} aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumb>
  </>
);

export const IconBreadcrumb = IconTemplate.bind({});
IconBreadcrumb.args = {
  separator: '/',
};

const CustomSeparatorTemplate: Story<BreadcrumbProps> = (args) => (
  <>
    <h3>自定义分隔符</h3>
    <Breadcrumb separator=">" {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumb>
    <br />
    <Breadcrumb separator="-" {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumb>
    <br />
    <Breadcrumb separator={<RightDoubleOutlined size="14px" />} {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumb>
  </>
);

export const CustomSeparator = CustomSeparatorTemplate.bind({});
CustomSeparator.args = {};
