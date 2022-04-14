import React, { useContext } from 'react';
import { DeleteOutlined } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import Text from '../typography/Text';
import { isOnlyAcceptImg } from './utils';
import { UploadPrefixClsContext } from './Upload';
import { IUploadProps, IUploadListProps, IUploadFile, STATUS_SUCCESS, STATUS_ERROR } from './interface';
import defaultLocale from './locales/zh-CN';

const UploadList = (props: IUploadListProps<IUploadProps>) => {
  const { items, onRemove, accept } = props;
  const prefixCls = useContext(UploadPrefixClsContext);

  const locale = useLocale('Upload');
  const { picture, folder, uploadSuccess }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };

  const name = isOnlyAcceptImg(accept) ? picture : folder;

  const handleRemove = (file: IUploadFile) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onRemove(file);
  };

  return (
    <div className={`${prefixCls}-file-list`}>
      {items?.map((file) => (
        <div className={`${prefixCls}-file-list-item`} key={file.uid}>
          <Text className={`${prefixCls}-file-name`}>{file.name}</Text>
          {file.status === STATUS_SUCCESS && (
            <Text className={`${prefixCls}-file-success`}>{`${name}${uploadSuccess}!`}</Text>
          )}
          {file.status === STATUS_ERROR && (
            <Text className={`${prefixCls}-file-error`} style={{ width: '100px' }}>
              {file.errorMessage as string}
            </Text>
          )}
          <DeleteOutlined size="12px" className={`${prefixCls}-file-delete`} onClick={() => handleRemove(file)} />
        </div>
      ))}
    </div>
  );
};

export default UploadList;
