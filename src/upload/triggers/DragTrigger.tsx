import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { useLocale } from '@gio-design/utils';
import { template } from 'lodash';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING, STATUS_NOT_YET, STATUS_ERROR } from '../interface';
import { UploadPrefixClsContext } from '../Upload';
import Preview, { PreviewForNotImage } from '../Preview';
import Actions from '../Actions';
import { isOnlyAcceptImg, isImageFile } from '../utils';
import { FolderSVG, PictureSVG, DisabledFolderSVG, DisabledPictureSVG } from '../svg';
import Progress from '../../progress';
import defaultLocale from '../locales/zh-CN';

const DragTrigger: React.FC<ITriggerProps> = ({
  triggerProps,
  file,
  accept,
  onRemove,
  iconSize,
  items,
  finishCount = 0,
  disabled,
  directory,
  multiple,
  maxCount,
  dragStyle,
  onReSelect,
}: ITriggerProps) => {
  const [dragState, setDragState] = useState('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__drag`, {
    [`${prefixCls}__drag--hover`]: dragState === 'dragover',
  });
  const placeholderCls = classnames(`${prefixCls}__drag-placeholder`);
  const progressCls = classnames(`${prefixCls}__drag-progress`);

  const locale = useLocale('Upload');

  const {
    disabledPic,
    disabledFile,
    dragPic,
    dragFile,
    uploading,
    picPending,
    filePending,
  }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => setDragState(e.type);

  const [currentWidth, currentHeight] = Array.isArray(iconSize) ? iconSize : [iconSize, iconSize];

  const fileListLength = items?.length ?? 0;

  const renderDisabledPlaceholder = () =>
    isOnlyAcceptImg(accept) ? (
      <>
        <DisabledPictureSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>{template(disabledPic, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount })}</div>
      </>
    ) : (
      <>
        <DisabledFolderSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>{template(disabledFile, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount })}</div>
      </>
    );

  const renderPlaceholder = () =>
    isOnlyAcceptImg(accept) ? (
      <>
        <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>{template(dragPic, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount, maxCount })}</div>
      </>
    ) : (
      <>
        <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>{template(dragFile, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount, maxCount })}</div>
      </>
    );

  // 单个文件上传渲染
  const renderSingleUpload = () => (
    <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
      {'percent' in file && file.status === STATUS_UPLOADING ? (
        <div className={`${prefixCls}__drag-container`}>
          <Progress
            percent={file.percent}
            status="active"
            className={progressCls}
            format={() => <span style={{ color: '#313E75' }}>{Math.round((file.percent || 0) * 100) / 100}%</span>}
          />
          <span className="loading-text">{uploading}</span>
        </div>
      ) : null}
      {file.status === STATUS_SUCCESS && (
        <>
          {isImageFile(file) || isOnlyAcceptImg(accept) ? (
            <>
              <Preview file={file} size="100%" />{' '}
              <Actions file={file} useUpload onRemove={onRemove} placement="rightTop" />
            </>
          ) : (
            <>
              <PreviewForNotImage onRemove={onRemove} onReSelect={onReSelect} file={file} />
              <Actions file={file} onRemove={onRemove} showModal={false} />
            </>
          )}
        </>
      )}
      {file.status === STATUS_ERROR && (
        <>
          {isOnlyAcceptImg(accept) ? (
            <div className={placeholderCls}>
              <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
              <div>{picPending}</div>
            </div>
          ) : (
            <>
              <PreviewForNotImage onReSelect={onReSelect} file={file} onRemove={onRemove} />
              <Actions file={file} onRemove={onRemove} showModal={false} />
            </>
          )}
        </>
      )}
      {file.status === STATUS_NOT_YET &&
        (disabled ? (
          <div className={placeholderCls}>
            {isOnlyAcceptImg(accept) ? (
              <>
                <DisabledPictureSVG style={{ width: currentWidth, height: currentHeight }} />
                <div>{picPending}</div>
              </>
            ) : (
              <>
                <DisabledFolderSVG style={{ width: currentWidth, height: currentHeight }} />
                <div>{filePending}</div>
              </>
            )}
          </div>
        ) : (
          <div className={placeholderCls}>
            {isOnlyAcceptImg(accept) ? (
              <>
                <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
                <div>{picPending}</div>
              </>
            ) : (
              <>
                <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
                <div>{filePending}</div>
              </>
            )}
          </div>
        ))}
    </div>
  );

  // 批量上传渲染
  const renderMultipleUpload = () => {
    const currentProgress = (finishCount / fileListLength) * 100;
    const multiplePercent = fileListLength > 1 ? currentProgress : file.percent;
    return (
      <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
        {finishCount < fileListLength ? (
          <div className={`${prefixCls}__drag-container`}>
            <Progress
              percent={multiplePercent}
              status="active"
              className={progressCls}
              format={() => <span style={{ color: '#313E75' }}>{Math.round((multiplePercent || 0) * 100) / 100}%</span>}
            />
            <span className="loading-text">{uploading}</span>
          </div>
        ) : null}
        {fileListLength !== 0 &&
          finishCount === fileListLength &&
          (disabled ? (
            <div className={placeholderCls}>{renderDisabledPlaceholder()}</div>
          ) : (
            <div className={placeholderCls}>{renderPlaceholder()}</div>
          ))}
        {fileListLength === 0 && file.status === STATUS_NOT_YET && (
          <div className={placeholderCls}>
            {isOnlyAcceptImg(accept) ? (
              <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
            ) : (
              <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
            )}
            <div>{filePending}</div>
          </div>
        )}
      </div>
    );
  };
  const renderUpload = () => (directory || multiple ? renderMultipleUpload() : renderSingleUpload());
  return <>{renderUpload()}</>;
};

export default DragTrigger;
