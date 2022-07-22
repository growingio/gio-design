import React, { useState, useRef, useMemo } from 'react';
import RcUpload from 'rc-upload';
import type { UploadProps as RcUploadProps } from 'rc-upload';
// import useControlledState from 'rc-util/es/hooks/useMergedState';
// import { template } from 'lodash';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { DocumentFilled, LoadingTwoTone } from '@gio-design/icons';
import useControlledState from '../utils/hooks/useControlledState';
import { UploadProps, RcFile, UploadFile, UploadState, UploadType, ShowUploadListInterface } from './interface';
// import ButtonTrigger from './triggers/ButtonTrigger';
// import CardTrigger from './triggers/CardTrigger';
// import InputTrigger from './triggers/InputTrigger';
// import AvatarTrigger from './triggers/AvatarTrigger';
// import DragTrigger from './triggers/DragTrigger';
import {
  imageFile2DataUrl,
  fileToObject,
  updateFileList,
  removeFileItem,
  getFileItem,
  isImageFile,
  isImageUrl,
} from './utils';
// import xhrRequest from './xhrRequest';
import UploadList from './upload-list';
import Button from '../button';
import defaultLocale from './locales/zh-CN';
import CardTrigger from './triggers/CardTrigger';
import FileTypeIcon from './FileTypeIcon';

// export const UploadPrefixClsContext = createContext(`${defaultRootPrefixCls}-upload`);
export type ITriggerMap = {
  [key in UploadType]: React.ComponentType;
};
// const triggerMap: ITriggerMap = {
//   button: ButtonTrigger,
//   input: InputTrigger,
//   card: CardTrigger,
//   avatar: AvatarTrigger,
//   drag: DragTrigger,
// };

