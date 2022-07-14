import React, { useState, useRef, useMemo } from 'react';
import RcUpload from 'rc-upload';
import type { UploadProps as RcUploadProps } from 'rc-upload';
// import useControlledState from 'rc-util/es/hooks/useMergedState';
// import { template } from 'lodash';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import useControlledState from '../utils/hooks/useControlledState';
import {
  UploadProps,
  ITriggerProps,
  RcFile,
  UploadFile,
  UploadState,
  UploadType,
  BeforeUploadFileType,
} from './interface';
import ButtonTrigger from './triggers/ButtonTrigger';
import CardTrigger from './triggers/CardTrigger';
import InputTrigger from './triggers/InputTrigger';
import AvatarTrigger from './triggers/AvatarTrigger';
import DragTrigger from './triggers/DragTrigger';
import { imageFile2DataUrl, fileToObject, updateFileList, removeFileItem, getFileItem, isImageFile } from './utils';
// import xhrRequest from './xhrRequest';
import UploadList from './upload-list';
// import defaultLocale from './locales/zh-CN';

// export const UploadPrefixClsContext = createContext(`${defaultRootPrefixCls}-upload`);
export type ITriggerMap = {
  [key in UploadType]: React.ComponentType;
};
const triggerMap: ITriggerMap = {
  button: ButtonTrigger,
  input: InputTrigger,
  card: CardTrigger,
  avatar: AvatarTrigger,
  drag: DragTrigger,
};

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
  const [uploadFileList, setUploadFileList] = useControlledState<UploadFile[]>(fileList, defaultFileList);
  const mergedDisabled = useMemo(
    () => disabled || (maxCount && uploadFileList.length > maxCount),
    [disabled, uploadFileList.length, maxCount]
  );
  // const maxFilesCount = directory || multiple ? maxCount : 1;
  // 已经上传了的文件数量
  // const [finish, setFinish] = useState(Math.min(uploadFileList.length, maxCount));
  // 控制dragTrigger是否disabled
  // const [uploadDisabled, setUploadDisabled] = useState(disabled);

  // const locale = useLocale('Upload');
  // const { picLimit, fileLimit }: { [key: string]: string } = {
  //   ...defaultLocale,
  //   ...locale,
  // };

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

  const Trigger = triggerMap[type];

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

  /**
   * 转换状态，逐个触发change事件
   * @param files
   */
  const handleBatchStart = (
    batchFileList: {
      file: RcFile;
      parsedFile: Exclude<BeforeUploadFileType, boolean>;
    }[]
  ) => {
    const objectFileList = batchFileList.map((info) => fileToObject(info.file));
    let newFileList = [...uploadFileList];
    objectFileList.forEach((fileObj) => {
      newFileList = updateFileList(fileObj, newFileList);
    });
    // paredFile！=null 更新status=`uploading` ; 触发`onChange`
    objectFileList.forEach((fileObj, index) => {
      const currentFileObj: UploadFile = fileObj;
      // `beforeUpload` 返回false时 `parsedFile==null`,不会上传，status 不变
      if (batchFileList[index].parsedFile) {
        currentFileObj.status = 'uploading';
      }
      onFileChange(currentFileObj, newFileList);
    });
  };

  // const handleStart = (fileOnStart: RcFile) => {
  //   const uploadFile: UploadFile = {
  //     ...fileToObject(fileOnStart),
  //     status: STATUS_UPLOADING,
  //   };

  //   const updatedFileList = updateFileList(uploadFile, uploadFileList);
  //   onFileChange(uploadFile, updatedFileList);

  //   // setFile(uploadFile);
  //   // onStart?.(uploadFile, updatedFileList);
  // };
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

      // removedFileList.length < maxCount && setAlert(false);
      // removedFileList.length < maxCount && setUploadDisabled(false);

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

  // const showBeyondAlert = () =>
  //   showAlert &&
  //   maxCount && (
  //     <Alert
  //       type="error"
  //       message={
  //         isOnlyAcceptImg(restProps.accept)
  //           ? template(picLimit, { interpolate: /{([\s\S]+?)}/g })({ maxCount })
  //           : template(fileLimit, { interpolate: /{([\s\S]+?)}/g })({ maxCount })
  //       }
  //       showIcon
  //       closeable
  //       onClose={() => setAlert(false)}
  //     />
  //   );

  const renderUploadList = () =>
    showUploadList ? <UploadList items={uploadFileList} onRemove={handleRemove} prefixCls={customPrefixCls} /> : null;

  const rcUploadProps = {
    ...(restProps as RcUploadProps),
    disabled: mergedDisabled,
    prefixCls,
    action,
    directory,
    multiple,
    onBeforeUpload: handleBeforeUpload,
    onBatchStart: handleBatchStart,
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
        [`${prefixCls}-drag-uploading`]: uploadFileList.some((file) => file.status === UploadState.STATUS_UPLOADING),
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
  const rootCls = classnames(
    prefixCls,
    {
      [`${prefixCls}--disabled`]: mergedDisabled,
    },
    className
  );

  if (type === 'card') {
    <span className={rootCls} style={style}>
      <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
        {children}
      </RcUpload>
    </span>;
  }
  const triggerComponentProps: ITriggerProps = {
    // triggerProps: {
    //   ...triggerProps,
    // },
    // file,
    items: uploadFileList,
    // finishCount: finish,
    accept: restProps.accept,
    // inputUploadType,
    // setFile,
    onRemove: handleRemove,
    // onReSelect: restProps.onReSelect,
    // onInputUpload: handleInputUpload,
    // placeholderImg,
    // iconSize,
    directory,
    multiple,
    maxCount,
    disabled: mergedDisabled,
  };

  // if (type === 'drag') {
  //   return (
  //     <div className={rootCls} style={style}>
  //       <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
  //         <Trigger {...triggerComponentProps}>{children}</Trigger>
  //       </RcUpload>
  //       {renderUploadList()}
  //     </div>
  //   );
  // }

  return (
    <div className={rootCls} style={style}>
      <RcUpload data-testid="upload" {...rcUploadProps} ref={rcUploadRef}>
        <Trigger {...triggerComponentProps}>{children}</Trigger>
      </RcUpload>
    </div>
  );
};

export default Upload;
