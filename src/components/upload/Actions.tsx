import React, { useContext, useRef } from 'react';
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
  const spanRef = useRef<HTMLSpanElement>(null);
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(`${prefixCls}__actions`, {
    [`${prefixCls}__actions--center`]: placement === 'center',
    [`${prefixCls}__actions--right-top`]: placement === 'rightTop',
  });
  const iconContainerCls = classnames(`${prefixCls}__actions-container`);
  const uploadIconCls = classnames(`${prefixCls}__actions-icon`, `${prefixCls}__actions-icon-upload`);
  const deleteIconCls = classnames(`${prefixCls}__actions-icon`, `${prefixCls}__actions-icon-delete`);

  const handleStopPropagation = (e: any) => {
    const targetNode = spanRef?.current?.childNodes[0];
    if (targetNode && !targetNode.contains(e.target) && file.status === STATUS_SUCCESS) {
      e.stopPropagation();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemove?.();
  };

  return (
    <span className={cls} onClick={handleStopPropagation} aria-hidden="true">
      <span className={iconContainerCls} ref={spanRef}>
        {useUpload && <UploadOutlined className={uploadIconCls} />}
        {useDelete && <DeleteOutlined className={deleteIconCls} onClick={handleRemove} />}
      </span>
    </span>
  );
};

export default Actions;
