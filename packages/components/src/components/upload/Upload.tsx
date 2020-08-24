import React, { useState, useContext, useRef } from 'react';
import RcUpload from 'rc-upload';
import classnames from 'classnames';
import { ConfigContext } from '../config-provider';
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
  ...restProps
}) => {
  const [file, setFile] = useState<IUploadFile>(getEmptyFileObj());

  const rcUploadRef = useRef(null);
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('upload', customPrefixCls);

  const rootCls = classnames(className, prefixCls, {
    [`${prefixCls}--disabled`]: disabled,
    [`${prefixCls}--success`]: file?.status === STATUS_SUCCESS,
    [`${prefixCls}--error`]: file?.status === STATUS_ERROR,
  });

  const Trigger = triggerMap[type];

  const handleBeforeUpload = (file: IRcFile, fileList: IRcFile[]) => beforeUpload?.(file, fileList);

  const handleStart = (file: IRcFile) => {
    const uploadFile: IUploadFile = {
      ...fileToObject(file),
      status: STATUS_UPLOADING,
    };
    setFile(uploadFile);
    onStart?.(uploadFile);
  };

  const handleProgress = (step: IProgress, file: IRcFile) => {
    const progressFile: IUploadFile = {
      ...fileToObject(file),
      status: STATUS_UPLOADING,
      percent: step.percent,
    };
    setFile(progressFile);
    onProgress?.(step, file);
  };

  const handleSuccess = async (response: object, file: IRcFile) => {
    let dataUrl = '';
    const uploadFile: IUploadFile = {
      ...fileToObject(file),
      response,
      status: STATUS_SUCCESS,
    };

    try {
      if (file.type.startsWith('image/')) {
        dataUrl = await imageFile2DataUrl(file);
        uploadFile.dataUrl = dataUrl;
      }
    } catch (error) {
      console.log(error);
    }

    setFile(uploadFile);
    onSuccess?.(response, uploadFile);
  };

  const handleError = (error: Error, response: any, file: IRcFile) => {
    if (type !== 'input') {
      Toast.error('上传失败！');
    }
    const errorFile: IUploadFile = {
      ...fileToObject(file),
      error,
      response,
      status: STATUS_ERROR,
    };
    setFile(type !== 'drag' ? getEmptyFileObj() : errorFile);
    onError?.(error, errorFile);
  };

  const handleRemove = () => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then((res) => {
      // 使用者返回了 false，阻止删除操作
      if (res === false) {
        return;
      }

      setFile(getEmptyFileObj());
    });
  };

  const handleInputUpload = async (type: TInputUploadType = 'url', url: string) => {
    const uploadFile = {
      ...file,
      type: 'image',
      name: 'web-image',
    };
    if (type === 'url') {
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

        let data: object;
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
          onSuccess: (res: object) => handleSuccess(res, originFile),
          onError: (err: Error, res: object) => handleError(err, res, originFile),
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
    onInputUpload: handleInputUpload,
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
