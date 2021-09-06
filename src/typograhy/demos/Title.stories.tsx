import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Typography from '../index';
import TitlePage from './TitlePage';
import { TitleProps } from '../Title';

import '../style';

const { Title } = Typography;

const Template: Story<TitleProps> = (args) => <Title {...args} />;

export const H1 = Template.bind({});
H1.args = {
  level: 1,
  children: 'Title 标题',
};

export default {
  title: 'Typography/Title',
  component: Title,
  parameters: {
    docs: {
      page: TitlePage,
    },
  },
} as Meta;
