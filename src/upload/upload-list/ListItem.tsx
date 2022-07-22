import React from 'react';
import CardListItem from './CardListItem';
import { ListItemProps } from './interface';
import TextListItem from './TextListItem';

const ListItem = (props: ListItemProps) => {
  const { listType = 'text' } = props;
  if (listType === 'card') {
    return <CardListItem {...props} />;
  }

  return <TextListItem {...props} />;
};
export default ListItem;
