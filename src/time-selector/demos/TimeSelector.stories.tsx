import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';
import TimeSelector from '../TimeSelector';
import Docs from './TimeSelector.mdx';

import '../style';

export default {
  title: 'Selectors/TimeSelector',
  component: TimeSelector,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Components?node-id=4078%3A49236',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story = (args) => (
  <div style={{ width: 160 }}>
    <TimeSelector onSelect={action('selected time:')} {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {};

export const ShowSecond = Template.bind({});
ShowSecond.args = {
  showSecond: true,
};
