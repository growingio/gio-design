import React, { useContext } from 'react';
import classnames from 'classnames';
import { DeleteOutlined, UploadOutlined } from '@gio-design/icons';
import { UploadPrefixClsContext } from './UploadContext';
import { IActionsProps, STATUS_SUCCESS } from './interface';

const Actions: React.FC<IActionsProps> = ({
  useDelete = true,
  useUpload,
  file,
  onRemove,
  placement = 'center',
}: IActionsProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__actions`, {
    [`${prefixCls}__actions--center`]: placement === 'center',
    [`${prefixCls}__actions--right-top`]: placement === 'rightTop',
  });
  const iconContainerCls = classnames(`${prefixCls}__actions-container`);
  const iconCls = classnames(`${prefixCls}__actions-icon`);

  const handleStopPropagation = (e: any) => {
    if (!e.target?.classList?.contains('gio-upload__actions-icon') && file?.status === STATUS_SUCCESS) {
      e.stopPropagation();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span className={cls} onClick={handleStopPropagation} aria-hidden="true">
      <span className={iconContainerCls}>
        {useUpload && <UploadOutlined className={iconCls} />}
        {useDelete && <DeleteOutlined className={iconCls} onClick={handleRemove} />}
      </span>
    </span>
  );
};

export default Actions;
