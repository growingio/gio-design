import { IProgress, IRcFile, IUploadFile } from '@gio-design/components/es/components/upload';

export const action = 'https://run.mocky.io/v3/424be679-93fe-4d9d-8036-c3d7adb9bd25';

export const props = {
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
  onSuccess: (response: object, file: IUploadFile) => {
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
    window.confirm('确定要删除？');
    return true;
  },
};
