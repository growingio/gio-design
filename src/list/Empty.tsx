import { useLocale } from '@gio-design/utils';
import React from 'react';
import Result from '../result';
import { collectOptions } from './util';
import defaultLocaleTextObject from './locales/zh-CN';

interface EmptyProps {
  emptyNode?: React.ReactNode;
  children?: React.ReactElement;
}

const Empty: React.FC<EmptyProps> = ({ children, emptyNode }) => {
  const options = collectOptions(children);
  const localeTextObject: typeof defaultLocaleTextObject = useLocale('List') || defaultLocaleTextObject;
  if (options.length === 0) {
    return (
      <div style={{ width: '100%', padding: '30px 0' }}>
        {emptyNode ?? <Result type="empty-data" title description={localeTextObject.exptyText} size="small" />}
      </div>
    );
  }
  return children ?? <></>;
};

export default Empty;
