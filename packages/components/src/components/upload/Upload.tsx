import React, { useState, useRef } from 'react';
import RcUpload from 'rc-upload';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import {
  IUploadProps,
  ITriggerProps,
  ITriggerMap,
  IProgress,
  IRcFile,
  IUploadFile,
  STATUS_UPLOADING,
  STATUS_SUCCESS,
  STATUS_ERROR,
  TInputUploadType,
} from './interface';
import Toast from '../toast';
import ButtonTrigger from './triggers/ButtonTrigger';
import CardTrigger from './triggers/CardTrigger';
import InputTrigger from './triggers/InputTrigger';
import AvatarTrigger from './triggers/AvatarTrigger';
import DragTrigger from './triggers/DragTrigger';
import { imageFile2DataUrl, fileToObject, getEmptyFileObj, fetchImageFileFromUrl } from './utils';
import xhrRequest from './xhrRequest';
import { UploadPrefixClsContext } from './UploadContext';

const triggerMap: ITriggerMap = {
  button: ButtonTrigger,
  input: InputTrigger,
  card: CardTrigger,
  avatar: AvatarTrigger,
  drag: DragTrigger,
};

const Upload: React.FC<IUploadProps> = ({
  file: uploadedFile,
  successBorder = false,
  style,
  prefixCls: customPrefixCls,
  className,
  disabled,
  type = 'button',
  inputUploadType = 'url',
  triggerProps,
  action = '.',
  beforeUpload,
  onStart,
  onProgress,
  onError,
  onSuccess,
  onRemove,
  openFileDialogOnClick = true,
  children,
  placeholderImg,
  ...restProps
}: IUploadProps) => {
  const [file, setFile] = useState<IUploadFile>(getEmptyFileObj(uploadedFile));
  const rcUploadRef = useRef(null);
  const prefixCls = usePrefixCls('upload', customPrefixCls);

  const rootCls = classnames(className, prefixCls, {
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--error`]: file?.status === STATUS_ERROR,
    [`${prefixCls}--success`]: file?.status === STATUS_SUCCESS && !successBorder,
    [`${prefixCls}--success-border`]: file?.status === STATUS_SUCCESS && successBorder,
  });

  const Trigger = triggerMap[type];

  const handleBeforeUpload = (fileBeforeUpload: IRcFile, fileList: IRcFile[]) =>
    beforeUpload?.(fileBeforeUpload, fileList);

  const handleStart = (fileOnStart: IRcFile) => {
    const uploadFile: IUploadFile = {
      ...fileToObject(fileOnStart),
      status: STATUS_UPLOADING,
    };
    setFile(uploadFile);
    onStart?.(uploadFile);
  };

  const handleProgress = (step: IProgress, fileOnProgress: IRcFile) => {
    const progressFile: IUploadFile = {
      ...fileToObject(fileOnProgress),
      status: STATUS_UPLOADING,
      percent: step.percent,
    };
    setFile(progressFile);
    onProgress?.(step, fileOnProgress);
  };

  const handleSuccess = async (response: Record<string, unknown>, fileOnSuccess: IRcFile) => {
    let dataUrl = '';
    const uploadFile: IUploadFile = {
      ...fileToObject(fileOnSuccess),
      response,
      status: STATUS_SUCCESS,
    };

    try {
      if (fileOnSuccess.type.startsWith('image/')) {
        dataUrl = await imageFile2DataUrl(fileOnSuccess);
        uploadFile.dataUrl = dataUrl;
      }
    } catch (error) {
      console.error(error);
    }

    setFile(uploadFile);
    onSuccess?.(response, uploadFile);
  };

  const handleError = (error: Error, response: any, fileOnError: IRcFile) => {
    if (type !== 'input') {
      Toast.error('上传失败！');
    }
    const errorFile: IUploadFile = {
      ...fileToObject(fileOnError),
      error,
      response,
      status: STATUS_ERROR,
    };
    setFile(type !== 'drag' ? getEmptyFileObj(uploadedFile) : errorFile);
    onError?.(error, errorFile);
  };

  const handleRemove = () => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then((res) => {
      // 使用者返回了 false，阻止删除操作
      if (res === false) {
        return;
      }
      console.log(file);
      console.log(uploadedFile);
      if (file?.dataUrl === uploadedFile?.dataUrl) {
        setFile({
          uid: '',
          size: 0,
          name: '本地上传',
          type: '$empty-file',
          status: 'notYet',
          dataUrl: '',
        });
      } else {
        setFile(getEmptyFileObj(uploadedFile));
      }
    });
  };
  const handleUpload = () => {
    rcUploadRef.current?.uploader.onClick();
  };

  const handleInputUpload = async (uploadType: TInputUploadType = 'url', url: string) => {
    const uploadFile = {
      ...file,
      type: 'image',
      name: 'web-image',
    };
    if (uploadType === 'url') {
      uploadFile.dataUrl = url;
      uploadFile.status = STATUS_SUCCESS;
      setFile(uploadFile);
      onSuccess?.({}, uploadFile);
    } else {
      try {
        uploadFile.status = STATUS_UPLOADING;
        setFile(uploadFile);
        const { originFile } = await fetchImageFileFromUrl(url);
        const request = restProps.customRequest || xhrRequest;

        let ac: string;
        if (typeof action === 'function') {
          ac = await action(originFile);
        } else {
          ac = action as string;
        }

        let data: Record<string, string | Blob>;
        if (typeof restProps.data === 'function') {
          data = restProps.data(uploadFile);
        } else {
          data = restProps.data ?? {};
        }
        request({
          action: ac,
          filename: restProps.name ?? 'file',
          data,
          file: originFile,
          headers: restProps.headers ?? {},
          withCredentials: restProps.withCredentials ?? false,
          method: restProps.method || 'post',
          onProgress: (e: IProgress) => handleProgress(e, originFile),
          onSuccess: (res: Record<string, unknown>) => handleSuccess(res, originFile),
          onError: (err: Error, res: Record<string, unknown>) => handleError(err, res, originFile),
        });
      } catch (error) {
        setFile({ ...file, error });
      }
    }
  };

  const rcUploadProps = {
    ...restProps,
    disabled,
    prefixCls,
    action,
    beforeUpload: handleBeforeUpload,
    onStart: handleStart,
    onProgress: handleProgress,
    onSuccess: handleSuccess,
    onError: handleError,
    openFileDialogOnClick: type === 'input' ? false : openFileDialogOnClick,
  };

  const triggerComponentProps: ITriggerProps = {
    triggerProps: {
      ...triggerProps,
      disabled,
    },
    file,
    accept: restProps.accept,
    inputUploadType,
    setFile,
    onRemove: handleRemove,
    onUpload: handleUpload,
    onInputUpload: handleInputUpload,
    placeholderImg,
  };

  return (
    <UploadPrefixClsContext.Provider value={prefixCls}>
      <div className={rootCls} style={style}>
        <RcUpload {...rcUploadProps} ref={rcUploadRef}>
          <Trigger {...triggerComponentProps}>{children}</Trigger>
        </RcUpload>
      </div>
    </UploadPrefixClsContext.Provider>
  );
};

export default Upload;
