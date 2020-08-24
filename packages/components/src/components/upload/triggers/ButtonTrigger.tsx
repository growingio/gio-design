import React, { useContext } from 'react';
import classnames from 'classnames';
import { Upload } from '@gio-design/icons';
import Button from '../../button';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import Preview from '../Preview';
import { UploadPrefixClsContext } from '../UploadContext';

const ButtonTrigger: React.FC<ITriggerProps> = ({ file, triggerProps }) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const btnCls = classnames(`${prefixCls}__btn`, triggerProps?.className);
  const labelCls = classnames(`${prefixCls}__btn-label`);

  const uploading = file?.status === STATUS_UPLOADING;
  let icon = null;
  switch (file?.status) {
    case STATUS_UPLOADING:
      icon = null;
      break;
    case STATUS_SUCCESS:
      icon = <Preview file={file} />;
      break;
    default:
      icon = <Upload />;
      break;
  }

  const btnProps = {
    ...triggerProps,
    className: btnCls,
  };

  const label = file?.name ?? '本地上传';
  return (
    <Button {...btnProps} size="large" icon={icon} loading={uploading}>
      <span className={labelCls} title={label}>
        {label}
      </span>
    </Button>
  );
};

export default ButtonTrigger;
