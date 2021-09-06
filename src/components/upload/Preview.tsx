/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import classnames from 'classnames';
import { CheckCircleFilled, CloseCircleFilled } from '@gio-design/icons';
import Button from '../button';
import Text from '../../text';
import { UploadPrefixClsContext } from './UploadContext';
import { IPreviewProps, IUploadFile } from './interface';
import { CsvSVG, DocxSVG, PdfSVG, XlsxSVG, FolderSVG, TxtSVG } from './svg';

const getFileLogo = (file: IUploadFile) => {
  const suffix = file.name.match(/.*\.(\w+)/)?.[1].toLowerCase();
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
    case 'txt':
      return <TxtSVG style={style} />;
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

export const PreviewForNotImage: React.FC<IPreviewProps> = ({ file, onReSelect }: IPreviewProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview-file`);
  const fileNameCls = classnames(`${prefixCls}__preview-file-name`);

  const errorMessage = file.status === 'success' ? '上传成功！' : file.errorMessage;

  const handleSelect = () => {
    onReSelect?.(file);
  };

  return (
    <div className={cls}>
      {getFileLogo(file)}
      <div className={fileNameCls}>{file?.name}</div>
      <div className="drag-file-preview">
        <div className="drag-file-preview-icon">
          {file.status === 'success' && <CheckCircleFilled color="#008a56" style={iconStyle} />}
          {file.status === 'error' && <CloseCircleFilled color="#ec134b" style={iconStyle} />}
        </div>
        <div onClick={(e: any) => e.stopPropagation()}>
          <Text width={300} style={{ zIndex: 1 }} className="drag-file-preview-text">
            {errorMessage}
          </Text>
        </div>
        <div style={{ zIndex: 1 }}>
          <Button type="text" className="drag-file-preview-btn" onClick={handleSelect}>
            重新选择
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
