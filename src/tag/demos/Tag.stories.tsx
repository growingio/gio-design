import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import Docs from './TagPage';
import { TagProps } from '../interface';
import Tag from '../index';
import '../style';

export default {
  title: 'Upgraded/Tag',
  component: Tag,
  parameters: {
    docs: {
      page: Docs,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4092%3A41171',
      allowFullscreen: true,
    },
  },
} as Meta<TagProps>;

export const Default: Story<TagProps> = (args) => <Tag {...args}>Default Tag</Tag>;

export const StatusAndTypes = () => (
  <>
    <div style={{ display: 'flex', columnGap: 16, marginBlock: 16 }}>
      <Tag type="normal" status="default">
        Default
      </Tag>
      <Tag type="normal" status="success">
        Success
      </Tag>
      <Tag type="normal" status="info">
        Info
      </Tag>
      <Tag type="normal" status="warning">
        Warning
      </Tag>
      <Tag type="normal" status="error">
        Error
      </Tag>
      <Tag type="normal" status="draft">
        Draft
      </Tag>
    </div>
    <div style={{ display: 'flex', columnGap: 16 }}>
      <Tag type="highlight" status="default">
        Default
      </Tag>
      <Tag type="highlight" status="success">
        Success
      </Tag>
      <Tag type="highlight" status="info">
        Info
      </Tag>
      <Tag type="highlight" status="warning">
        Warning
      </Tag>
      <Tag type="highlight" status="error">
        Error
      </Tag>
      <Tag type="highlight" status="draft">
        Draft
      </Tag>
    </div>
  </>
);

export const Sizes = () => (
  <>
    <Tag size="small" style={{ marginRight: 16 }}>
      Small
    </Tag>
    <Tag size="middle">Middle</Tag>
  </>
);

export const Closable = () => (
  <Tag closable onClose={action('tag onClose')}>
    Default
  </Tag>
);

export const Disabled = () => <Tag disabled>Default</Tag>;
