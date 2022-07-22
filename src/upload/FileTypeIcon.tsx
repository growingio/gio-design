import React from 'react';
import { UploadFile, UploadProps } from './interface';
import { CsvSVG, DocxSVG, FolderSVG, PdfSVG, PictureSVG, TxtSVG, XlsxSVG } from './svg';

const FileTypeIcon = (props: { file: UploadFile<any>; prefixCls: string; isImage: UploadProps['isImage'] }) => {
  const { file, prefixCls, isImage } = props;
  const suffix = file.name.match(/.*\.(\w+)/)?.[1].toLowerCase();
  const style = { width: '1em', height: '1em' };
  const iconCls = `${prefixCls}-file__type-icon`;
  const wrapper = (children: React.ReactNode) => (
    <span role="img" className={iconCls}>
      {children}
    </span>
  );
  if (isImage?.(file)) {
    return wrapper(<PictureSVG style={style} />);
  }
  switch (suffix) {
    case 'csv':
      return wrapper(<CsvSVG style={style} />);
    case 'pdf':
      return wrapper(<PdfSVG style={style} />);
    case 'doc':
    case 'docx':
      return wrapper(<DocxSVG style={style} />);
    case 'xls':
    case 'xlsx':
      return wrapper(<XlsxSVG style={style} />);
    case 'txt':
      return wrapper(<TxtSVG style={style} />);
    default:
      return wrapper(<FolderSVG style={style} />);
  }
};
export default FileTypeIcon;
