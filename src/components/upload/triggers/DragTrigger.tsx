import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { PictureOutlined } from '@gio-design/icons';
import Loading from '../../loading';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import { UploadPrefixClsContext } from '../UploadContext';
import Preview, { PreviewForNotImage } from '../Preview';
import Actions from '../Actions';
import { isOnlyAcceptImg, isImageFile } from '../utils';
import { dataMap } from '../../grid/help';
import FolderSVG from '../FolderSVG';

const DragTrigger: React.FC<ITriggerProps> = ({ triggerProps, file, accept, onRemove, iconSize }: ITriggerProps) => {
  const [dragState, setDragState] = useState('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__drag`, {
    [`${prefixCls}__drag--hover`]: dragState === 'dragover',
  });
  const placeholderCls = classnames(`${prefixCls}__drag-placeholder`);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => setDragState(e.type);

  const iconCSSVariables = dataMap(
    {
      width: Array.isArray(iconSize) ? iconSize[0] : iconSize,
      height: Array.isArray(iconSize) ? iconSize[1] : iconSize,
    },
    '--gio-upload-dragTrigger-img'
  ) as React.CSSProperties;

  return (
    <Loading loading={file.status === STATUS_UPLOADING} size="small" title="上传中">
      <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag}>
        {file.status === STATUS_SUCCESS && (
          <>
            {isImageFile(file) ? <Preview file={file} size="100%" /> : <PreviewForNotImage file={file} />}
            <Actions file={file} useUpload onRemove={onRemove} placement="rightTop" />
          </>
        )}
        {file.status !== STATUS_SUCCESS && (
          <div className={placeholderCls}>
            {isOnlyAcceptImg(accept) ? (
              <PictureOutlined style={iconCSSVariables} />
            ) : (
              <FolderSVG style={iconCSSVariables} />
            )}
            <div>点击或拖拽上传</div>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default DragTrigger;
