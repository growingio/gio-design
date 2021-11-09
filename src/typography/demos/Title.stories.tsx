import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Typography from '../index';
import TitlePage from './TitlePage';
import '../style';

const { Title } = Typography;

export const Default = () => (
  <>
    <Title level={1}>Title 标题</Title>
    <Title level={2}>Title 标题</Title>
    <Title level={3}>Title 标题</Title>
    <Title level={4}>Title 标题</Title>
  </>
);
export default {
  title: 'Components/Title',
  component: Title,
  parameters: {
    docs: {
      page: TitlePage,
    },
  },
} as Meta;
