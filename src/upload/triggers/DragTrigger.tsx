// import React, { useState, useContext } from 'react';
// import classNames from 'classnames';
// import { useLocale, usePrefixCls } from '@gio-design/utils';
// import { template } from 'lodash';
// import { ITriggerProps, UploadFile } from '../interface';
// import Preview, { PreviewForNotImage } from '../Preview';
// import Actions from '../Actions';
// import { isOnlyAcceptImg, isImageFile } from '../utils';
// import { FolderSVG, PictureSVG, DisabledFolderSVG, DisabledPictureSVG } from '../svg';
// import Progress from '../../progress';
// import defaultLocale from '../locales/zh-CN';

// interface IconProps {
//   className?: string;
// }
// const DisabledPictureIcon = ({ className }: IconProps) => (
//   <span role="img" className={className}>
//     <DisabledPictureSVG style={{ width: '1em', height: '1em' }} />
//   </span>
// );
// const DisabledFolderIcon = ({ className }: IconProps) => (
//   <span role="img" className={className}>
//     <DisabledFolderSVG style={{ width: '1em', height: '1em' }} />
//   </span>
// );
// interface DragTriggerProps {
//   prefixCls?: string;
//   fileList?: UploadFile[];
//   onRemove?: (file: UploadFile) => void;
//   disabled?: boolean;
//   iconRender: (file: UploadFile) => React.ReactNode;
//   isImage?: (file: UploadFile) => boolean;
//   accept?: string;
//   maxCount?: number;
// }
// const DragTrigger: React.FC<DragTriggerProps> = (props: DragTriggerProps) => {
//   const {
//     prefixCls: customPrefixCls,
//     fileList,
//     onRemove,
//     disabled,
//     iconRender,
//     isImage,
//     children,
//     accept,
//     maxCount,
//   } = props;
//   const prefixCls = usePrefixCls('upload', customPrefixCls);
//   const previewCls = `${prefixCls}-preview`;
//   const cls = classNames(previewCls, `${previewCls}-type-card`);
//   const actionCls = `${previewCls}-actions-btn`;
//   const locale = useLocale('Upload');
//   const mergedLocale: { [key: string]: string } = {
//     ...defaultLocale,
//     ...locale,
//   };
//   const spanRef = useRef<HTMLSpanElement>(null);
//   const handleStopPropagation = (e: any) => {
//     const targetNode = spanRef?.current?.childNodes[0];
//     if (targetNode && !targetNode.contains(e.target)) {
//       e.stopPropagation();
//     }
//   };
//   const handleRemove = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     onRemove(file);
//   };
//   const {
//     disabledPic,
//     disabledFile,
//     dragPic,
//     dragFile,
//     uploading,
//     picPending,
//     filePending,
//   }: { [key: string]: string } = {
//     ...defaultLocale,
//     ...locale,
//   };
//   const iconCls = `${prefixCls}-file__type-icon`;
//   const renderDisabledPlaceholder = () =>
//     isOnlyAcceptImg(accept) ? (
//       <>
//         <DisabledPictureIcon className={iconCls} />
//         <div>{template(disabledPic, { interpolate: /{([\s\S]+?)}/g })({ count: fileList?.length })}</div>
//       </>
//     ) : (
//       <>
//         <DisabledFolderIcon className={iconCls} />
//         <div>{template(disabledFile, { interpolate: /{([\s\S]+?)}/g })({ count: fileList?.length })}</div>
//       </>
//     );
//   const dom = (
//     <div>
//       <p className="gio-upload-icon">
//         <UploadOutlined />
//       </p>
//       <p className="gio-upload-text">点击上传或拖拽图片到此区域</p>
//       <p className="gio-upload-hint">支持图片类型jpeg,png。图片大小不超过2M。</p>
//     </div>
//   );
//   const renderPlaceholder = () =>
//     isOnlyAcceptImg(accept) ? (
//       <>
//         <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
//         <div>{template(dragPic, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount, maxCount })}</div>
//       </>
//     ) : (
//       <>
//         <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
//         <div>{template(dragFile, { interpolate: /{([\s\S]+?)}/g })({ count: finishCount, maxCount })}</div>
//       </>
//     );

