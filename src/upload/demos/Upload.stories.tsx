import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './UploadPage';
import Upload from '../index';
import { IUploadProps, IProgress, IRcFile, IUploadFile } from '../interface';
import '../style';

const uploadUrl = 'https://examples.form.io/example';

const props = {
  // 上传开始前
  beforeUpload: (file: IRcFile, fileList: IRcFile[]) => {
    console.log('=== Before Upload ===');
    console.log('file: ', file);
    console.log('fileList: ', fileList);
    console.log('---  Before Upload ---');
    return true;
  },
  // 开始上传
  onStart: (file: IUploadFile) => {
    console.log('=== Start Upload ===');
    console.log('file: ', file);
    console.log('--- Start Upload ---');
  },
  // 上传过程中
  onProgress: (event: IProgress, file: IRcFile, fileList: IUploadFile[]) => {
    console.log('=== Upload Progress ===');
    console.log('event: ', event);
    console.log('file: ', file);
    console.log('fileList', fileList);
    console.log('--- Upload Progress ---');
  },
  // 上传成功
  onSuccess: (response: Record<string, unknown>, file: IUploadFile, fileList: IUploadFile[]) => {
    console.log('=== Upload Success ===');
    console.log('response: ', response);
    console.log('file: ', file);
    console.log('fileList', fileList);
    console.log('--- Upload Success ---');
  },
  // 上传出错
  onError: (error: Error, file: IUploadFile, fileList: IUploadFile[]) => {
    console.log('=== Upload Error ===');
    console.log('error: ', error);
    console.log('file: ', file);
    console.log('fileList', fileList);
    console.log('--- Upload Error ---');
  },
  // 删除已上传图片
  onRemove: (file: IUploadFile) => {
    console.log('=== Remove ===');
    console.log('file: ', file);
    console.log('--- Remove ---');
    return true;
  },
};

export default {
  title: 'Upgraded/Upload',
  component: Upload,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A43562',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<IUploadProps> = (args) => <Upload style={{ margin: '0 10px' }} {...args} />;
export const Default = Template.bind({});
Default.args = {
  type: 'button',
  action: uploadUrl,
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
};

export const UrlUpload = Template.bind({});
UrlUpload.args = {
  type: 'input',
  action: uploadUrl,
  inputUploadType: 'file',
};

export const CardUpload = Template.bind({});
CardUpload.args = {
  type: 'card',
  action: uploadUrl,
  successBorder: true,
};

export const AvatarUpload = Template.bind({});
AvatarUpload.args = {
  type: 'avatar',
  action: uploadUrl,
};

const AreaTemplate: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '10px 20px 0 10px' }} {...args} accept="image/*" />
    <Upload style={{ margin: '10px 20px 0 10px' }} {...args} />
  </div>
);
export const AreaUpload = AreaTemplate.bind({});
AreaUpload.args = {
  type: 'drag',
  action: uploadUrl,
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
};

export const ControlledFile = Template.bind({});
ControlledFile.args = {
  type: 'drag',
  file: {
    uid: '3',
    name: 'zzz.txt',
    status: 'success',
    dataUrl: 'https://www.xxx.com/zzz.txt',
  } as any,
};

const CustomErrorMessageTemplate: Story<IUploadProps> = (args) => {
  const [newFile, setFile] = React.useState<IUploadFile>();

  const onError = (error: Error, file: IUploadFile) => {
    const nextFile = file;
    nextFile.errorMessage = '上传出错啦!';
    setFile(nextFile);
  };

  return <Upload style={{ margin: '10px 20px 0 10px' }} onError={onError} file={newFile} {...args} />;
};
export const CustomErrorMessageUpload = CustomErrorMessageTemplate.bind({});
CustomErrorMessageUpload.args = {
  type: 'drag',
  action: uploadUrl,
};

export const DefaultListUpload = Template.bind({});
DefaultListUpload.args = {
  type: 'drag',
  action: uploadUrl,
  multiple: true,
  maxCount: 5,
  defaultFileList: [
    {
      uid: 'u-13432',
      name: 'xxx.pdf',
      status: 'success',
      url: 'https://www.xxx.com/xxx.png',
    },
    {
      uid: 'u-523468',
      name: 'yyy.docx',
      status: 'error',
      errorMessage: '404 Not Found',
      url: 'https://www.xxx.com/yyy.png',
    },
  ],
};

const ControlledFileListTemplate: Story<IUploadProps> = (args) => {
  const [files, setFileList] = useState([
    {
      uid: '-1',
      name: 'xxx.png',
      status: 'success',
      url: 'https://www.baidu.com/xxx.png',
    },
    {
      uid: '-11',
      name: 'yyy.png',
      status: 'success',
      url: 'https://www.baidu.com/yyy.png',
    },
  ]);

  const onChange = (file: IUploadFile, fileList: IUploadFile[]) => {
    let newList = [...fileList];
    newList = newList.slice(-2);
    setFileList(newList as any);
  };

  return (
    <div>
      <Upload style={{ margin: '10px 20px 0 10px' }} onChange={onChange} fileList={files as any} {...args} />
    </div>
  );
};
export const ControlledFileList = ControlledFileListTemplate.bind({});
ControlledFileList.args = {
  type: 'drag',
  action: uploadUrl,
  maxCount: 10,
  multiple: true,
};
