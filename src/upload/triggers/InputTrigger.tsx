import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { LoadingTwoTone } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import Loading from '../../loading';
import Input from '../../input';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import Preview from '../Preview';
import { UploadPrefixClsContext } from '../Upload';
import defaultLocale from '../locales/zh-CN';

const InputTrigger: React.FC<ITriggerProps> = ({
  triggerProps,
  file,
  inputUploadType,
  onRemove,
  onInputUpload,
}: ITriggerProps) => {
  const [url, setUrl] = useState<string>('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const inputWrapperCls = classnames(`${prefixCls}__input`);
  const inputPreviewCls = classnames(`${prefixCls}__input-preview`);

  const locale = useLocale('Upload');

  const { placeholder }: { placeholder: string } = {
    ...defaultLocale,
    ...locale,
  };

  const hideInput = file.status === STATUS_SUCCESS || file.status === STATUS_UPLOADING;

  const handlePressEnter = () => onInputUpload(inputUploadType, url);

  const handlePreviewClick = () => onRemove();

  return (
    <span className={inputWrapperCls}>
      {hideInput ? (
        <Loading loading={file.status === STATUS_UPLOADING} indicator={<LoadingTwoTone rotating />} title={false}>
          <span className={inputPreviewCls} onClick={handlePreviewClick} aria-hidden="true">
            {file.status === STATUS_SUCCESS && <Preview file={file} />}
            <span>{file.name}</span>
          </span>
        </Loading>
      ) : (
        <Input
          placeholder={placeholder}
          {...triggerProps}
          onChange={(e) => setUrl(e.target.value)}
          onPressEnter={handlePressEnter}
          value={url}
        />
      )}
    </span>
  );
};

export default InputTrigger;
