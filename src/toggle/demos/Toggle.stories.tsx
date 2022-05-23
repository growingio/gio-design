import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import { action } from '@storybook/addon-actions';
import Toggle from '../index';
import { ToggleProps } from '../interface';
import '../style';
import Docs from './TogglePage';

export default {
  title: 'Upgraded/Toggle',
  component: Toggle,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37806',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<ToggleProps> = (args) => <Toggle {...args} />;

export const Default = Template.bind({});

export const Disabled = () => <Toggle disabled />;

export const CheckedChildrenAndUnCheckedChildren = () => (
  <Toggle checkedChildren={<span>开启</span>} uncheckedChildren={<span>关闭</span>} />
);

export const DefaultOn = () => <Toggle defaultOn />;

export const Children = () => <Toggle>Children</Toggle>;

export const On = () => <Toggle on />;

export const OnChange = () => (
  <>
    <Toggle
      onChange={(e) => {
        action('e');
        console.log(e, 'toggleOnChange');
      }}
      dataTestId="123"
      data-testid="123"
    />
  </>
);