//   // 单个文件上传渲染
//   const renderSingleUpload = () => (
//     <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
//       {'percent' in file && file.status === STATUS_UPLOADING ? (
//         <div className={`${prefixCls}__drag-container`}>
//           <Progress
//             percent={file.percent}
//             status="active"
//             className={progressCls}
//             format={() => <span style={{ color: '#313E75' }}>{Math.round((file.percent || 0) * 100) / 100}%</span>}
//           />
//           <span className="loading-text">{uploading}</span>
//         </div>
//       ) : null}
//       {file.status === STATUS_SUCCESS && (
//         <>
//           {isImageFile(file) || isOnlyAcceptImg(accept) ? (
//             <>
//               <Preview file={file} size="100%" />{' '}
//               <Actions file={file} useUpload onRemove={onRemove} placement="rightTop" />
//             </>
//           ) : (
//             <>
//               <PreviewForNotImage onRemove={onRemove} onReSelect={onReSelect} file={file} />
//               <Actions file={file} onRemove={onRemove} showModal={false} />
//             </>
//           )}
//         </>
//       )}
//       {file.status === STATUS_ERROR && (
//         <>
//           {isOnlyAcceptImg(accept) ? (
//             <div className={placeholderCls}>
//               <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
//               <div>{picPending}</div>
//             </div>
//           ) : (
//             <>
//               <PreviewForNotImage onReSelect={onReSelect} file={file} onRemove={onRemove} />
//               <Actions file={file} onRemove={onRemove} showModal={false} />
//             </>
//           )}
//         </>
//       )}
//       {file.status === STATUS_NOT_YET &&
//         (disabled ? (
//           <div className={placeholderCls}>
//             {isOnlyAcceptImg(accept) ? (
//               <>
//                 <DisabledPictureSVG style={{ width: currentWidth, height: currentHeight }} />
//                 <div>{picPending}</div>
//               </>
//             ) : (
//               <>
//                 <DisabledFolderSVG style={{ width: currentWidth, height: currentHeight }} />
//                 <div>{filePending}</div>
//               </>
//             )}
//           </div>
//         ) : (
//           <div className={placeholderCls}>
//             {isOnlyAcceptImg(accept) ? (
//               <>
//                 <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
//                 <div>{picPending}</div>
//               </>
//             ) : (
//               <>
//                 <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
//                 <div>{filePending}</div>
//               </>
//             )}
//           </div>
//         ))}
//     </div>
//   );

//   // 批量上传渲染
//   const renderMultipleUpload = () => {
//     const currentProgress = (finishCount / fileListLength) * 100;
//     const multiplePercent = fileListLength > 1 ? currentProgress : file.percent;
//     return (
//       <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
//         {finishCount < fileListLength ? (
//           <div className={`${prefixCls}__drag-container`}>
//             <Progress
//               percent={multiplePercent}
//               status="active"
//               className={progressCls}
//               format={() => <span style={{ color: '#313E75' }}>{Math.round((multiplePercent || 0) * 100) / 100}%</span>}
//             />
//             <span className="loading-text">{uploading}</span>
//           </div>
//         ) : null}
//         {fileListLength !== 0 &&
//           finishCount === fileListLength &&
//           (disabled ? (
//             <div className={placeholderCls}>{renderDisabledPlaceholder()}</div>
//           ) : (
//             <div className={placeholderCls}>{renderPlaceholder()}</div>
//           ))}
//         {fileListLength === 0 && file.status === STATUS_NOT_YET && (
//           <div className={placeholderCls}>
//             {isOnlyAcceptImg(accept) ? (
//               <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
//             ) : (
//               <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
//             )}
//             <div>{filePending}</div>
//           </div>
//         )}
//       </div>
//     );
//   };
//   const renderUpload = () => (directory || multiple ? renderMultipleUpload() : renderSingleUpload());
//   return <>{renderUpload()}</>;
// };

// export default DragTrigger;
