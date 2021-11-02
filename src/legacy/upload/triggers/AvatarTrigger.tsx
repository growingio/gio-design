import React, { useContext } from 'react';
import classnames from 'classnames';
import { useLocale } from '@gio-design/utils';
import Loading from '../../../loading';
import Avatar from '../../avatar';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';
import { UploadPrefixClsContext } from '../Upload';
import Actions from '../Actions';
import defaultLocale from '../locales/zh-CN';

const AvatarTrigger: React.FC<ITriggerProps> = ({
  triggerProps,
  file,
  onRemove,
  children,
  placeholderImg = '',
}: ITriggerProps) => {
  const locale = useLocale('Upload');
  const { loadingTitle }: { loadingTitle: string } = {
    ...defaultLocale,
    ...locale,
  };
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__avatar`);

  return (
    <Loading loading={file.status === STATUS_UPLOADING} size="small" title={loadingTitle}>
      <span className={cls}>
        <Avatar src={file.dataUrl || placeholderImg} size="huge">
          {children as string}
        </Avatar>
        <Actions file={file} useUpload useDelete={file.status === STATUS_SUCCESS} onRemove={onRemove} />
      </span>
    </Loading>
  );
};

export default AvatarTrigger;
