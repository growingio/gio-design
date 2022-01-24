import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { HomeOutlined, RightOutlined } from '@gio-design/icons';
import Breadcrumbs, { BreadcrumbsProps } from '..';
import Link from '../../link';
import '../style';
import Docs from './BreadcrumbsPage';

export default {
  title: 'Upgraded/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4061%3A35944',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<BreadcrumbsProps> = (args) => (
  <Breadcrumbs {...args}>
    <Link prefix={<HomeOutlined size="14px" />} href="/?path=/story/upgraded-breadcrumbs--default">
      Home
    </Link>
    <Link href="/?path=/story/upgraded-breadcrumbs--default">Second</Link>
    <span>Current</span>
  </Breadcrumbs>
);

export const Separator = () => (
  <>
    <Breadcrumbs separator="->">
      <Link href="/?path=/story/upgraded-breadcrumbs--default">Home</Link>
      <Link href="/?path=/story/upgraded-breadcrumbs--default">Second</Link>
      <span>Current</span>
    </Breadcrumbs>
    <br />
    <Breadcrumbs separator={<RightOutlined size="14px" />}>
      <Link href="/?path=/story/upgraded-breadcrumbs--default">Home</Link>
      <Link href="/?path=/story/upgraded-breadcrumbs--default">Second</Link>
      <span>Current</span>
    </Breadcrumbs>
  </>
);
