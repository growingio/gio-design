import React, { useContext } from 'react';
import classnames from 'classnames';
import { DocumentFilled } from '@gio-design/icons';
import { useLocale } from '@gio-design/utils';
import Button from '../../button';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import Preview from '../Preview';
import { UploadPrefixClsContext } from '../Upload';
import defaultLocale from '../locales/zh-CN';

const ButtonTrigger: React.FC<ITriggerProps> = ({ file, triggerProps, disabled }: ITriggerProps) => {
  const prefixCls = useContext(UploadPrefixClsContext);
  const size = 'normal';
  const locale = useLocale('Upload');
  const { buttonLabel }: { buttonLabel: string } = {
    ...defaultLocale,
    ...locale,
  };
  const btnCls = classnames(`${prefixCls}__btn`, triggerProps?.className);
  const labelCls = classnames(`${prefixCls}__btn-label`);

  const uploading = file.status === STATUS_UPLOADING;
  let icon = null;
  switch (file.status) {
    case STATUS_UPLOADING:
      break;
    case STATUS_SUCCESS:
      icon = <Preview file={file} />;
      break;
    default:
      icon = <DocumentFilled />;
      break;
  }

  const btnProps = {
    ...triggerProps,
    className: btnCls,
  };

  const label = file.name || buttonLabel;
  return (
    <Button {...btnProps} size={size} prefix={icon} loading={uploading} type="secondary" disabled={disabled}>
      <span className={labelCls} title={label}>
        {label}
      </span>
    </Button>
  );
};

export default ButtonTrigger;
