/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import Divider, { DividerProps } from '..';
import Button from '../../button';
import '../style';
import Docs from './DividerPage';
import { Link, List } from '../..';

export default {
  title: 'Upgraded/Divider',
  component: Divider,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta<DividerProps>;

export const ListDivider: Story<DividerProps> = (args) => (
  <List style={{ background: '#e9f1f3', borderRadius: '4px' }}>
    <List.Item value="apple">Apple</List.Item>
    <Divider style={{ margin: 0 }} {...args} />
    <List.Item value="pumpkin">Pumpkin</List.Item>
    <Divider style={{ margin: 0 }} {...args} />
    <List.Item value="pineapple">Pineapple</List.Item>
  </List>
);

export const VerticalDivider: Story<DividerProps> = (args) => (
  <>
    <div>
      <Link href="#">Apple</Link>
      <Divider orientation="vertical" {...args} />
      <Link href="#">Orange</Link>
      <Divider orientation="vertical" {...args} />
      <Link href="#">Pumpkin</Link>
      <Divider orientation="vertical" {...args} />
      <Link href="#">Pineapple</Link>
    </div>
    <br />
    <div style={{ display: 'inline-flex', border: '1px solid #ccc', borderRadius: '6px' }}>
      <Button type="text">Apple</Button>
      <Divider orientation="vertical" flexItem {...args} />
      <Button type="text">Orange</Button>
      <Divider orientation="vertical" flexItem {...args} />
      <Button type="text">Pumpkin</Button>
      <Divider orientation="vertical" flexItem {...args} />
      <Button type="text">Pineapple</Button>
    </div>
  </>
);
