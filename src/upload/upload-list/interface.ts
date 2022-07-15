/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadFile, UploadListItemRender, UploadListProgressProps } from '../interface';

export type UploadListType = 'card' | 'text';
export interface UploadListProps<T = any> {
  listType?: UploadListType;
  onRemove?: (file: UploadFile<T>) => void | boolean;
  items?: Array<UploadFile<T>>;
  progress?: UploadListProgressProps;
  prefixCls?: string;
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  iconRender?: (file: UploadFile<T>, listType?: UploadListType) => React.ReactNode;
  itemRender?: UploadListItemRender<T>;
  disabled?: boolean;
}
export interface ListItemProps {
  prefixCls: string;
  className?: string;
  style?: React.CSSProperties;
  file: UploadFile;
  items: UploadFile[];
  listType?: UploadListType;
  disabled?: boolean;
  // isImgUrl?: (file: UploadFile) => boolean;
  showRemoveIcon?: boolean;
  // showDownloadIcon?: boolean;
  // showPreviewIcon?: boolean;
  removeIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  // downloadIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  // previewIcon?: React.ReactNode | ((file: UploadFile) => React.ReactNode);
  iconRender: (file: UploadFile) => React.ReactNode;
  // actionIconRender: (
  //   customIcon: React.ReactNode,
  //   callback: () => void,
  //   prefixCls: string,
  //   title?: string | undefined,
  // ) => React.ReactNode;
  itemRender?: UploadListItemRender;
  // onPreview: (file: UploadFile, e: React.SyntheticEvent<HTMLElement>) => void;
  onRemove?: (file: UploadFile) => void;
  // onDownload: (file: UploadFile) => void;
  progress?: UploadListProgressProps;
}
