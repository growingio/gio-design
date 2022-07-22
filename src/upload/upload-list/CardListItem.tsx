import { DeleteOutlined } from '@gio-design/icons';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import classNames from 'classnames';
import React from 'react';
import { Loading, Tooltip } from '../..';
import { UploadState } from '../interface';
import defaultLocale from '../locales/zh-CN';
import { ListItemProps } from './interface';

const CardListItem = (props: ListItemProps) => {
  const {
    prefixCls: customPrefix,
    style,
    listType = 'text',
    file,
    items,
    // progress: progressProps,
    iconRender,
    itemRender,
    onRemove,
    disabled = false,
    isImage,
  } = props;

  const prefixCls = usePrefixCls('upload');
  const listItemPrefix = customPrefix ?? `${prefixCls}-list-item`;

  const locale = useLocale('Upload');
  const mergedLocale: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };
  const actionCls = `${listItemPrefix}-actions-btn`;
  const removeIcon = (
    <span
      role="button"
      className={actionCls}
      aria-hidden="true"
      title={mergedLocale.removeFile}
      style={disabled ? { pointerEvents: 'none' } : undefined}
      onClick={() => {
        onRemove(file);
      }}
    >
      <DeleteOutlined />
    </span>
  );
  // const reselectIcon = (
  //   <span
  //     role="button"
  //     className={actionCls}
  //     aria-hidden="true"
  //     title={mergedLocale.reselect}
  //     style={disabled ? { pointerEvents: 'none' } : undefined}
  //     onClick={() => {
  //       onRemove(file);
  //     }}
  //   >
  //     <UploadOutlined />
  //   </span>
  // );

  const iconNode = iconRender?.(file);
  let preview = <div className={`${prefixCls}-list-item-thumbnail`}>{iconNode}</div>;
  if (file.status === UploadState.STATUS_UPLOADING || (!file.dataUrl && !file.url)) {
    const uploadingCls = classNames({
      [`${prefixCls}-list-item-thumbnail`]: true,
      [`${prefixCls}-list-item-file`]: file.status !== UploadState.STATUS_UPLOADING,
    });
    preview = <div className={uploadingCls}>{iconNode}</div>;
  } else {
    const thumbnail = isImage?.(file) ? (
      <img
        src={file.dataUrl || file.url}
        alt={file.name}
        className={`${prefixCls}-list-item-image`}
        crossOrigin={file.crossOrigin}
      />
    ) : (
      iconNode
    );
    const thumbCls = classNames({
      [`${prefixCls}-list-item-thumbnail`]: true,
      [`${prefixCls}-list-item-file`]: !isImage?.(file),
    });
    preview = (
      <a
        className={thumbCls}
        // onClick={(e) => onPreview(file, e)}
        href={file.url || file.dataUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {thumbnail}
      </a>
    );
  }

  let message = '';
  if (file.status === UploadState.STATUS_ERROR) {
    message = file.error?.statusText || file.error?.message || mergedLocale.uploadError;
  } else if (file.status === UploadState.STATUS_SUCCESS) {
    message = mergedLocale.uploadSuccess;
  }

  const itemCls = classNames({
    [`${listItemPrefix}`]: true,
    [`${listItemPrefix}-${file.status}`]: true,
    [`${listItemPrefix}-disabled`]: disabled,
    [`${listItemPrefix}-list-type__${listType}`]: true,
  });
  const dom = (
    <div className={itemCls}>
      <div className={`${listItemPrefix}-info`}>
        <span className={`${listItemPrefix}-span`}>
          {preview}
          <span title={file.name} className={`${listItemPrefix}-name`}>
            {file.name}
          </span>
        </span>
      </div>
      <span className={`${listItemPrefix}-actions`}>
        {/* {reselectIcon} */}
        {removeIcon}
      </span>
    </div>
  );
  const item = (
    <Loading loading={file.status === UploadState.STATUS_UPLOADING} size="small">
      {file.status === UploadState.STATUS_ERROR ? <Tooltip title={message}>{dom}</Tooltip> : dom}
    </Loading>
  );
  return (
    <div className={`${listItemPrefix}-container`} style={style}>
      {itemRender ? itemRender(item, file, items) : item}
    </div>
  );
};
export default CardListItem;
