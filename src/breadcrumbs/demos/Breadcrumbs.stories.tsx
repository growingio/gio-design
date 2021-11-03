import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { HomeOutlined, RightDoubleOutlined, ShareOutlined, TagOutlined } from '@gio-design/icons';
import Breadcrumbs, { BreadcrumbsProps } from '..';
import Link from '../../link';
import '../style';
import Docs from './BreadcrumbsPage';

export default {
  title: 'Upgraded/Breadcrumbs',
  component: Breadcrumbs,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4061%3A35944',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;
const DemoTemplate = () => (
  <>
    <table className="table-demo">
      <tr>
        <th>Breadcrumbs</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>normal</td>
        <td>
          <Breadcrumbs>
            <Link href="/">1级面包屑</Link>
            <Link href="/">2级面包屑</Link>
            <Link href="/">3级面包屑</Link>
            <Link href="/">4级面包屑</Link>
          </Breadcrumbs>
        </td>
      </tr>
      <tr>
        <td>icon</td>
        <td>
          <Breadcrumbs>
            <Link prefix={<HomeOutlined />} href="/">
              主页
            </Link>
            <Link prefix={<ShareOutlined />} href="https://www.growingio.com">
              二级导航
            </Link>
            <Link prefix={<TagOutlined />} aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
              当前页面
            </Link>
          </Breadcrumbs>
        </td>
      </tr>
      <tr>
        <td>custom separator</td>
        <td>
          <Breadcrumbs separator=">">
            <Link href="/">主页</Link>
            <Link href="https://www.growingio.com">二级导航</Link>
            <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
              当前页面
            </Link>
          </Breadcrumbs>
          <br />
          <Breadcrumbs separator="-">
            <Link href="/">主页</Link>
            <Link href="https://www.growingio.com">二级导航</Link>
            <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
              当前页面
            </Link>
          </Breadcrumbs>
          <br />
          <Breadcrumbs separator={<RightDoubleOutlined size="14px" />}>
            <Link href="/">主页</Link>
            <Link href="https://www.growingio.com">二级导航</Link>
            <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
              当前页面
            </Link>
          </Breadcrumbs>
        </td>
      </tr>
    </table>
  </>
);
export const Demo = DemoTemplate.bind({});

const Template: Story<BreadcrumbsProps> = (args) => (
  <>
    <Breadcrumbs {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumbs>
  </>
);

export const Default = Template.bind({});
Default.args = {
  separator: '/',
};

const IconTemplate: Story<BreadcrumbsProps> = (args) => (
  <>
    <Breadcrumbs {...args}>
      <Link prefix={<HomeOutlined />} href="/">
        主页
      </Link>
      <Link prefix={<ShareOutlined />} href="https://www.growingio.com">
        二级导航
      </Link>
      <Link prefix={<TagOutlined />} aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumbs>
  </>
);

export const IconBreadcrumb = IconTemplate.bind({});
IconBreadcrumb.args = {
  separator: '/',
};

const CustomSeparatorTemplate: Story<BreadcrumbsProps> = (args) => (
  <>
    <Breadcrumbs separator=">" {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumbs>
    <br />
    <Breadcrumbs separator="-" {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumbs>
    <br />
    <Breadcrumbs separator={<RightDoubleOutlined size="14px" />} {...args}>
      <Link href="/">主页</Link>
      <Link href="https://www.growingio.com">二级导航</Link>
      <Link aria-current="page" href="/?path=/story/upgraded-breadcrumb--default">
        当前页面
      </Link>
    </Breadcrumbs>
  </>
);

export const CustomSeparator = CustomSeparatorTemplate.bind({});
CustomSeparator.args = {};
