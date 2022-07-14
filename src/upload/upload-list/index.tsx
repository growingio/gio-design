import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React from 'react';
import { LoadingTwoTone } from '@gio-design/icons';
import { UploadFile, UploadState } from '../interface';
import { UploadListProps } from './interface';
import ListItem from './ListItem';

const UploadList = (props: UploadListProps) => {
  const { prefixCls: customizePrefixCls, listType, onRemove, items = [], progress, iconRender, itemRender } = props;

  const prefixCls = usePrefixCls('upload', customizePrefixCls);
  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
  });
  const onInternalRemove = (file: UploadFile) => {
    onRemove?.(file);
  };
  const internalIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === UploadState.STATUS_UPLOADING;
    const icon: React.ReactNode = isLoading ? <LoadingTwoTone /> : null;

    return icon;
  };
  return (
    <div className={listClassNames}>
      {items?.map((file) => (
        <ListItem
          key={file.uid}
          prefixCls={customizePrefixCls}
          file={file}
          items={items}
          progress={progress}
          listType={listType}
          iconRender={internalIconRender}
          itemRender={itemRender}
          onRemove={onInternalRemove}
        />
      ))}
    </div>
  );
};

export default UploadList;
