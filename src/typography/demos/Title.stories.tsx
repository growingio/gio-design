import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Typography from '../index';
import TitlePage from './TitlePage';
import '../style';

export const Default = () => (
  <>
    <Typography.Title level={1}>Title 标题</Typography.Title>
    <Typography.Title level={2}>Title 标题</Typography.Title>
    <Typography.Title level={3}>Title 标题</Typography.Title>
    <Typography.Title level={4}>Title 标题</Typography.Title>
  </>
);
export default {
  title: 'Upgraded/Typography/Title',
  component: Typography.Title,
  parameters: {
    docs: {
      page: TitlePage,
    },
  },
} as Meta;
