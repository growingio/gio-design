import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Docs from './Upload.mdx';
import Upload from './index';
import { IUploadProps, IProgress, IRcFile, IUploadFile } from './interface';
import AvatarPng from '../../assets/images/Avatar.png';
import './style';
import Button from '../button';

const uploadUrl = 'https://run.mocky.io/v3/424be679-93fe-4d9d-8036-c3d7adb9bd25';

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
  onProgress: (event: IProgress, file: IRcFile) => {
    console.log('=== Upload Progress ===');
    console.log('event: ', event);
    console.log('file: ', file);
    console.log('--- Upload Progress ---');
  },
  // 上传成功
  onSuccess: (response: Record<string, unknown>, file: IUploadFile) => {
    console.log('=== Upload Success ===');
    console.log('response: ', response);
    console.log('file: ', file);
    console.log('--- Upload Success ---');
  },
  // 上传出错
  onError: (error: Error, file: IUploadFile) => {
    console.log('=== Upload Error ===');
    console.log('error: ', error);
    console.log('file: ', file);
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
  title: 'Functional Components/Upload',
  component: Upload,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A6954',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const Template: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '0 10px' }} {...args} />
    <Upload style={{ margin: '0 10px' }} triggerProps={{ type: 'secondary' }} {...args} />
  </div>
);
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

const UrlTemplate: Story<IUploadProps> = (args) => (
  <div>
    <div style={{ padding: '10px 0' }}>
      返回图片 url：
      <Upload {...args} />
    </div>
    <div style={{ padding: '10px 0' }}>
      返回图片 file：
      <Upload inputUploadType="file" {...args} />
    </div>
  </div>
);
export const UrlUpload = UrlTemplate.bind({});
UrlUpload.args = {
  type: 'input',
  action: uploadUrl,
  inputUploadType: 'file',
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
};

const CardTemplate: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '0 10px' }} {...args} />
    <Upload style={{ margin: '0 10px' }} {...args} successBorder />
  </div>
);

const DisabledTemplate: Story<IUploadProps> = (args) => {
  const [disable, setDisable] = useState(true);
  const onClick = () => {
    setDisable(!disable);
  };
  return (
    <div>
      <Button onClick={onClick}>{disable ? 'Disabled' : 'Enable'}</Button>
      <Upload style={{ margin: '0 10px' }} {...args} successBorder disabled={disable} />
    </div>
  );
};

export const CardUpload = CardTemplate.bind({});
CardUpload.args = {
  type: 'card',
  action: uploadUrl,
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
};

export const DisableUpload = DisabledTemplate.bind({});
DisableUpload.args = { ...CardUpload.args, file: { dataUrl: AvatarPng, status: 'success' } };

const AvatarTemplate: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '0 10px' }} {...args}>
      GIO
    </Upload>
    <Upload style={{ margin: '0 10px' }} {...args}>
      GIO
    </Upload>
  </div>
);
export const AvatarUpload = AvatarTemplate.bind({});
AvatarUpload.args = {
  type: 'avatar',
  action: uploadUrl,
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
};

const AreaTemplate: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '10px 20px 0px 10px' }} {...args} accept="image/*" />
    <Upload style={{ margin: '10px 20px 0px 10px' }} {...args} />
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

const ControlledTemplate: Story<IUploadProps> = (args) => (
  <div>
    <Upload style={{ margin: '10px 20px 0px 10px' }} {...args} />
  </div>
);
export const DefaultListUpload = ControlledTemplate.bind({});
DefaultListUpload.args = {
  type: 'drag',
  action: uploadUrl,
  beforeUpload: props.beforeUpload,
  onStart: props.onStart,
  onProgress: props.onProgress,
  onSuccess: props.onSuccess,
  onError: props.onError,
  onRemove: props.onRemove,
  multiple: true,
  maxCount: 5,
  defaultFileList: [
    {
      uid: 'u-13432',
      name: 'xxx.pdf',
      status: 'success',
      url: 'http://www.baidu.com/xxx.png',
    },
    {
      uid: 'u-523468',
      name: 'yyy.docx',
      status: 'error',
      errorMessage: '404 Not Found',
      url: 'http://www.baidu.com/yyy.png',
    },
  ],
};
