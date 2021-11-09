import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { CalendarOutlined } from '@gio-design/icons';
import ListPickerPage from './ListPickerPage';
import ListPicker from '../ListPicker';
import { ListPickerProps } from '../interfaces';
import Typography from '../../typography';

import '../style';
import '../../typography/style';
import './ListPicker.stories.less';

const defaultItems = Array.from({ length: 5 }, (_, index) => index).map((i) => ({
  value: `item-${i}`,
  children: `Item ${i}`,
}));
const Wrapper = ({ children }: { children?: React.ReactNode }) => <div className="demo-list-wrapper">{children}</div>;
const Template: Story<ListPickerProps> = (args) => (
  <Wrapper>
    <ListPicker onSelect={action('selected value')} {...args} />
  </Wrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  items: defaultItems,
};

const itemsWithSubgroup = [
  {
    title: 'Group 3',
    items: Array.from({ length: 5 }, (_, index) => index).map((i) => ({
      value: `group-3-item-${i}`,
      children: `Item ${i}`,
    })),
  },
  {
    title: 'Group 2',
    items: Array.from({ length: 15 }, (_, index) => index).map((i) => ({
      value: `group-2-item-${i}`,
      children: `Item ${i}`,
    })),
  },
  {
    key: 'group-1',
    title: 'Group 1',
    subgroups: Array.from({ length: 5 }, (_, index) => index).map((i) => ({
      key: `group-1-subgroup-${i}`,
      title: `Subgroup ${i}`,
      items: Array.from({ length: 20 }, (_, index) => index).map((j) => ({
        value: `group-1-subgroup-${i}-item-${j}`,
        children: `Item ${j}`,
      })),
    })),
  },
];
export const Groups = Template.bind({});
Groups.args = {
  groups: itemsWithSubgroup,
  expandable: true,
};

export const Empty = Template.bind({});
Empty.args = {};

export const Size = () => (
  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
    <Wrapper>
      <ListPicker items={defaultItems} />
    </Wrapper>
    <Wrapper>
      <ListPicker items={defaultItems} size="small" />
    </Wrapper>
  </div>
);

export const Disabled = Template.bind({});
Disabled.args = {
  items: Array.from({ length: 7 }, (_, index) => index).map((i) => ({
    value: i,
    children: `文本 ${i}`,
    disabled: i === 3,
  })),
};

export const IconList = Template.bind({});
IconList.args = {
  items: Array.from({ length: 5 }, (_, index) => index).map((i) => ({
    value: `icon-item-${i}`,
    children: (
      <>
        <CalendarOutlined /> {`Item ${i}`}
      </>
    ),
  })),
};

export const Ellipsis = Template.bind({});
Ellipsis.args = {
  items: Array.from({ length: 8 }, (_, index) => index).map((i) => {
    if (i === 2) {
      return {
        value: `${i}`,
        children: <Typography.Text>超长文本超长文本超长文本超长文本超长文本超长文本超长文本超长文本</Typography.Text>,
      };
    }
    return {
      value: i,
      children: `文本 ${i}`,
    };
  }),
};

export default {
  title: 'Components/ListPicker',
  component: ListPicker,
  subcomponents: {
    Divider: ListPicker.Divider,
    Item: ListPicker.Item,
    Group: ListPicker.Group,
    Subgroup: ListPicker.Subgroup,
  },
  parameters: {
    docs: {
      page: ListPickerPage,
    },
  },
} as Meta;
