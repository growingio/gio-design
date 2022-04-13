import React from 'react';
import { PlusCircleFilled } from '@gio-design/icons';
import { Meta } from '@storybook/react/types-6-0';
import BasePicker from '.';
import Button from '../../../../../../button';
import List from '../list';
import './style';

export default {
  title: 'Pro/BasePicker',
  component: BasePicker,
} as Meta;
const ITEMS_COUNT = 10;
const ITEM_CONTENT = 'Content';

function sortArray(count: number) {
  return Array.from({ length: count }, (_, index) => index + 1);
}
const renderGroups = () => (
  <>
    {sortArray(3).map((group) => (
      <List.ItemGroup key={`group-${group}`} title={`Group ${group}`}>
        {sortArray(ITEMS_COUNT).map((item) => (
          <List.Item key={`group-${group}-item-${item}`}>{`${ITEM_CONTENT} ${item}`}</List.Item>
        ))}
      </List.ItemGroup>
    ))}
  </>
);
const footer = (
  <Button type="text" prefix={<PlusCircleFilled />} size="small">
    New Content
  </Button>
);

const tabNavItems = [
  { key: 'option-1', children: 'Option 1' },
  { key: 'option-2', children: 'Option 2' },
];
const s = () => (
  <>
    <List.Item key="1">1</List.Item>
    <List.Item key="2" disabled>
      2
    </List.Item>
  </>
);

export const demos = () => (
  <>
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      <BasePicker />
      <BasePicker renderItems={s} style={{ marginTop: 10 }} />
      <BasePicker style={{ marginTop: 10 }} renderItems={renderGroups} />
      <BasePicker
        style={{ marginTop: 10 }}
        tabNav={{
          items: tabNavItems,
        }}
        renderItems={renderGroups}
      />
    </div>
    <div style={{ display: 'inline-block', width: '50%' }}>
      <BasePicker
        renderItems={renderGroups}
        searchBar={{ placeholder: 'Placeholder', onSearch: (a) => console.log(a) }}
      />
      <BasePicker
        style={{ marginTop: 10 }}
        tabNav={{
          items: tabNavItems,
        }}
        renderItems={renderGroups}
      />
      <BasePicker style={{ marginTop: 10 }} renderItems={renderGroups} footer={footer} />
    </div>
  </>
);
