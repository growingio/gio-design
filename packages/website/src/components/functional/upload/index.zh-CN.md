---
title: Upload 上传组件
nav:
  order: 2
  title: 组件
group:
  title: 功能组件
  order: 2
---

# 上传 - Upload

文件选择上传和拖拽上传控件。

## 代码演示

<code src='./demos/button.tsx' title='按钮上传' desc='默认 Button 形式的上传组件'/>

<code src='./demos/input.tsx' title='输入 url 回车上传' desc='输入 url 按回车上传。默认只会在 `onSuccess prop` 中返回带有 `dataUrl=url` 的对象。如果需要输入 url 回车后返回文件对象，那么组要设置`inputUploadType` 为 `file`'/>

<code src='./demos/card.tsx' title='小卡片图片' desc='方形小卡片图片类型上传组件'/>

<code src='./demos/avatar.tsx' title='头像上传' desc='头像类型上传组件'/>

<code src='./demos/drag.tsx' title='点击或拖拽上传' desc='点击或拖拽上传'/>

## 参数说明

**当使用 `inputUploadType={file}` 时，务必确保图片来源服务器已打开 CORS 允许，否则将加载失败。如这张 [MDN logo](https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189)**

| 参数                  | 说明                                             | 类型                                                                                                     | 默认值                             |
| --------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| type                  | upload 组件展现类型                              | `button` \| `input` \| `card` \| `avatar` \| `drag`                                                      | `button`                           |
| inputUploadType       | input 类型时希望使用 file 还是直接使用 url       | `file` \| `url`                                                                                          | `url`                              |
| triggerProps          | type 不同时传入 trigger 的 props                 | object                                                                                                   | -                                  |
| style                 | 自定义根节点样式                                 | React.CSSProperties                                                                                      | -                                  |
| prefixCls             | 替代 Upload 组件 class 的 gio-upload 前缀        | string                                                                                                   | -                                  |
| className             | 自定义 className                                 | string                                                                                                   | -                                  |
| disabled              | 禁用                                             | boolean                                                                                                  | false                              |
| name                  | 上传服务器的文件 name                            | string                                                                                                   | -                                  |
| action                | 文件上传地址                                     | string \| `((file: IRcFile) => string)` \| `Promise<string>`                                             | -                                  |
| method                | 请求发起方法                                     | POST \| PUT \| PATCH                                                                                     | POST                               |
| directory             | 是否允许上传文件夹                               | boolean                                                                                                  | false                              |
| data                  | 上传所需额外参数或返回上传额外参数的方法         | object \| `((file: IUploadFile<T>) => object)`                                                           | -                                  |
| headers               | 额外的上传请求头部                               | object                                                                                                   | -                                  |
| accept                | 接受上传的文件类型                               | string                                                                                                   | -                                  |
| beforeUpload          | 上传开始前调用函数                               | `(file: IRcFile, fileList: IRcFile[]) => boolean` \| `Promise<void>`                                     | -                                  |
| onStart               | 开始上传时调用函数                               | `(file: IUploadFile) => void`                                                                            | -                                  |
| onProgress            | 上传过程中调用函数                               | `(event: IProgress, file: IRcFile) => void`                                                              | -                                  |
| onSuccess             | 上传成功调用函数                                 | `(response: object, file: IUploadFile) => void`                                                          | -                                  |
| onError               | 上传失败调用函数                                 | `(error: Error, file: IUploadFile) => void`                                                              | -                                  |
| onRemove              | 删除已上传图片时调用函数。返回 `false`将阻止删除 | `((file: IUploadFile) => void) \| ((file: IUploadFile) => boolean) \| Promise<void> \| Promise<boolean>` | -                                  |
| customRequest         | 自定义上传方法，将覆盖默认的 xhr 上传            | `(options: IRcCustomRequestOptions) => void`                                                             | -                                  |
| withCredentials       | 是否带上 cookie                                  | boolean                                                                                                  | false                              |
| openFileDialogOnClick | 点击 trigger 是否打开选择上传文件的对话框        | boolean                                                                                                  | true （type=input 时默认为 false） |
| transformFile         | 在上传之前自行进行转换文件                       | `(file: IRcFile) => string \| Blob \| File \| Promise<string \| Blob \| File>`                           | -                                  |
