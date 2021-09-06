import React from 'react';

export type TUploadType = 'button' | 'input' | 'card' | 'avatar' | 'drag';

export type TRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export type TUploadStatus = 'notYet' | 'uploading' | 'success' | 'error' | 'done';

export const STATUS_NOT_YET = 'notYet';
export const STATUS_UPLOADING = 'uploading';
export const STATUS_SUCCESS = 'success';
export const STATUS_ERROR = 'error';
export const STATUS_DONE = 'done';

export type TInputUploadType = 'url' | 'file';

export interface IHttpRequestHeader {
  [key: string]: string;
}

export interface IRcFile extends File {
  uid: string;
  readonly lastModifiedDate: Date;
  readonly webkitRelativePath: string;
}

export interface IProgress extends ProgressEvent {
  percent: number;
  [key: string]: any;
}

export interface IRcCustomRequestOptions {
  action: string;
  filename: string;
  data: Record<string, unknown>;
  file: IRcFile;
  headers: IHttpRequestHeader;
  withCredentials: boolean;
  method: TRequestMethod;
  onProgress: (event: IProgress, file: IRcFile) => void;
  onError: (error: Error, response: Record<string, unknown>) => void;
  onSuccess: (response: Record<string, unknown>, file: IRcFile) => void;
}

// 在 IRcFile 的基础上新增了一些字段，但是为了易读重写一遍
export interface IUploadFile<T = any> {
  uid: string;
  size: number;
  name: string;
  fileName?: string;
  lastModified?: number;
  lastModifiedDate?: Date;
  status?: TUploadStatus;
  percent?: number;
  url?: string;
  dataUrl?: string; // 预览用的 base64
  originFile?: File | Blob; // RcUpload 返回或者说 input 返回的文件对象
  response?: T;
  error?: any;
  type: string;
  /**
   自定义文件上传失败时显示的错误信息
   */
  errorMessage?: React.ReactNode;
}

export type TTransformFileHandler = (file: IRcFile) => string | Blob | File | Promise<string | Blob | File>;

export interface IInnerTriggerProps {
  [key: string]: any;
}

export interface IUploadProps<T = any> {
  /**
   受控的 Preview 图片
   */
  file?: IUploadFile<T>;
  /**
   受控的文件上传列表
   */
  fileList?: IUploadFile<T>[];
  /**
   上传的图片是否显示边框
   */
  successBorder?: boolean;
  /**
   upload 组件展现类型
   */
  type?: TUploadType;
  /**
   input 时希望使用 file 还是直接使用 url
   */
  inputUploadType?: TInputUploadType;
  /**
   trigger 的 props
   */
  triggerProps?: IInnerTriggerProps;
  /**
   组件根元素自定义样式
   */
  style?: React.CSSProperties;
  /**
   drag模式自定义样式
   */
  dragStyle?: React.CSSProperties;
  /**
   自定义组件前缀
   */
  prefixCls?: string;
  /**
   组件根元素自定义类名
   */
  className?: string;
  /**
   是否禁用
   */
  disabled?: boolean;
  /**
   上传服务器的文件 name
   */
  name?: string;
  /**
   文件上传地址
   */
  action?: string | ((file: IRcFile) => string) | Promise<string>;
  /**
   请求发起方法
   */
  method?: TRequestMethod;
  /**
   是否允许上传文件夹
   */
  directory?: boolean;
  /**
   是否允许多选
   */
  multiple?: boolean;
  /**
   上传所需额外参数或返回上传额外参数的方法
   */
  data?: Record<string, string | Blob> | ((file: IUploadFile<T>) => Record<string, string | Blob>);
  /**
   额外的上传请求头部
   */
  headers?: IHttpRequestHeader;
  /**
   接受上传的文件类型，具体查看https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#accept
   */
  accept?: string;
  /**
   上传开始前 回调
   */
  beforeUpload?: (file: IRcFile, fileList: IRcFile[]) => boolean | Promise<void>;
  /**
   开始上传 回调
   */
  onStart?: (file: IUploadFile, fileList: IUploadFile[]) => void;
  /**
   上传过程中 回调
   */
  onProgress?: (event: IProgress, file: IRcFile, fileList: IRcFile[]) => void;
  /**
   上传成功 回调
   */
  onSuccess?: (response: Record<string, unknown>, file: IUploadFile, fileList: IUploadFile[]) => void;
  /**
   上传出错 回调
   onError = {(error, file, fileList) => {
     file.errorMessage = '单个文件上传自定义错误信息';
     fileList.forEach(file => {
        file.errorMessage = '批量上传时自定义每个文件的错误信息';
     })
   }}
   */
  onError?: (error: Error, file: IUploadFile, fileList: IUploadFile[]) => void;
  /**
   删除已上传图片 回调
   */
  onRemove?: ((file: IUploadFile) => void) | ((file: IUploadFile) => boolean) | Promise<void> | Promise<boolean>;
  /**
   重新选择文件 回调
   */
  onReSelect?: (file: IUploadFile) => void;
  /**
   自定义上传方法，将覆盖默认的 xhr 上传
   */
  customRequest?: (options: IRcCustomRequestOptions) => void;
  /**
   是否带上 cookie
   */
  withCredentials?: boolean;
  /**
   点击打开选择上传文件的对话框
   */
  openFileDialogOnClick?: boolean;
  /**
   在上传之前转换文件
   */
  transformFile?: TTransformFileHandler;
  children?: React.ReactNode;
  /**
   avatar模式下的placeholder
   */
  placeholderImg?: string;
  /**
   可根据使用场景调整icon的尺寸
   */
  iconSize?: number | [number, number];
  /**
   批量上传时文件的最大数量限制
   */
  maxCount?: number;
  /**
   批量上传时是否显示上传列表
   */
  showUploadList?: boolean;
}

