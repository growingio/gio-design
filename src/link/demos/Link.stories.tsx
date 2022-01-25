/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined } from '@gio-design/icons';
import { LinkProps } from '../interface';
import Link from '../Link';
import '../style';
import Docs from './LinkPage';
import { Button } from '../..';

export default {
  title: 'Upgraded/Link',
  component: Link,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6749%3A65551',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<LinkProps> = (args) => <Link {...args}>Default Link</Link>;
Default.args = {
  loading: false,
  disabled: false,
  href: '#',
};

export const Disabled: Story<LinkProps> = () => (
  <>
    <h4>如果 `disabled=true`，根标签会替换成 `span`</h4>
    <Link disabled href="#">
      Default Link
    </Link>
  </>
);

export const Loading: Story<LinkProps> = () => (
  <>
    <h4>如果 `loading=true`，根标签会替换成 `span`</h4>
    <Link loading href="#">
      Default Link
    </Link>
  </>
);

export const Prefix: Story<LinkProps> = () => (
  <Link prefix={<PlusOutlined size="14px" />} href="#">
    Default Link
  </Link>
);

export const Root: Story<LinkProps> = () => (
  <div>
    <Link component={Button} size="normal" type="secondary" style={{ margin: '0 2em 0 0' }}>
      Button Link
    </Link>

    <Link component="span">Span Tag</Link>
  </div>
);
