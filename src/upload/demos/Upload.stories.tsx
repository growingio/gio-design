import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Docs from './UploadPage';
import Upload from '../index';

import { IUploadProps, IRcFile, IUploadFile, IRcCustomRequestOptions, IProgress } from '../interface';
import '../style';
import { Toast } from '../..';

const uploadUrl = 'https://run.mocky.io/v3/8db0a35b-8cd5-4fc1-9797-b2cca4b27380'; // 'https://examples.form.io/example';

const errorAction = 'https://run.mocky.io/v3/26a35feb-f7df-4790-8344-e32db0ed0218';

export default {
  title: 'Upgraded/Upload',
  component: Upload,
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

const Template: Story<IUploadProps> = (args) => <Upload  {...args} />;
export const Default = Template.bind({});
Default.args = {
  action: uploadUrl,
};

export const InputUpload = Template.bind({});
InputUpload.args = {
  type: 'input',
  action: uploadUrl,
  inputUploadType: 'file',
};

export const AvatarUpload = Template.bind({});
AvatarUpload.args = {
  type: 'avatar',
  action: uploadUrl,
  successBorder: true,
};

export const CardUpload: Story<IUploadProps> = () => {

  const beforeUpload = (file: IRcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  return <div><Upload multiple={false} beforeUpload={beforeUpload} type='card' action={uploadUrl} accept="image/*" /></div>
}
/**
 * 拖拽上传
 * @returns 
 */
export const DraggerUpload: Story<IUploadProps> = () => <Upload multiple={false} type='drag' action={uploadUrl} accept="image/*" />
/**
 * 批量上传
 * @returns 
 */
export const BatchUpload: Story<IUploadProps> = () => <Upload maxCount={5} multiple type='drag' action={uploadUrl} />

/**
 * 文件夹上传
 * @returns 
 */
export const UploadDirectory: Story<IUploadProps> = () => <Upload directory multiple maxCount={5} type='drag' action={uploadUrl} />




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

export const CustomErrorMessage: Story<IUploadProps> = () => {
  const [newFile, setFile] = React.useState<IUploadFile>();

  const onError = (error: Error, file: IUploadFile) => {

    const nextFile = file;
    nextFile.errorMessage = '上传出错啦!';
    setFile(nextFile);
  };

  const handleChange = (file: IUploadFile) => {

    setFile(file as any);
  };
  return <Upload type='drag' onChange={handleChange} action={errorAction} onError={onError} file={newFile} />;
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

export const ControlledFileList: Story<IUploadProps> = (args) => {
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
      <Upload type='drag' accept='image/*' action={uploadUrl} maxCount={10} multiple onChange={onChange} fileList={files as any} {...args} />
    </div>
  );
};

class Oss {

  private options: any;

  constructor(opts: { region: string, accessKeyId: string, accessKeySecret: string, bucket: string, }) {
    this.options = opts;
  }

  // eslint-disable-next-line class-methods-use-this
  async multipartUpload(key: string, file: Blob, options: {
    progress?: (percent: number, checkpoint?: any, response?: any) => void
  }
  ) {
    const { progress } = options;
    const size = 1024 * 100;
    let start = 0;
    let end = 0;
    let data;
    while (start < file.size) {
      end += size;
      if (end > file.size) end = file.size;

      data = file.slice(start, end);
      start = end;
      // eslint-disable-next-line no-await-in-loop
      const r = await fetch(uploadUrl, {
        method: "POST",
        body: data,
      });
      // eslint-disable-next-line no-await-in-loop
      progress?.(end / file.size, null, await r.json());

      data = null;
    }
    return { status: 'success', code: 200, name: key, url: 'https://aliyun.cn/xxxx/xxxx' }

  }
}
export const AliyunOssUpload = () => {
  const onBeforeUpload = (file: IRcFile) => {
    const isVideo = ["video/mp4", "video/ogg", "video/webm"].indexOf(file.type) > -1;
    if (!isVideo) {
      Toast.error('不支持该视频文件格式');
      return false;
    }
    if (file.size > 500000000) {
      Toast.error('文件大小超过限制');
      return false;
    }
    return true;
  }

  const customRequest = (options: IRcCustomRequestOptions) => {
    const client = new Oss({
      region: 'oss-cn-beijing',
      accessKeyId: 'yourAccessKeyId',
      accessKeySecret: 'yourAccessKeySecret',
      bucket: 'examplebucket',
    });
    const { file, onError, onSuccess, onProgress } = options;
    const filename = `vedios/${file.name}`;
    client.multipartUpload(filename, options.file, {
      progress: (p: number) => {
        onProgress?.(
          {
            // eslint-disable-next-line no-bitwise
            percent: ~~(p * 100),

          } as IProgress,
          file
        );
      }
    }).then(res => {
      onSuccess?.(res, file)
    }).catch(err => {
      onError?.(err, { status: '500' });
    })
  }
  return <Upload type='button' accept='video/*' customRequest={customRequest} multiple={false} beforeUpload={onBeforeUpload} />
}

