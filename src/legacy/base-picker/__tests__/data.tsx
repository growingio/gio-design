import React from 'react';
import { PlusCircleFilled } from '@gio-design/icons';
import List from '../../list';
import Button from '../../button';

export const ITEMS_COUNT = 10;
export const ITEM_CONTENT = 'Content';

function sortArray(count: number) {
  return Array.from({ length: count }, (_, index) => index + 1);
}

export const renderItems = () => (
  <>
    {sortArray(ITEMS_COUNT).map((i) => (
      <List.Item key={`item-${i}`}>{`${ITEM_CONTENT} ${i}`}</List.Item>
    ))}
  </>
);

export const renderGroups = () => (
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
export const footer = (
  <Button type="text" icon={<PlusCircleFilled />} size="small">
    New Content
  </Button>
);

export const tabNavItems = [
  { key: 'option-1', children: 'Option 1' },
  { key: 'option-2', children: 'Option 2' },
];
