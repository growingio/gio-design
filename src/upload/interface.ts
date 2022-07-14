/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RcFile as OriginRcFile } from 'rc-upload/es/interface';
import { ProgressProps } from '../progress/interface';

export type UploadType = 'button' | 'input' | 'card' | 'avatar' | 'drag';

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

export type UploadStatus = 'notYet' | 'uploading' | 'success' | 'error' | 'done' | 'removed';

export enum UploadState {
  STATUS_NOT_YET = 'notYet',
  STATUS_UPLOADING = 'uploading',
  STATUS_SUCCESS = 'success',
  STATUS_ERROR = 'error',
  STATUS_DONE = 'done',
  STATUS_REMOVED = 'removed',
}
// export const STATUS_NOT_YET = 'notYet';
// export const STATUS_UPLOADING = 'uploading';
// export const STATUS_SUCCESS = 'success';
// export const STATUS_ERROR = 'error';
// export const STATUS_DONE = 'done';

// export type TInputUploadType = 'url' | 'file';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface RcFile extends OriginRcFile {
  readonly lastModifiedDate: Date;
}
export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}
// export interface IProgress extends ProgressEvent {
//   percent: number;
//   [key: string]: any;
// }
export declare type UploadRequestHeader = Record<string, string>;
export interface UploadRequestError extends Error {
  status?: number;
  method?: UploadRequestMethod;
  url?: string;
}
export type BeforeUploadFileType = File | Blob | boolean | string;

export interface CustomRequestOptions<T = any> {
  onProgress?: (event: UploadProgressEvent) => void;
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
  data?: Record<string, unknown>;
  filename?: string;
  file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  withCredentials?: boolean;
  action: string;
  headers?: UploadRequestHeader;
  method: UploadRequestMethod;
}
// export interface UploadRequestOption<T = any> {
//   onProgress?: (event: UploadProgressEvent) => void;
//   onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void;
//   onSuccess?: (body: T, xhr?: XMLHttpRequest) => void;
//   data?: Record<string, unknown>;
//   filename?: string;
//   file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
//   withCredentials?: boolean;
//   action: string;
//   headers?: UploadRequestHeader;
//   method: UploadRequestMethod;
// }
// export interface ICustomRequestOptions {
//   action: string;
//   filename?: string;
//   data?: Partial<Record<string, unknown>>;
//   file: Exclude<BeforeUploadFileType, File | boolean> | IRcFile;
//   headers?: IHttpRequestHeader;
//   withCredentials?: boolean;
//   method: TRequestMethod;
//   onProgress?: (event: IProgress, file: IRcFile) => void;
//   onError?: (error: Error, response: Record<string, unknown>) => void;
//   onSuccess?: (response: Record<string, unknown>, file: IRcFile) => void;
// }

// 在 RcFile 的基础上新增了一些字段，但是为了易读重写一遍
export interface UploadFile<T = any> {
  uid: string;
  lastModified?: number;
  size?: number;
  name: string;
  fileName?: string;
  lastModifiedDate?: Date;
  status?: UploadStatus;
  /**
   * 上传进度 0～100
   */
  percent?: number;
  url?: string;
  /**
   *  预览用的 base64
   */
  dataUrl?: string; // 预览用的 base64
  /**
   * 原始的RcUpload 返回的file对象
   */
  originFile?: RcFile;
  response?: T;
  error?: any;
  type: string;
  // /**
  //  自定义文件上传失败时显示的错误信息
  //  */
  // errorMessage?: React.ReactNode;
}

// export type TTransformFileHandler = (file: RcFile) => string | Blob | File | Promise<string | Blob | File>;

