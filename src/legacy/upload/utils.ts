import { defaultRootPrefixCls } from '../../components/config-provider';
import { IRcFile, IUploadFile, STATUS_NOT_YET, STATUS_SUCCESS } from './interface';

export const getUid = (): string => `${defaultRootPrefixCls}-upload-${Date.now()}`;

// 文件是否在fileList中
export function getFileItem(file: IUploadFile, fileList: IUploadFile[]) {
  const matchKey = 'uid';
  return fileList.filter((item) => item[matchKey] === file[matchKey])[0];
}

// 更新上传文件列表
export const updateFileList = (file: IUploadFile, fileList: IUploadFile[]) => {
  const currentFileList = [...fileList];
  const findIndex = fileList.findIndex((item) => item.uid === file.uid);
  if (findIndex === -1) {
    currentFileList.push(file);
  } else {
    currentFileList[findIndex] = file;
  }
  return currentFileList;
};

// 删除列表中的某个文件
export function removeFileItem(file: IUploadFile, fileList: IUploadFile[]) {
  if (!file) {
    return fileList;
  }
  return fileList.filter((item) => item.uid !== file.uid);
}

export const fileToObject = (file: IRcFile): IUploadFile => ({
  ...file,
  lastModified: file.lastModified,
  lastModifiedDate: file.lastModifiedDate,
  name: file.name,
  size: file.size,
  type: file.type,
  uid: file.uid,
  percent: 0,
  originFile: file,
});

export const getEmptyFileObj = (file?: IUploadFile): IUploadFile => ({
  uid: getUid(),
  size: file?.size as number,
  name: file?.name as string,
  type: file?.type ?? '$empty-file',
  status: file?.dataUrl && file?.status === STATUS_SUCCESS ? STATUS_SUCCESS : STATUS_NOT_YET,
  dataUrl: file?.dataUrl ?? '',
});

export const requestImage = (src: string, cors?: 'anonymous' | 'use-credentials'): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(err);
    };

    if (cors) {
      img.setAttribute('crossOrigin', cors);
    }
    img.src = src;
  });
/**
 *
 * @param {File | Blob} file 图片文件
 * @returns {Promise<string> } 返回值是图片的 base64 字符串
 */
export const imageFile2DataUrl = (file: File | Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const url = window.URL.createObjectURL(file);
    requestImage(url)
      .then((img) => {
        const { width, height } = img;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL();
        resolve(dataUrl);
      })
      .catch(reject);
  });

/**
 * 图片 base64 转为 File 格式
 */
export const dataUrl2ImageFile = (dataUrl = ''): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1] ?? '');
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], 'web-image', { type: mime });
};

/**
 *  网络 url 图片获取
 * @param {string} url
 */
export const fetchImageFileFromUrl = (
  url: string
): Promise<{
  originFile: IRcFile;
  dataUrl: string;
}> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    requestImage(url, 'anonymous')
      .then((img) => {
        const { width, height } = img;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        let dataUrl = '';
        try {
          dataUrl = canvas.toDataURL();
        } catch (error) {
          reject(error);
        }
        const file = dataUrl2ImageFile(dataUrl);
        (file as IRcFile).uid = getUid();
        resolve({
          originFile: file as IRcFile,
          dataUrl,
        });
      })
      .catch((err) => reject(err));
  });

export const isOnlyAcceptImg = (accept?: string): boolean =>
  accept
    ? accept
        .split(',')
        .map((_) => _.trim())
        .filter((_) => !/((image\/)|\.)(dwg|dxf|gif|jp2|jpeg|jpg|jpe|png|svf|tif|tiff)|image\/\*/.test(_)).length === 0
    : false;

export const isImageFile = (file: IUploadFile): boolean => file.type.startsWith('image/');

export const getHexValue = (e: any): string => {
  const view = new DataView(e.target.result);
  const first4Byte = view.getUint32(0, false);
  const hexValue = Number(first4Byte).toString(16).toUpperCase();
  return hexValue;
};
/**
 * 暂时没有用起来，文件头在处理 docx/xlsx 等微软文件时候的区分方法暂时没写
 * @param file
 */
export const getFileType = (file: File | Blob): Promise<string | undefined> =>
  new Promise((resolve) => {
    const fr = new FileReader();

    fr.onload = (e: any) => {
      switch (getHexValue(e)) {
        case 'FFD8FFE0':
        case 'FFD8FFE1':
        case 'FFD8FFE2':
        case 'FFD8FFE3':
          resolve('JPEG/JPG');
          break;
        default:
          resolve(undefined);
          break;
      }
    };

    fr.readAsArrayBuffer(file);
  });
