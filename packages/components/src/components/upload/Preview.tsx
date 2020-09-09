import React, { useContext } from 'react';
import classnames from 'classnames';
import {
  File, FileCsv, FileDoc, FilePdf, FileXlsx, CheckCircleFilled,
} from '@gio-design/icons';
import { UploadPrefixClsContext } from './UploadContext';
import { IPreviewProps, IUploadFile } from './interface';

const getFileLogo = (file: IUploadFile) => {
  const suffix = file.name.match(/.*\.(\w+)/)?.[1];
  const style = { width: 64, height: 64 };

  switch (suffix) {
    case 'csv':
      return <FileCsv style={style} />;
    case 'pdf':
      return <FilePdf style={style} />;
    case 'doc':
    case 'docx':
      return <FileDoc style={style} />;
    case 'xls':
    case 'xlsx':
      return <FileXlsx style={style} />;
    default:
      return <File style={style} />;
  }
};

const iconStyle = {
  width: 16,
  height: 16,
  verticalAlign: 'text-bottom',
};

const Preview: React.FC<IPreviewProps> = ({ file, size = 32 }) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview`);
  return <img src={file?.dataUrl ?? ''} className={cls} style={{ width: size, height: size }} />;
};

export const PreviewForNotImage: React.FC<IPreviewProps> = ({ file }) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview-file`);
  const fileNameCls = classnames(`${prefixCls}__preview-file-name`);

  return (
    <div className={cls}>
      {getFileLogo(file)}
      <div className={fileNameCls}>{file?.name}</div>
      <div>
        <CheckCircleFilled color="#008a56" style={iconStyle} />
        {' '}
        上传成功！
      </div>
    </div>
  );
};

export default Preview;