export interface IInnerTriggerProps {
  [key: string]: any;
}
export interface UploadProps<T = any> {
  /**
   受控的 Preview 图片
   */
  // file?: UploadFile<T>;
  /**
   受控的文件上传列表
   */
  fileList?: UploadFile<T>[];
  /**
   已经上传的文件列表
   */
  defaultFileList?: UploadFile<T>[];
  /**
   上传的图片是否显示边框
   */
  // successBorder?: boolean;
  /**
   upload 组件展现类型
   */
  type?: UploadType;
  /**
   input 时希望使用 file 还是直接使用 url
   */
  // inputUploadType?: TInputUploadType;
  /**
   trigger 的 props
   */
  // triggerProps?: IInnerTriggerProps;
  /**
   组件根元素自定义样式
   */
  style?: React.CSSProperties;
  /**
   drag模式自定义样式
   */
  // dragStyle?: React.CSSProperties;
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
  action?: string | ((file: RcFile) => string | Promise<string>);
  /**
   请求发起方法
   */
  method?: UploadRequestMethod;
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
  data?: Record<string, unknown> | ((file: RcFile | string | Blob) => Record<string, unknown>);
  /**
   额外的上传请求头部
   */
  headers?: HttpRequestHeader;
  /**
   接受上传的文件类型，具体查看https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#accept
   */
  accept?: string;
  /**
   是否带上 cookie
   */
  withCredentials?: boolean;
  /**
    点击打开选择上传文件的对话框,useful for drag only upload as it does not trigger on enter key or click event
    */
  openFileDialogOnClick?: boolean;
  /**
   * 文件状态改变的回调,上传中、完成、失败,删除 都会调用这个函数
   */
  onChange?: (file: UploadFile, fileList: UploadFile[], event?: { percent?: number }) => void;
  /**
   上传开始前 回调
   */
  beforeUpload?: (file: RcFile, fileList: RcFile[]) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>;
  /**
   开始上传 回调
   */
  // onStart?: (file: UploadFile, fileList: UploadFile[]) => void;
  /**
   上传过程中 回调
   */
  onProgress?: (event: UploadProgressEvent, file: RcFile, fileList: RcFile[]) => void;
  /**
   上传成功 回调
   */
  onSuccess?: (response: Record<string, unknown>, file: UploadFile, fileList: UploadFile[]) => void;

  /**
   * 上传出错 回调
   */
  onError?: (error: Error, file: UploadFile, fileList: UploadFile[]) => void;
  /**
   删除已上传图片 回调
   */
  onRemove?: (file: UploadFile<T>) => void | boolean | Promise<void | boolean>; // ((file: UploadFile) => void) | ((file: UploadFile) => boolean) | Promise<void> | Promise<boolean>;
  // /**
  //  重新选择文件 回调
  //  */
  // onReSelect?: (file: UploadFile) => void;
  /**
   自定义上传方法，将覆盖默认的 xhr 上传
   */
  customRequest?: (options: CustomRequestOptions) => void;

  /**
   * 自定义的触发元素
   */
  children?: React.ReactNode;
  /**
   avatar模式下的placeholder
   */
  // placeholderImg?: string;
  /**
   可根据使用场景调整icon的尺寸
   */
  // iconSize?: number | [number, number];
  /**
   批量上传时文件的最大数量限制.maxCount=1时，始终替换为最新选择的文件
   */
  maxCount?: number;
  /**
   批量上传时是否显示上传列表
   */
  showUploadList?: boolean;
}

export interface ITriggerProps {
  // setFile: (file: UploadFile) => void;
  // file: UploadFile;
  onRemove: (file?: UploadFile) => void;
  prefixCls?: string;
  // onReSelect?: (file: UploadFile) => void;
  // onInputUpload: (type: TInputUploadType, url: string) => void;
  // inputUploadType: TInputUploadType;
  accept: string | undefined;
  disabled?: boolean;
  triggerProps?: IInnerTriggerProps;
  children?: React.ReactNode;
  placeholderImg?: string;
  // 可根据使用场景调整icon尺寸
  iconSize?: number | [number, number];
  // 上传文件列表
  items?: UploadFile[];
  // 已上传文件数量
  // finishCount?: number;
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
  // dragStyle?: React.CSSProperties;
}
export type UploadListItemRender<T = any> = (
  originNode: React.ReactElement,
  file: UploadFile,
  fileList: Array<UploadFile<T>>
) => React.ReactNode;

export type UploadListProgressProps = Omit<ProgressProps, 'percent'>;
export interface UploadListProps<T> {
  // 上传文件列表
  items?: UploadFile[];
  // 删除已上传图片 回调
  onRemove?: ((file: UploadFile) => void) | ((file: UploadFile) => boolean) | Promise<void> | Promise<boolean>;
  /**
   接受上传的文件类型，具体查看https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/file#accept
   */
  accept?: string;
  /**
   * 文件的icon
   */
  iconRender?: (file: UploadFile<T>) => React.ReactNode;
  itemRender?: UploadListItemRender<T>;
  /**
   * 进度条属性
   */
  progress?: UploadListProgressProps;
  /**
   * css自定义前缀
   */
  prefixCls?: string;
}

export interface IPreviewProps {
  file: UploadFile;
  size?: number | string;
  onReSelect?: (file: UploadFile) => void;
  onRemove?: () => void;
}

export interface IActionsProps {
  file: UploadFile;
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
  headers: HttpRequestHeader;
  method: string;
  filename: string;
  onProgress: (event: IProgress) => void;
  onSuccess: (body: Record<string, unknown>, xhr: XMLHttpRequest) => void;
  onError: (event: Error, body: Record<string, unknown>) => void;
}
