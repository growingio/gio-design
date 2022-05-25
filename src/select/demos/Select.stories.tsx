import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusOutlined, FilterOutlined } from '@gio-design/icons';
import Option from '../Option';
import { SelectProps } from '../interface';
import Select from '../Select';
import '../style';
import Docs from './SelectPage';
import Button from '../../button';

export default {
  title: 'Upgraded/Select',
  component: Select,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<SelectProps> = (args) => (
  <Select {...args}>
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);
Default.args = {};
export const OnChange = () => (
  <Select autoWidth defaultValue="1" onChange={(v: string | number) => console.log('value', v)}>
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);

export const OnVisibleChange = () => (
  <Select defaultValue="1" onVisibleChange={(e) => console.log(e, 'visibleChange')}>
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);

export const AutoWidth = () => (
  <Select autoWidth defaultValue="1" style={{ width: '100%' }}>
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);

export const PrefixAndSuffix = () => (
  <Select defaultValue="1" prefix={() => <PlusOutlined size="14px" />} suffix={() => <FilterOutlined size="14px" />}>
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);
export const Options = () => (
  <Select
    defaultValue={1}
    options={[
      {
        value: 1,
        label: 1,
      },
      {
        value: 2,
        label: 2,
      },
      {
        value: 3,
        label: 3,
      },
      {
        value: 4,
        label: 4,
      },
    ]}
  />
);

export const Value = () => {
  const [val, setVal] = useState(1);

  return (
    <Select
      placeholder="placeholder"
      defaultValue="1"
      value={val}
      onChange={(e) => setVal(e)}
      prefix={() => <PlusOutlined size="14px" />}
      suffix={() => <FilterOutlined size="14px" />}
    >
      <Option label="1" value="1" />
      <Option label="2" value="2" />
      <Option label="3" value="3" />
      <Option label="4" value="4" />
    </Select>
  );
};

export const Visible = () => {
  const [vis, setVis] = useState(false);

  return (
    <>
      <Button style={{ marginBottom: 0, marginRight: 10 }} onClick={() => setVis(!vis)}>
        visibleControl
      </Button>
      <Select
        placeholder="placeholder"
        defaultValue="1"
        visible={vis}
        onVisibleChange={(e) => console.log(e, 'onVisibleChange')}
      >
        <Option label="1" value="1" />
        <Option label="2" value="2" />
        <Option label="3" value="3" />
        <Option label="4" value="4" />
      </Select>
    </>
  );
};
export const Trigger = () => {
  const [val, setVal] = useState(1);
  return (
    <Select
      defaultValue="1"
      value={val}
      onChange={(e) => setVal(e)}
      triggerPrefix={() => <PlusOutlined size="14px" />}
      triggerSuffix={() => <FilterOutlined size="14px" />}
      renderTrigger={() => <Button>Trigger value is{val}</Button>}
    >
      <Option label="1" value="1" />
      <Option label="2" value="2" />
      <Option label="3" value="3" />
      <Option label="4" value="4" />
    </Select>
  );
};

export const Title = () => (
  <Select
    title="custom title"
    prefix={() => <PlusOutlined size="14px" />}
    suffix={() => <FilterOutlined size="14px" />}
  >
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
    <Option label="4" value="4" />
  </Select>
);

export const Empty = () => <Select empty="this is empty" needEmpty />;
