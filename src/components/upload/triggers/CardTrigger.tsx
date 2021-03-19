import React, { useContext } from 'react';
import classnames from 'classnames';
import { PlusOutlined } from '@gio-design/icons';
import Loading from '../../loading';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import { UploadPrefixClsContext } from '../UploadContext';
import Preview from '../Preview';
import Actions from '../Actions';

const CardTrigger: React.FC<ITriggerProps> = ({ triggerProps, file, onRemove, placeholderImg }: ITriggerProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__card`);

  const cardPlaceholderStyle =
    file.status === STATUS_SUCCESS
      ? {}
      : {
          backgroundImage: `url(${placeholderImg})`,
          backgroundSize: 'contain',
        };

  return (
    <Loading loading={file.status === STATUS_UPLOADING} size="small" title="上传中">
      <span className={cls} style={cardPlaceholderStyle}>
        {file.status === STATUS_SUCCESS && (
          <>
            <Preview file={file} size={80} />
            <Actions file={file} onRemove={onRemove} useUpload />
          </>
        )}
        {file.status !== STATUS_SUCCESS && <PlusOutlined className={`${prefixCls}__plus-icon`} />}
      </span>
    </Loading>
  );
};

export default CardTrigger;
