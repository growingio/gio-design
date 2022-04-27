/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import classnames from 'classnames';
import { SuccessFilled, ErrorFilled } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import Button from '../button';
import Text from '../typography/Text';
import { STATUS_SUCCESS, STATUS_ERROR, IPreviewProps, IUploadFile } from './interface';
import { UploadPrefixClsContext } from './Upload';
import { CsvSVG, DocxSVG, PdfSVG, XlsxSVG, FolderSVG, TxtSVG } from './svg';
import defaultLocale from './locales/zh-CN';

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

const Preview: React.FC<IPreviewProps> = ({ file, size = 32 }: IPreviewProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview`);
  return <img src={file?.dataUrl ?? ''} className={cls} style={{ width: size, height: size }} alt="" />;
};

export const PreviewForNotImage: React.FC<IPreviewProps> = ({ file, onReSelect, onRemove }: IPreviewProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__preview-file`);
  const fileNameCls = classnames(`${prefixCls}__preview-file-name`);

  const locale = useLocale('Upload');
  const { reselect, uploadSuccess }: { reselect: string; uploadSuccess: string } = {
    ...defaultLocale,
    ...locale,
  };

  const message = file.status === 'success' ? `${uploadSuccess}!` : file.errorMessage;

  const handleSelect = () => {
    onReSelect?.(file);
    onRemove?.();
  };

  return (
    <div className={cls}>
      {getFileLogo(file)}
      <div className={fileNameCls}>{file?.name}</div>
      <div className="drag-file-preview">
        <div className="drag-file-preview-icon">
          {file.status === STATUS_SUCCESS && <SuccessFilled color="#008a56" size="14px" />}
          {file.status === STATUS_ERROR && <ErrorFilled color="#ec134b" size="14px" />}
        </div>
        <div onClick={(e: any) => e.stopPropagation()}>
          <Text style={{ zIndex: 1 }} className="drag-file-preview-text">
            {message as string}
          </Text>
        </div>
        <div>
          <Button type="text" className="drag-file-preview-btn" onClick={handleSelect}>
            {reselect}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
