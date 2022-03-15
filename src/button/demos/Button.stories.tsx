import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined, FolderOutlined } from '@gio-design/icons';
import Button, { ButtonProps, IconButtonProps } from '..';
import Docs from './ButtonPage';
import Checkbox from '../../checkbox';
import '../style';
import '../../checkbox/style';

export default {
  title: 'Upgraded/Button',
  component: Button,
  subcomponents: {
    'Button.IconButton': Button.IconButton,
  },
  argTypes: {
    prefix: {
      control: { type: 'text' }, // 不约束react_node会传入对象导致报错
    },
    suffix: {
      control: { type: 'text' },
    },
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42614',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
      source: { type: 'auto' },
    },
  },
} as Meta;

export const Default: Story<ButtonProps> = (args) => (
  <>
    <Button prefix={<PlusOutlined />} {...args} />
  </>
);

Default.args = {
  children: '按钮',
};
export const Types: Story<ButtonProps> = () => (
  <>
    <Button prefix={<PlusOutlined />} type="primary">
      primary
    </Button>
    <Button prefix={<PlusOutlined />} type="secondary">
      secondary
    </Button>
    <Button prefix={<PlusOutlined />} type="text">
      text
    </Button>
    <Button.IconButton type="primary">
      <PlusOutlined />
    </Button.IconButton>
    <Button.IconButton type="secondary">
      <PlusOutlined />
    </Button.IconButton>
    <Button.IconButton type="text">
      <PlusOutlined />
    </Button.IconButton>
  </>
);
export const Disabled: Story<ButtonProps> = () => (
  <>
    <Button type="primary" disabled>
      primary
    </Button>
    <Button type="secondary" disabled prefix={<PlusOutlined />}>
      secondary
    </Button>
    <Button type="text" disabled prefix={<PlusOutlined />}>
      text
    </Button>
    <Button loading disabled>
      loading
    </Button>
  </>
);

export const IconOnly: Story<IconButtonProps> = () => (
  <>
    <Button.IconButton>
      <FilterOutlined />
    </Button.IconButton>
    <Button.IconButton type="secondary">
      <FilterOutlined />
    </Button.IconButton>
    <Button.IconButton type="text">
      <FilterOutlined />
    </Button.IconButton>
    <Button.IconButton type="secondary" style={{ fontSize: '20px' }}>
      <FilterOutlined />
    </Button.IconButton>
  </>
);

export const BlockButton: Story<ButtonProps> = () => <Button style={{ width: '100%' }}>Block</Button>;

export const Sizes: Story<ButtonProps> = () => (
  <>
    <Button size="normal">normal</Button>
    <Button size="normal" type="secondary">
      secondary
    </Button>
    <Button size="normal" type="secondary" prefix={<PlusOutlined />}>
      secondary
    </Button>
    <Button size="normal" type="text">
      text
    </Button>
    <Button.IconButton size="normal" type="secondary">
      <FilterOutlined />
    </Button.IconButton>
    <br />
    <Button size="small">small</Button>
    <Button size="small" type="secondary">
      secondary
    </Button>
    <Button size="small" type="secondary" prefix={<PlusOutlined />}>
      secondary
    </Button>
    <Button size="small" type="text">
      text
    </Button>
    <Button.IconButton size="small" type="secondary">
      <FilterOutlined />
    </Button.IconButton>
  </>
);

export const ContainsIcon: Story<ButtonProps> = () => (
  <>
    <Button size="normal" type="primary" prefix={<PlusOutlined />}>
      primary
    </Button>
    <Button size="normal" type="secondary" prefix={<PlusOutlined />}>
      secondary
    </Button>
    <Button size="normal" type="text" prefix={<PlusOutlined />}>
      text
    </Button>
    <br />
    <Button size="normal" type="primary" suffix={<FilterOutlined />}>
      primary
    </Button>
    <Button size="normal" type="secondary" suffix={<FilterOutlined />}>
      secondary
    </Button>
    <Button size="normal" type="text" suffix={<FilterOutlined />}>
      text
    </Button>
    <br />
    <Button size="normal" type="primary" prefix={<PlusOutlined />} suffix={<FolderOutlined />}>
      primary
    </Button>
    <Button size="normal" type="secondary" prefix={<PlusOutlined />} suffix={<FolderOutlined />}>
      secondary
    </Button>
    <Button size="normal" type="text" prefix={<PlusOutlined />} suffix={<FolderOutlined />}>
      text
    </Button>
  </>
);

export const Loading: Story<ButtonProps> = () => {
  const [loading1, setLoading1] = useState<boolean>();
  const [loading2, setLoading2] = useState<boolean>();
  return (
    <>
      <Button size="normal" type="primary" loading>
        primary
      </Button>
      <Button size="normal" type="secondary" loading>
        secondary
      </Button>
      <Button size="normal" type="text" loading>
        text
      </Button>
      <br />
      <Button
        size="normal"
        type="primary"
        prefix={<PlusOutlined />}
        loading={loading1}
        onClick={() => {
          setLoading1(true);
          setTimeout(() => {
            setLoading1(false);
          }, 6000);
        }}
      >
        Click Me !
      </Button>
      <Button.IconButton
        size="normal"
        type="secondary"
        loading={loading2}
        onClick={() => {
          setLoading2(true);
          setTimeout(() => {
            setLoading2(false);
          }, 6000);
        }}
      >
        <PlusOutlined />
      </Button.IconButton>
    </>
  );
};
export const Active: Story<ButtonProps> = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Checkbox checked={active} onChange={(e) => setActive(e.target.checked)}>
        active
      </Checkbox>
      <br />
      <Button size="normal" type="primary" prefix={<PlusOutlined />} active={active}>
        primary
      </Button>
      <Button size="normal" type="primary" prefix={<PlusOutlined />} active={active} disabled>
        disabled
      </Button>
      <Button size="normal" type="secondary" prefix={<PlusOutlined />} active={active}>
        secondary
      </Button>
      <Button size="normal" type="text" prefix={<PlusOutlined />} active={active}>
        text
      </Button>
    </>
  );
};
