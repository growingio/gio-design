import { useLocale } from '@gio-design/utils';
import React, { useState } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import { ListItemProps } from './interface';
import defaultLocale from '../locales/zh-CN';
// import { UploadFile } from '../interface';
// import { CsvSVG, DocxSVG, PdfSVG, XlsxSVG, FolderSVG, TxtSVG } from './svg';
import Button from '../../button';
import Progress from '../../progress';

// const defaultIconRender = (file: UploadFile<any>) => {
//   const suffix = file.name.match(/.*\.(\w+)/)?.[1].toLowerCase();
//   const style = { width: 64, height: 64 };

//   switch (suffix) {
//     case 'csv':
//       return <CsvSVG style={style} />;
//     case 'pdf':
//       return <PdfSVG style={style} />;
//     case 'doc':
//     case 'docx':
//       return <DocxSVG style={style} />;
//     case 'xls':
//     case 'xlsx':
//       return <XlsxSVG style={style} />;
//     case 'txt':
//       return <TxtSVG style={style} />;
//     default:
//       return <FolderSVG style={style} />;
//   }
// };
const ListItem = (props: ListItemProps) => {
  const { prefixCls, style, listType, file, items, progress: progressProps, iconRender, itemRender, onRemove } = props;
  const [showProgress, setShowProgress] = useState(false);
  const progressRafRef = React.useRef<any>();
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
      onClick={() => {
        onRemove(file);
      }}
    >
      <DeleteOutlined />
    </Button.IconButton>
  );
  const iconNode = iconRender?.(file);
  let message = uploadSuccess;
  if (file.response && typeof file.response === 'string') {
    message = file.response;
  } else {
    message = file.error?.statusText || file.error?.message || uploadError;
  }
  const infos = (
    <span className={`${prefixCls}-span`}>
      <div className={`${prefixCls}-text-icon`}>{iconNode}</div>
      <div className={`${prefixCls}-text-name`}>{file.name}</div>
      <div className={`${prefixCls}-text-status`}>{message}</div>
    </span>
  );
  const itemCls = classNames({
    [`${prefixCls}-list-item`]: true,
    [`${prefixCls}-list-item-${file.status}`]: true,
    [`${prefixCls}-list-item-list-type-${listType}`]: true,
  });
  const loadingProgress = 'percent' in file ? <Progress {...progressProps} percent={file.percent} /> : null;
  const item = (
    <div className={itemCls}>
      <div className={`${prefixCls}-list-item-info`}>{infos}</div>
      <span className={`${prefixCls}-list-item-actions`}>{removeIcon}</span>
      {showProgress && <div className={classNames(`${prefixCls}-list-item-progress`)}>{loadingProgress}</div>}
    </div>
  );
  return (
    <div className={`${prefixCls}-list-item-container`} style={style}>
      {itemRender ? itemRender(item, file, items) : item}
    </div>
  );
};
export default ListItem;
