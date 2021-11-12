import React from 'react';
import { Meta } from '@storybook/react/types-6-0';
import Docs from './DropdownPage';
import Dropdown from '../index';
import '../style';
import Button from '../../button';
import Menu, { MenuItem } from '../../legacy/menu';

export default {
  title: 'Upgraded/Dropdown',
  component: Dropdown,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default = () => (
  <Dropdown
    content={
      <Menu mode="vertical">
        <MenuItem>MenuItem 1</MenuItem>
        <MenuItem>MenuItem 2</MenuItem>
        <MenuItem>MenuItem 3</MenuItem>
      </Menu>
    }
    placement="bottomLeft"
  >
    <Button>Dropdown</Button>
  </Dropdown>
);
