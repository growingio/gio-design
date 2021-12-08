import React, { useState, useRef, useEffect, createContext } from 'react';
import RcUpload from 'rc-upload';
import useControlledState from 'rc-util/es/hooks/useMergedState';
import { template } from 'lodash';
import classnames from 'classnames';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import { defaultRootPrefixCls } from '../config-provider';
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
  STATUS_NOT_YET,
  TInputUploadType,
} from './interface';
import ButtonTrigger from './triggers/ButtonTrigger';
import CardTrigger from './triggers/CardTrigger';
import InputTrigger from './triggers/InputTrigger';
import AvatarTrigger from './triggers/AvatarTrigger';
import DragTrigger from './triggers/DragTrigger';
import {
  imageFile2DataUrl,
  fileToObject,
  getEmptyFileObj,
  fetchImageFileFromUrl,
  updateFileList,
  removeFileItem,
  getFileItem,
  isOnlyAcceptImg,
} from './utils';
import xhrRequest from './xhrRequest';
import UploadList from './UploadList';
import Alert from '../alert';
import defaultLocale from './locales/zh-CN';

export const UploadPrefixClsContext = createContext(`${defaultRootPrefixCls}-upload`);

const triggerMap: ITriggerMap = {
  button: ButtonTrigger,
  input: InputTrigger,
  card: CardTrigger,
  avatar: AvatarTrigger,
  drag: DragTrigger,
};

