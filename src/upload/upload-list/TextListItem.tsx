import { useLocale, usePrefixCls } from '@gio-design/utils';
import React, { useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import { ListItemProps } from './interface';
import defaultLocale from '../locales/zh-CN';
// import { UploadFile } from '../interface';
// import { CsvSVG, DocxSVG, PdfSVG, XlsxSVG, FolderSVG, TxtSVG } from './svg';
import Button from '../../button';
import Progress from '../../progress';
import { UploadState } from '../interface';

const TextListItem = (props: ListItemProps) => {
  const {
    prefixCls: customPrefix,
    style,
    listType = 'text',
    file,
    items,
    progress: progressProps,
    iconRender,
    itemRender,
    onRemove,
    disabled = false,
  } = props;
  const [showProgress, setShowProgress] = useState(false);
  const progressRafRef = React.useRef<any>();
  const prefixCls = usePrefixCls('upload');
  const listItemPrefix = customPrefix ?? `${prefixCls}-list-item`;
  // 延迟200ms 显示进度
  React.useEffect(() => {
    progressRafRef.current = setTimeout(() => {
      setShowProgress(true);
    }, 200);

    return () => {
      clearTimeout(progressRafRef.current);
    };
  }, []);
  const locale = useLocale('Upload');
  const { uploadSuccess, uploadError }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };
  const removeIcon = (
    <Button.IconButton
      type="text"
      size="small"
      disabled={disabled}
      onClick={() => {
        onRemove(file);
      }}
    >
      <DeleteOutlined />
    </Button.IconButton>
  );
  const iconNode = iconRender?.(file);
  let message = '';
  if (file.status === UploadState.STATUS_ERROR) {
    message = file.error?.statusText || file.error?.message || uploadError;
  } else if (file.status === UploadState.STATUS_SUCCESS) {
    message = uploadSuccess;
  }

  const itemCls = classNames({
    [`${listItemPrefix}`]: true,
    [`${listItemPrefix}-${file.status}`]: true,
    [`${listItemPrefix}-disabled`]: disabled,
    [`${listItemPrefix}-list-type__${listType}`]: true,
  });
  const loadingProgress = 'percent' in file ? <Progress {...progressProps} percent={file.percent} /> : null;
  const item = (
    <div className={itemCls}>
      <div className={`${listItemPrefix}-info`}>
        <span className={`${listItemPrefix}-span`}>
          <div className={`${listItemPrefix}-icon`}>{iconNode}</div>
          <span title={file.name} className={`${listItemPrefix}-name`}>
            {file.name}
          </span>
          <span className={`${listItemPrefix}-status`}>{message}</span>
          <span className={`${listItemPrefix}-actions`}>{removeIcon}</span>
        </span>
      </div>
      {showProgress && file.status === UploadState.STATUS_UPLOADING && (
        <div className={classNames(`${listItemPrefix}-progress`)}>{loadingProgress}</div>
      )}
    </div>
  );
  return (
    <div className={`${listItemPrefix}-container`} style={style}>
      {itemRender ? itemRender(item, file, items) : item}
    </div>
  );
};
export default TextListItem;
