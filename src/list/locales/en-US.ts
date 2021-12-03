import { isNil } from 'lodash';
import { Key } from 'react';

export default {
  expandAll: (text?: Key) => {
    if (isNil(text)) return `Expand All`;
    return `Expand All（${text}）`;
  },
};
