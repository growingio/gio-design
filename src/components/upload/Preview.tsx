import React, { useContext } from 'react';
import classnames from 'classnames';
import { CheckCircleFilled } from '@gio-design/icons';
import { UploadPrefixClsContext } from './UploadContext';
import { IPreviewProps, IUploadFile } from './interface';
import { CsvSVG, DocxSVG, PdfSVG, XlsxSVG, FolderSVG } from './svg';

const getFileLogo = (file: IUploadFile) => {
  const suffix = file.name.match(/.*\.(\w+)/)?.[1];
  const style = { width: 64, height: 64 };

  switch (suffix) {
    case 'csv':
      return <CsvSVG style={style} />;
    case 'pdf':
      return <PdfSVG style={style} />;
    case 'doc':
    case 'docx':
      return <DocxSVG style={style} />;
    case 'xls':
    case 'xlsx':
      return <XlsxSVG style={style} />;
    default:
      return <FolderSVG style={style} />;
  }
};

const iconStyle = {
  width: 16,
  height: 16,
  marginRight: 8,
};

const Preview: React.FC<IPreviewProps> = ({ file, size = 32 }: IPreviewProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview`);
  return <img src={file?.dataUrl ?? ''} className={cls} style={{ width: size, height: size }} alt="" />;
};

export const PreviewForNotImage: React.FC<IPreviewProps> = ({ file }: IPreviewProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview-file`);
  const fileNameCls = classnames(`${prefixCls}__preview-file-name`);

  return (
    <div className={cls}>
      {getFileLogo(file)}
      <div className={fileNameCls}>{file?.name}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <CheckCircleFilled color="#008a56" style={iconStyle} />
        上传成功！
      </div>
    </div>
  );
};

export default Preview;
