// import React, { useContext } from 'react';
// import classnames from 'classnames';
// import { useLocale, usePrefixCls } from '@gio-design/utils';
// import Loading from '../../loading';
// import Avatar from '../../avatar';
// import { ITriggerProps, UploadState } from '../interface';
// import { UploadPrefixClsContext } from '../Upload';
// import Actions from '../Actions';
// import defaultLocale from '../locales/zh-CN';

// const AvatarTrigger: React.FC<ITriggerProps> = ({
//   triggerProps,
//   file,
//   onRemove,
//   children,
//   prefixCls: customizePrefixCls,
//   placeholderImg = '',
// }: Avatar) => {
//   const { prefixCls: customPrefixCls, file, onRemove, disabled, iconRender, isImage } = props;
//   const prefixCls = usePrefixCls('upload', customPrefixCls);
//   const previewCls = `${prefixCls}-preview`;
//   const cls = classNames(previewCls, `${previewCls}-type-card`);
//   const actionCls = `${previewCls}-actions-btn`;
//   const locale = useLocale('Upload');
//   const mergedLocale: { [key: string]: string } = {
//     ...defaultLocale,
//     ...locale,
//   };

//   return (
//     <Loading loading={file.status === STATUS_UPLOADING} size="small" title={loadingTitle}>
//       <span className={cls}>
//         <Avatar src={file.dataUrl || placeholderImg} size="x-large">
//           {children as string}
//         </Avatar>
//         <Actions file={file} useUpload useDelete={file.status === STATUS_SUCCESS} onRemove={onRemove} />
//       </span>
//     </Loading>
//   );
// };

// export default AvatarTrigger;