const Upload: React.FC<IUploadProps> = ({
  file: uploadedFile,
  fileList,
  defaultFileList,
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
  onChange,
  onRemove,
  openFileDialogOnClick = true,
  children,
  placeholderImg,
  iconSize,
  maxCount = 1,
  directory,
  multiple,
  showUploadList = true,
  ...restProps
}: IUploadProps) => {
  const [file, setFile] = useState<IUploadFile>(getEmptyFileObj(uploadedFile));
  const [showAlert, setAlert] = useState(false);
  // 要上传的文件列表
  const [uploadFileList, setUploadFileList] = useControlledState<IRcFile[]>(
    (defaultFileList?.slice(0, maxCount) as IRcFile[]) || [],
    {
      value: fileList?.slice(0, maxCount) as IRcFile[],
    }
  );
  // 已经上传了的文件数量
  const [finish, setFinish] = useState(Math.min(uploadFileList.length, maxCount));
  // 控制dragTrigger是否disabled
  const [uploadDisabled, setUploadDisabled] = useState(disabled);

  const locale = useLocale('Upload');
  const { defaultErrorMessage, picLimit, fileLimit }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };

  useEffect(() => {
    setFile(getEmptyFileObj(uploadedFile));
  }, [uploadedFile]);

  useEffect(() => {
    if (Number(defaultFileList?.length) >= maxCount || Number(fileList?.length) >= maxCount) {
      setUploadDisabled(true);
    }
  }, [defaultFileList, fileList, maxCount]);

  const rcUploadRef = useRef(null);
  const prefixCls = usePrefixCls('upload', customPrefixCls);

  const rootCls = classnames(className, prefixCls, {
    [`${prefixCls}--disabled`]: disabled || (type === 'drag' && uploadDisabled),
    [`${prefixCls}--error`]: file.status === STATUS_ERROR,
    [`${prefixCls}--success`]: file.status === STATUS_SUCCESS && !successBorder,
    [`${prefixCls}--success-border`]: file.status === STATUS_SUCCESS && successBorder,
    [`${prefixCls}-drag-container`]: type === 'drag',
  });
  const Trigger = triggerMap[type];

  const onFileChange = (_file: IUploadFile, mergedFileList: IUploadFile[]) => {
    let cloneList = [...mergedFileList];

    // 选择的文件超出最大上传文件数量限制
    if (cloneList.length >= maxCount && (directory || multiple)) {
      setUploadDisabled(true);
      cloneList.length > maxCount && setAlert(true);
      cloneList = cloneList.slice(0, maxCount);
    }

    const finishCount = cloneList.filter(
      (item: IUploadFile) => item.status === 'success' || item.status === 'error'
    ).length;

    setFinish(Math.min(finishCount, cloneList.length));
    setUploadFileList(cloneList as IRcFile[]);

    onChange?.(_file, cloneList);
  };

  const handleSingleBeforeUpload = (fileBeforeUpload: IRcFile, fileListArgs: IRcFile[]) =>
    beforeUpload?.(fileBeforeUpload, fileListArgs);

  const handleMultipleBeforeUpload = (fileBeforeUpload: IRcFile, fileListArgs: IRcFile[]) => {
    const mergeFileList = [...uploadFileList, ...fileListArgs];
    // 如果选择的文件数量超出最大限制，进行截断
    const fileIndex = mergeFileList.findIndex((item) => item.uid === fileBeforeUpload.uid);
    if (fileIndex >= maxCount) {
      return false;
    }

    onFileChange(fileBeforeUpload, mergeFileList);

    return beforeUpload?.(fileBeforeUpload, fileListArgs);
  };

  const handleStart = (fileOnStart: IRcFile) => {
    const uploadFile: IUploadFile = {
      ...fileToObject(fileOnStart),
      status: STATUS_UPLOADING,
    };

    const updatedFileList = updateFileList(uploadFile, uploadFileList);
    onFileChange(uploadFile, updatedFileList);

    setFile(uploadFile);
    onStart?.(uploadFile, updatedFileList);
  };

  const handleProgress = (step: IProgress, fileOnProgress: IRcFile) => {
    if (!getFileItem(fileOnProgress, uploadFileList) && (directory || multiple)) {
      return;
    }

    const progressFile: IUploadFile = {
      ...fileToObject(fileOnProgress),
      status: STATUS_UPLOADING,
      percent: step.percent,
    };

    const updatedFileList = updateFileList(progressFile, uploadFileList);
    onFileChange(progressFile, updatedFileList);

    setFile(progressFile);
    onProgress?.(step, fileOnProgress, updatedFileList as IRcFile[]);
  };

  const handleSuccess = async (response: Record<string, unknown>, fileOnSuccess: IRcFile) => {
    if (!getFileItem(fileOnSuccess, uploadFileList) && (directory || multiple)) {
      return;
    }

    let dataUrl = '';
    const uploadFile: IUploadFile = {
      ...fileToObject(fileOnSuccess),
      response,
      status: STATUS_SUCCESS,
      percent: 100,
    };

    try {
      if (fileOnSuccess.type?.startsWith('image/')) {
        dataUrl = await imageFile2DataUrl(fileOnSuccess);
        uploadFile.dataUrl = dataUrl;
      }
    } catch (error) {
      console.error(error);
    }

    const updatedFileList = updateFileList(uploadFile, uploadFileList);

    onSuccess?.(response, uploadFile, updatedFileList);
    setFile(uploadFile);
    onFileChange(uploadFile, updatedFileList);
  };

  const handleError = (error: Error, response: any, fileOnError: IRcFile) => {
    if (!getFileItem(fileOnError, uploadFileList) && (directory || multiple)) {
      return;
    }

    const errorFile: IUploadFile = {
      ...fileToObject(fileOnError),
      error,
      response,
      status: STATUS_ERROR,
      errorMessage: defaultErrorMessage,
    };

    const updatedFileList = updateFileList(errorFile, uploadFileList);
    onFileChange(errorFile, updatedFileList);

    onError?.(error, errorFile, updatedFileList);

    setFile(type !== 'drag' ? getEmptyFileObj(uploadedFile) : errorFile);
  };

  const handleRemove = (_file: IUploadFile) => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(_file) : onRemove).then((res) => {
      // 使用者返回了 false，阻止删除操作
      if (res === false) {
        return;
      }

      const removedFileList = removeFileItem(_file, uploadFileList);

      removedFileList.length < maxCount && setAlert(false);
      removedFileList.length < maxCount && setUploadDisabled(false);

      onFileChange(_file, removedFileList);

      if (file.dataUrl === uploadedFile?.dataUrl) {
        setFile({
          uid: '',
          size: 0,
          name: '本地上传',
          type: '$empty-file',
          status: STATUS_NOT_YET,
          dataUrl: '',
        });
      } else {
        setFile(getEmptyFileObj(uploadedFile));
      }
    });
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
      onSuccess?.({}, uploadFile, uploadFileList);
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
        onError?.(error, file, uploadFileList);
      }
    }
  };

  const showBeyondAlert = () =>
    showAlert &&
    maxCount && (
      <Alert
        type="error"
        message={
          isOnlyAcceptImg(restProps.accept)
            ? template(picLimit, { interpolate: /{([\s\S]+?)}/g })({ maxCount })
            : template(fileLimit, { interpolate: /{([\s\S]+?)}/g })({ maxCount })
        }
        showIcon
        closeable
        onClose={() => setAlert(false)}
      />
    );

  const renderUploadList = () =>
    showUploadList && (directory || multiple) ? (
      <UploadList items={uploadFileList} onRemove={handleRemove} accept={restProps.accept} />
    ) : null;

  const rcUploadProps = {
    ...restProps,
    disabled: disabled || (type === 'drag' && uploadDisabled),
    prefixCls: type === 'drag' ? `${prefixCls}-drag-container` : prefixCls,
    action,
    directory,
    multiple,
    beforeUpload: directory || multiple ? handleMultipleBeforeUpload : handleSingleBeforeUpload,
    onStart: handleStart,
    onProgress: handleProgress,
    onSuccess: handleSuccess,
    onError: handleError,
    openFileDialogOnClick: type === 'input' ? false : openFileDialogOnClick,
  };

  const triggerComponentProps: ITriggerProps = {
    triggerProps: {
      ...triggerProps,
    },
    file,
    items: uploadFileList,
    finishCount: finish,
    accept: restProps.accept,
    inputUploadType,
    setFile,
    onRemove: handleRemove,
    onReSelect: restProps.onReSelect,
    onInputUpload: handleInputUpload,
    placeholderImg,
    iconSize,
    directory,
    multiple,
    maxCount,
    disabled: disabled || (type === 'drag' && uploadDisabled),
    dragStyle: restProps.dragStyle,
  };

  if (type === 'drag') {
    return (
      <UploadPrefixClsContext.Provider value={prefixCls}>
        <div className={rootCls} style={style}>
          {showBeyondAlert()}
          <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
            <Trigger {...triggerComponentProps}>{children}</Trigger>
          </RcUpload>
          {renderUploadList()}
        </div>
      </UploadPrefixClsContext.Provider>
    );
  }

  return (
    <UploadPrefixClsContext.Provider value={prefixCls}>
      <div className={rootCls} style={style}>
        <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
          <Trigger {...triggerComponentProps}>{children}</Trigger>
        </RcUpload>
      </div>
    </UploadPrefixClsContext.Provider>
  );
};

export default Upload;
