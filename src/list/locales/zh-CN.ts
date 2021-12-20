import { isNil } from 'lodash';
import { Key } from 'react';

export default {
  expandAll: (text?: Key) => {
    if (isNil(text)) return `展开全部`;
    return `展开全部（${text}）`;
  },
  exptyText: '暂无数据',
};
