import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { LoadingOutlined } from '@gio-design/icons';
import Loading from '../../loading';
import Input from '../../input';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import Preview from '../Preview';
import { UploadPrefixClsContext } from '../UploadContext';

const InputTrigger: React.FC<ITriggerProps> = ({
  triggerProps, file, inputUploadType, onRemove, onInputUpload,
}) => {
  const [url, setUrl] = useState<string>('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const inputWrapperCls = classnames(`${prefixCls}__input`);
  const inputPreviewCls = classnames(`${prefixCls}__input-preview`);

  const hideInput = file?.status === STATUS_SUCCESS || file?.status === STATUS_UPLOADING;

  const handlePressEnter = () => onInputUpload(inputUploadType, url);

  const handlePreviewClick = () => onRemove();

  /* eslint-disable */
  return (
    <span className={inputWrapperCls}>
      {hideInput ? (
        <Loading loading={file?.status === STATUS_UPLOADING} indicator={<LoadingOutlined rotating />} title={false}>
          <span className={inputPreviewCls} onClick={handlePreviewClick}>
            {file?.status === STATUS_SUCCESS && <Preview file={file} />}
            <span>{file?.name ?? 'Web Image'}</span>
          </span>
        </Loading>
      ) : (
        <Input
          placeholder="请输入图片的 URL"
          {...triggerProps}
          onChange={setUrl}
          onPressEnter={handlePressEnter}
          value={url}
        />
      )}
    </span>
  );
};

export default InputTrigger;