const Upload: React.FC<UploadProps> = ({
  // file: uploadedFile,
  fileList,
  defaultFileList,
  // successBorder = false,
  style,
  prefixCls: customPrefixCls,
  className,
  disabled,
  type = 'button',
  // inputUploadType = 'url',
  // triggerProps,
  action = '.',
  beforeUpload,
  // onStart,
  onProgress,
  onError,
  onSuccess,
  onChange,
  onRemove,
  openFileDialogOnClick = true,
  children,
  // placeholderImg,
  // iconSize,
  maxCount,
  directory,
  multiple,
  showUploadList = true,
  isImage = isImageUrl,
  ...restProps
}: UploadProps) => {
  // const [file, setFile] = useState<UploadFile>(getEmptyFileObj(uploadedFile));
  // const [showAlert, setAlert] = useState(false);
  // 要上传的文件列表
  // const [uploadFileList, setUploadFileList] = useControlledState<RcFile[]>(
  //   (defaultFileList?.slice(0, maxCount) as RcFile[]) || [],
  //   {
  //     value: fileList?.slice(0, maxCount) as RcFile[],
  //   }
  // );
  const [dragState, setDragState] = useState('drop');
  const [uploadFileList, setUploadFileList] = useControlledState<UploadFile[]>(fileList, defaultFileList || []);
  const mergedDisabled = useMemo(
    () => disabled || (maxCount && uploadFileList.length > maxCount),
    [disabled, uploadFileList.length, maxCount]
  );
  const isUploading = useMemo(
    () => uploadFileList.some((file) => file.status === UploadState.STATUS_UPLOADING),
    [uploadFileList]
  );
  // const maxFilesCount = directory || multiple ? maxCount : 1;
  // 已经上传了的文件数量
  // const [finish, setFinish] = useState(Math.min(uploadFileList.length, maxCount));
  // 控制dragTrigger是否disabled
  // const [uploadDisabled, setUploadDisabled] = useState(disabled);

  const locale = useLocale('Upload');
  const { buttonLabel }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };

  // useEffect(() => {
  //   setFile(getEmptyFileObj(uploadedFile));
  // }, [uploadedFile]);

  // useEffect(() => {
  //   if (Number(defaultFileList?.length) >= maxCount || Number(fileList?.length) >= maxCount) {
  //     setUploadDisabled(true);
  //   }
  // }, [defaultFileList, fileList, maxCount]);

  const rcUploadRef = useRef(null);
  const prefixCls = usePrefixCls('upload', customPrefixCls);

  // const Trigger = triggerMap[type];

  const onFileChange = (file: UploadFile, changedFileList: UploadFile[], event?: { percent: number }) => {
    let cloneList = [...changedFileList];

    // 选择的文件超出最大上传文件数量限制
    if (maxCount === 1) {
      // 始终取最后一个
      cloneList = cloneList.slice(-1);
    } else if (maxCount && maxCount > 0) {
      // if (cloneList.length >= maxCount && (directory || multiple)) {
      //   cloneList.length > maxCount && setAlert(true);
      // }
      cloneList = cloneList.slice(0, maxCount);
    }

    // const finishCount = cloneList.filter(
    //   (item: UploadFile) => item.status === 'success' || item.status === 'error'
    // ).length;

    // setFinish(Math.min(finishCount, cloneList.length));
    setUploadFileList(cloneList as RcFile[], true);

    onChange?.(file, cloneList, event);
  };

  const handleBeforeUpload = (fileBeforeUpload: RcFile, fileListArgs: RcFile[]) =>
    beforeUpload?.(fileBeforeUpload, fileListArgs);

  // const onBeforeUpload = async (fileBeforeUpload: RcFile, fileListArgs: RcFile[]) => {
  //   let parsedFile: File | Blob | string = fileBeforeUpload;
  //   if (beforeUpload) {
  //     const result = await beforeUpload(fileBeforeUpload, fileListArgs);
  //     if (result === false) {
  //       return false;
  //     }
  //     if (typeof result === 'object' && result) {
  //       parsedFile = result as File;
  //     }
  //   }
  //   // 如果选择的文件数量超出最大限制，进行截断
  //   // const fileIndex = mergeFileList.findIndex((item) => item.uid === fileBeforeUpload.uid);
  //   // if (fileIndex >= maxCount) {
  //   //   return false;
  //   // }
  //   return parsedFile as RcFile;
  // };

  const handleStart = (fileOnStart: RcFile) => {
    const uploadFile: UploadFile = {
      ...fileToObject(fileOnStart),
      status: UploadState.STATUS_UPLOADING,
    };

    const updatedFileList = updateFileList(uploadFile, uploadFileList);
    onFileChange(uploadFile, updatedFileList);
  };
  // onProgress: (event: { percent: number }): void
  const handleProgress = (e: { percent: number }, parsedFile: RcFile) => {
    if (!getFileItem(parsedFile, uploadFileList)) {
      return;
    }

    const progressFile: UploadFile = {
      ...fileToObject(parsedFile),
      status: UploadState.STATUS_UPLOADING,
      percent: e.percent,
    };

    const nextFileList = updateFileList(progressFile, uploadFileList);
    onFileChange(progressFile, nextFileList, e);

    onProgress?.(e, parsedFile, nextFileList as RcFile[]);
  };
  const handleSuccess = async (response: Record<string, unknown>, file: RcFile) => {
    if (!getFileItem(file, uploadFileList) && (directory || multiple)) {
      return;
    }

    const uploadFile: UploadFile = {
      ...fileToObject(file),
      response,
      status: UploadState.STATUS_SUCCESS,
      percent: 100,
    };
    // 图片类型 生成 dataUrl 预览图
    try {
      if (isImageFile(uploadFile)) {
        const dataUrl = await imageFile2DataUrl(file);
        uploadFile.dataUrl = dataUrl;
      }
    } catch (error) {
      /* do nothing */
    }

    const nextFileList = updateFileList(uploadFile, uploadFileList);

    onSuccess?.(response, uploadFile, nextFileList);

    onFileChange(uploadFile, nextFileList);
  };

  const handleError = (error: Error, response: Record<string, unknown>, file: RcFile) => {
    if (!getFileItem(file, uploadFileList) && (directory || multiple)) {
      return;
    }

    const errorFile: UploadFile = {
      ...fileToObject(file),
      error,
      response,
      status: UploadState.STATUS_ERROR,
    };

    const nextFileList = updateFileList(errorFile, uploadFileList);
    onFileChange(errorFile, nextFileList);

    onError?.(error, errorFile, nextFileList);
  };

  const handleRemove = (file: UploadFile) => {
    Promise.resolve(typeof onRemove === 'function' ? onRemove(file) : onRemove).then((res) => {
      // 使用者返回了 false，阻止删除操作
      if (res === false) {
        return;
      }

      const removedFileList = removeFileItem(file, uploadFileList);

      onFileChange({ ...file, status: UploadState.STATUS_REMOVED }, removedFileList);
    });
  };

  // const handleInputUpload = async (uploadType: TInputUploadType, url: string) => {
  //   const uploadFile = {
  //     ...file,
  //     type: 'image',
  //     name: 'web-image',
  //   };
  //   if (uploadType === 'url') {
  //     uploadFile.dataUrl = url;
  //     uploadFile.status = STATUS_SUCCESS;
  //     setFile(uploadFile);
  //     onSuccess?.({}, uploadFile, uploadFileList);
  //   } else {
  //     try {
  //       uploadFile.status = STATUS_UPLOADING;
  //       setFile(uploadFile);
  //       const { originFile } = await fetchImageFileFromUrl(url);
  //       const request = restProps.customRequest || xhrRequest;
  //       let ac: string;
  //       if (typeof action === 'function') {
  //         ac = await action(originFile);
  //       } else {
  //         ac = action as string;
  //       }

  //       let data: Record<string, string | Blob>;
  //       if (typeof restProps.data === 'function') {
  //         data = restProps.data(uploadFile);
  //       } else {
  //         data = restProps.data ?? {};
  //       }
  //       request({
  //         action: ac,
  //         filename: restProps.name ?? 'file',
  //         data,
  //         file: originFile,
  //         headers: restProps.headers ?? {},
  //         withCredentials: restProps.withCredentials ?? false,
  //         method: restProps.method || 'post',
  //         onProgress: (e: IProgress) => handleProgress(e, originFile),
  //         onSuccess: (res: Record<string, unknown>) => handleSuccess(res, originFile),
  //         onError: (err: Error, res: Record<string, unknown>) => handleError(err, res, originFile),
  //       });
  //     } catch (error) {
  //       setFile({ ...file, error });
  //       onError?.(error, file, uploadFileList);
  //     }
  //   }
  // };

  /**
   * 上传列表类型
   */
  const { listType = type === 'card' ? 'card' : 'text' } =
    typeof showUploadList === 'boolean' ? ({} as ShowUploadListInterface) : showUploadList;
  const renderUploadList = (button?: React.ReactNode, buttonVisible?: boolean) => {
    if (!showUploadList) {
      return button;
    }
    return (
      <UploadList
        listType={listType}
        items={uploadFileList}
        onRemove={handleRemove}
        prefixCls={customPrefixCls}
        appendAction={button}
        appendActionVisible={buttonVisible}
        isImage={isImage}
      />
    );
  };

  const rcUploadProps: RcUploadProps = {
    ...(restProps as RcUploadProps),
    disabled: mergedDisabled,
    prefixCls,
    action,
    directory,
    multiple,
    beforeUpload: handleBeforeUpload,
    onStart: handleStart,
    onProgress: handleProgress,
    onSuccess: handleSuccess,
    onError: handleError,
    openFileDialogOnClick,
  };

  if (type === 'drag') {
    const dragCls = classnames(
      prefixCls,
      {
        [`${prefixCls}-drag`]: true,
        [`${prefixCls}-drag-uploading`]: isUploading,
        [`${prefixCls}-drag-hover`]: dragState === 'dragover',
        [`${prefixCls}-disabled`]: mergedDisabled,
      },
      className
    );
    const onFileDrag = (e: React.DragEvent<HTMLDivElement>): void => {
      setDragState(e.type);
    };

    return (
      <span>
        <div
          data-testid="upload"
          className={dragCls}
          onDrop={onFileDrag}
          onDragOver={onFileDrag}
          onDragLeave={onFileDrag}
          style={style}
        >
          <RcUpload {...rcUploadProps} ref={rcUploadRef} className={`${prefixCls}-btn`}>
            <div className={`${prefixCls}-drag-container`}>{children}</div>
          </RcUpload>
        </div>
        {renderUploadList()}
      </span>
    );
  }

  const defaultButton = (
    <Button type="secondary" prefix={isUploading ? <LoadingTwoTone rotating /> : <DocumentFilled />}>
      {buttonLabel}
    </Button>
  );

  const renderUploadButton = (defaultTrigger?: React.ReactElement, uploadButtonStyle?: React.CSSProperties) => {
    const uploadButtonCls = classnames(prefixCls, {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-${listType}`]: true,
      [`${prefixCls}-disabled`]: mergedDisabled,
      [`${prefixCls}-uploading`]: isUploading,
      [`${prefixCls}-error`]:
        maxCount === 1 && uploadFileList[uploadFileList.length - 1]?.status === UploadState.STATUS_ERROR,
      [`${prefixCls}-success`]:
        maxCount === 1 && uploadFileList[uploadFileList.length - 1]?.status === UploadState.STATUS_SUCCESS,
      [`${prefixCls}-done`]:
        maxCount === 1 && uploadFileList[uploadFileList.length - 1]?.status === UploadState.STATUS_DONE,
    });
    return (
      <div className={uploadButtonCls} style={uploadButtonStyle}>
        <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
          {React.isValidElement(children)
            ? React.cloneElement(children, {
                disabled: mergedDisabled,
                style,
              })
            : defaultTrigger}
        </RcUpload>
      </div>
    );
  };

  if (listType === 'card') {
    const iconRender = (file: UploadFile) =>
      file.status === UploadState.STATUS_UPLOADING ? null : (
        <FileTypeIcon file={file} prefixCls={`${prefixCls}-preview`} isImage={isImage} />
      );
    const file = maxCount === 1 ? uploadFileList[0] : undefined;

    const triggerButton = (
      <CardTrigger
        onRemove={handleRemove}
        file={file}
        disabled={mergedDisabled}
        isImage={isImage}
        iconRender={iconRender}
      />
    );
    return (
      <span className={classnames(`${prefixCls}-card-wrapper`, className)}>
        {renderUploadList(renderUploadButton(triggerButton), uploadFileList.length < maxCount)}
      </span>
    );
  }

  return (
    <span className={className}>
      {renderUploadButton(defaultButton)}
      {renderUploadList()}
    </span>
  );
};

export default Upload;
