import React, { useContext } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import Text from '../../text';
import { isOnlyAcceptImg } from './utils';
import { UploadPrefixClsContext } from './UploadContext';
import { IUploadProps, IUploadListProps, IUploadFile, STATUS_SUCCESS, STATUS_ERROR } from './interface';

const UploadList = (props: IUploadListProps<IUploadProps>) => {
  const { items, onRemove, accept } = props;
  const prefixCls = useContext(UploadPrefixClsContext);

  const name = isOnlyAcceptImg(accept) ? '图片' : '文件';

  const handleRemove = (file: IUploadFile) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onRemove(file);
  };

  return (
    <div className={`${prefixCls}-file-list`}>
      {items?.map((file) => (
        <div className={`${prefixCls}-file-list-item`} key={file.uid}>
          <Text width={250} className={`${prefixCls}-file-name`}>
            {file.name}
          </Text>
          {file.status === STATUS_SUCCESS && (
            <Text width={500} className={`${prefixCls}-file-success`}>
              {name}上传成功!
            </Text>
          )}
          {file.status === STATUS_ERROR && (
            <Text width={500} className={`${prefixCls}-file-error`}>
              {file.errorMessage}
            </Text>
          )}
          <DeleteOutlined size="12px" className={`${prefixCls}-file-delete`} onClick={() => handleRemove(file)} />
        </div>
      ))}
    </div>
  );
};

export default UploadList;