export interface ITriggerProps {
  setFile: (file: IUploadFile) => void;
  file: IUploadFile;
  onRemove: (file?: IUploadFile) => void;
  onReSelect?: (file: IUploadFile) => void;
  onInputUpload: (type: TInputUploadType, url: string) => void;
  inputUploadType: TInputUploadType;
  accept: string | undefined;
  disabled?: boolean;
  triggerProps?: IInnerTriggerProps;
  children?: React.ReactNode;
  placeholderImg?: string;
  // 可根据使用场景调整icon尺寸
  iconSize?: number | [number, number];
  // 上传文件列表
  items?: IUploadFile[];
  // 已上传文件数量
  finishCount?: number;
  // 是否允许上传文件夹
  directory?: boolean;
  // 是否允许多选
  multiple?: boolean;
  /**
   批量上传时文件的最大数量限制
   */
  maxCount?: number;
  /**
   drag模式自定义样式
   */
  dragStyle?: React.CSSProperties;
}

export interface IUploadListProps<T> {
  // 受控的 Preview 图片
  file?: IUploadFile<T>;
  // 上传文件列表
  items?: IUploadFile[];
  // 删除已上传图片 回调
  onRemove?: ((file: IUploadFile) => void) | ((file: IUploadFile) => boolean) | Promise<void> | Promise<boolean>;
  /**
   接受上传的文件类型，具体查看https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#accept
   */
  accept?: string;
}

export type ITriggerMap = {
  [key in TUploadType]: React.ComponentType<ITriggerProps>;
};

export interface IPreviewProps {
  file: IUploadFile;
  size?: number | string;
  onReSelect?: (file: IUploadFile) => void;
}

export interface IActionsProps {
  file: IUploadFile;
  onRemove: () => void;
  useUpload?: boolean;
  useDelete?: boolean;
  placement?: 'center' | 'rightTop';
  // 是否展示蒙层
  showModal?: boolean;
}

export interface IXhrOption {
  data: Record<string, string | Blob>;
  file: File;
  withCredentials: boolean;
  action: string;
  headers: IHttpRequestHeader;
  method: string;
  filename: string;
  onProgress: (event: IProgress) => void;
  onSuccess: (body: Record<string, unknown>, xhr: XMLHttpRequest) => void;
  onError: (event: Error, body: Record<string, unknown>) => void;
}
