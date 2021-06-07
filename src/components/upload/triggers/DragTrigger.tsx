import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { File, PictureOutlined } from '@gio-design/icons';
import Loading from '../../loading';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import { UploadPrefixClsContext } from '../UploadContext';
import Preview, { PreviewForNotImage } from '../Preview';
import Actions from '../Actions';
import { isOnlyAcceptImg, isImageFile } from '../utils';

const DragTrigger: React.FC<ITriggerProps> = ({ triggerProps, file, accept, onRemove }: ITriggerProps) => {
  const [dragState, setDragState] = useState('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__drag`, {
    [`${prefixCls}__drag--hover`]: dragState === 'dragover',
  });
  const placeholderCls = classnames(`${prefixCls}__drag-placeholder`);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => setDragState(e.type);

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
            {isOnlyAcceptImg(accept) ? <PictureOutlined /> : <File />}
            <div>点击或拖拽上传</div>
          </div>
        )}
      </div>
    </Loading>
  );
};

export default DragTrigger;
