import React, { useContext } from 'react';
import classnames from 'classnames';
import Loading from '../../loading';
import Avatar from '../../avatar';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import { UploadPrefixClsContext } from '../UploadContext';
import Actions from '../Actions';

const AvatarTrigger: React.FC<ITriggerProps> = ({
  triggerProps,
  file,
  onRemove,
  onUpload,
  children,
  placeholderImg = '',
}: ITriggerProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__avatar`);

  return (
    <Loading loading={file?.status === STATUS_UPLOADING} size="small" title="上传中">
      <span className={cls}>
        <Avatar src={file?.dataUrl ?? placeholderImg} size="huge">
          {children as string}
        </Avatar>
        <Actions
          file={file}
          useUpload
          useDelete={file?.status === STATUS_SUCCESS}
          onRemove={onRemove}
          onUpload={onUpload}
        />
      </span>
    </Loading>
  );
};

export default AvatarTrigger;
