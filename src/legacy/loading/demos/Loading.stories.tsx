import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { LoadingOutlined } from '@gio-design/icons';
import Docs from './LoadingPage';
import Loading from '../index';
import Button from '../../button';
import Tabs, { TabPane } from '../../../components/tabs';
import { LoadingProps } from '../interface';
import '../style';

export default {
  title: 'Legacy/Loading',
  component: Loading,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1142',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const defaultTabs = (
  <Tabs>
    <TabPane tab="我的" key="1">
      <ul>
        <li>Event 1</li>
        <li>Event 1</li>
        <li>Event 1</li>
        <li>Event 1</li>
      </ul>
    </TabPane>
    <TabPane tab="全部" key="2">
      <ul>
        <li>Event 2</li>
        <li>Event 2</li>
        <li>Event 2</li>
        <li>Event 2</li>
      </ul>
    </TabPane>
    <TabPane tab="共享" key="3">
      <ul>
        <li>Event 3</li>
        <li>Event 3</li>
        <li>Event 3</li>
        <li>Event 3</li>
      </ul>
    </TabPane>
  </Tabs>
);

const Template: Story<LoadingProps> = (args) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: true,
  titlePosition: 'right',
  autoCenter: true,
};

export const Container = Template.bind({});
Container.args = {
  children: defaultTabs,
};

export const Indicator = Template.bind({});

Indicator.args = {
  indicator: <LoadingOutlined rotating />,
  title: false,
};

Indicator.story = {
  parameters: {
    design: {
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A1159',
    },
  },
};

interface DelayProps {
  delay: number;
}

const DelayTemplate: Story<DelayProps> = (args) => {
  const { delay } = args;
  const [loading, setLoading] = React.useState(true);
  return (
    <>
      <Loading titlePosition="right" loading={loading} delay={delay}>
        {defaultTabs}
      </Loading>
      <br />
      <Button onClick={() => setLoading(!loading)}>click me</Button>
    </>
  );
};

export const Delay = DelayTemplate.bind({});
Delay.args = {
  delay: 1000,
};
