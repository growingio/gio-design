import { usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React from 'react';
import { LoadingTwoTone } from '@gio-design/icons';
import { UploadFile, UploadState, UploadListProps } from '../interface';
import ListItem from './ListItem';
import FileTypeIcon from '../FileTypeIcon';

const UploadList = (props: UploadListProps) => {
  const {
    prefixCls: customizePrefixCls,
    listType = 'text',
    onRemove,
    items = [],
    progress = {
      strokeWidth: 4,
      showInfo: false,
    },
    disabled = false,
    iconRender,
    itemRender,
    isImage,
    appendAction,
    appendActionVisible,
  } = props;

  const prefixCls = usePrefixCls('upload', customizePrefixCls);
  const listClassNames = classNames({
    [`${prefixCls}-list`]: true,
    [`${prefixCls}-list-${listType}`]: true,
  });
  const listItemPrefix = `${prefixCls}-list-item`;
  const onInternalRemove = (file: UploadFile) => {
    onRemove?.(file);
  };
  const internalIconRender = (file: UploadFile) => {
    if (iconRender) {
      return iconRender(file, listType);
    }
    const isLoading = file.status === UploadState.STATUS_UPLOADING;
    const icon: React.ReactNode = isLoading ? <LoadingTwoTone rotating /> : null;
    const fileIcon = isLoading ? null : <FileTypeIcon file={file} prefixCls={prefixCls} isImage={isImage} />;
    if (listType === 'text') {
      return icon;
    }
    return fileIcon;
  };

  return (
    <div className={listClassNames}>
      {items?.map((file) => (
        <ListItem
          key={file.uid}
          prefixCls={listItemPrefix}
          file={file}
          items={items}
          progress={progress}
          listType={listType}
          disabled={disabled}
          iconRender={internalIconRender}
          itemRender={itemRender}
          onRemove={onInternalRemove}
          isImage={isImage}
        />
      ))}
      <div className={`${listItemPrefix}-container`} style={appendActionVisible ? undefined : { display: 'none' }}>
        {appendAction}
      </div>
    </div>
  );
};

export default UploadList;
