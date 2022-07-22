import React, { useRef } from 'react';
import classNames from 'classnames';
import { DeleteOutlined, PlusOutlined, UploadOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import Loading from '../../loading';
import { UploadFile, UploadState } from '../interface';

import { Tooltip } from '../..';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import defaultLocale from '../locales/zh-CN';

interface CardTriggerProps {
  prefixCls?: string;
  file?: UploadFile;
  onRemove?: (file: UploadFile) => void;
  disabled?: boolean;
  iconRender: (file: UploadFile) => React.ReactNode;
  isImage?: (file: UploadFile) => boolean;
}
const CardTrigger: React.FC<CardTriggerProps> = (props: CardTriggerProps) => {
  const { prefixCls: customPrefixCls, file, onRemove, disabled, iconRender, isImage } = props;
  const prefixCls = usePrefixCls('upload', customPrefixCls);
  const previewCls = `${prefixCls}-preview`;
  const cls = classNames(previewCls, `${previewCls}-type-card`);
  const actionCls = `${previewCls}-actions-btn`;
  const locale = useLocale('Upload');
  const mergedLocale: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };
  const spanRef = useRef<HTMLSpanElement>(null);
  const handleStopPropagation = (e: any) => {
    const targetNode = spanRef?.current?.childNodes[0];
    if (targetNode && !targetNode.contains(e.target)) {
      e.stopPropagation();
    }
  };
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove(file);
  };
  const removeIcon = (
    <span
      role="button"
      className={actionCls}
      aria-hidden="true"
      title={mergedLocale.removeFile}
      style={disabled ? { pointerEvents: 'none' } : undefined}
      onClick={handleRemove}
    >
      <DeleteOutlined />
    </span>
  );
  const reselectIcon = (
    <span
      role="button"
      className={actionCls}
      aria-hidden="true"
      title={mergedLocale.reselect}
      style={disabled ? { pointerEvents: 'none' } : undefined}
    >
      <UploadOutlined />
    </span>
  );
  if (!file || file.status === UploadState.STATUS_NOT_YET) {
    return (
      <div>
        <PlusOutlined />
      </div>
    );
  }
  const iconNode = iconRender?.(file);

  let preview = <div className={`${previewCls}-thumbnail`}>{iconNode}</div>;
  if (file.status === UploadState.STATUS_UPLOADING || (!file.dataUrl && !file.url)) {
    const uploadingCls = classNames({
      [`${previewCls}-thumbnail`]: true,
      [`${previewCls}-file`]: file.status !== UploadState.STATUS_UPLOADING,
    });
    preview = <div className={uploadingCls}>{iconNode}</div>;
  } else {
    console.log('isImage', isImage);
    const thumbnail = isImage?.(file) ? (
      <img
        src={file.dataUrl || file.url}
        alt={file.name}
        className={`${previewCls}-image`}
        crossOrigin={file.crossOrigin}
      />
    ) : (
      iconNode
    );
    const thumbCls = classNames({
      [`${previewCls}-thumbnail`]: true,
      [`${previewCls}-file`]: !isImage?.(file),
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
  const dom = (
    <div className={cls} onClick={handleStopPropagation} aria-hidden="true">
      <div className={`${previewCls}-info`}>
        <span className={`${previewCls}-span`}>
          {preview}
          <span title={file.name} className={`${previewCls}-name`}>
            {file.name}
          </span>
        </span>
      </div>
      <span className={`${previewCls}-actions`} ref={spanRef}>
        {reselectIcon}
        {removeIcon}
      </span>
    </div>
  );
  let message = '';
  if (file.status === UploadState.STATUS_ERROR) {
    message = file.error?.statusText || file.error?.message || mergedLocale.uploadError;
  } else if (file.status === UploadState.STATUS_SUCCESS) {
    message = mergedLocale.uploadSuccess;
  }
  return (
    <Loading style={{ width: '100%' }} loading={file.status === UploadState.STATUS_UPLOADING} size="small">
      {file.status === UploadState.STATUS_ERROR ? <Tooltip title={message}>{dom}</Tooltip> : dom}
    </Loading>
  );
};

export default CardTrigger;
