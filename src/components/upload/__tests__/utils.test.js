/**
 * @jest-environment jsdom
 * ReferenceError: globalThis is not defined // 升级node版本 // https://github.com/jsdom/jsdom/issues/2795
 */
import { JSDOM } from 'jsdom';
import * as module from '../utils';
import { dataUrl, testFile, url, base64DecToArr } from '../tests/mock';

describe('Testing Upload utils', () => {
  test('requestImage function', (done) => {
    expect.assertions(2);
    const img = new Image();
    img.src = dataUrl;
    global.OldImage = Image;
    global.Image = class extends Image {
      constructor() {
        super();
        setTimeout(() => {
          this.onload(); // simulate success
          this.onerror(); // simulate error
        }, 100);
      }
    };
    module.requestImage(url, 'anonymous').then((data) => {
      expect(data).toMatchObject(img);
      expect(data.getAttribute('crossOrigin')).toBe('anonymous');
      global.Image = global.OldImage;
      delete global.OldImage;
      done();
    });
  });

  test('imageFile2DataUrl function', (done) => {
    const { document } = new JSDOM('<!doctype html><html><body></body></html>', { resources: 'usable' }).window;
    global.document = document;
    global.window = document.defaultView;
    const getUrl = () => url;
    if (typeof window.URL.createObjectURL === 'undefined') {
      Object.defineProperty(window.URL, 'createObjectURL', { value: getUrl });
    }
    /**
     * overwrite canvas's getContext
     */
    const createElement = document.createElement.bind(document);
    global.document.createElement = (tagName) => {
      if (tagName === 'canvas') {
        return {
          ...createElement('canvas'),
          toDataURL: () => '',
          getContext: (str) => {},
        };
      }
      return createElement(tagName);
    };
    const img = new Image();
    const mock = jest.spyOn(module, 'requestImage');
    mock.mockResolvedValue(img);
    module.imageFile2DataUrl(testFile).then((data) => {
      expect(typeof data).toEqual('string');
      mock.mockRestore();
      done();
    });
  });

  test('dataUrl2ImageFile function', () => {
    const ret = module.dataUrl2ImageFile(dataUrl);
    expect(ret).toEqual(testFile);
  });
  test('fetchImageFileFromUrl function', (done) => {
    const img = new Image();
    img.src = url;
    const mock = jest.spyOn(module, 'requestImage');
    mock.mockResolvedValue(img);
    module.fetchImageFileFromUrl(url).then((data) => {
      expect(Object.keys(data)).toEqual(['originFile', 'dataUrl']);
      mock.mockRestore();
      done();
    });
  });
  test('fetchImageFileFromUrl function in throw error case', (done) => {
    const mock = jest.spyOn(module, 'requestImage');
    mock.mockRejectedValue({ message: 'error' });
    module.fetchImageFileFromUrl(url).catch((data) => {
      expect(data).toEqual({ message: 'error' });
      mock.mockRestore();
      done();
    });
  });
  test('fetchImageFileFormUrl function in try catch', (done) => {
    const oldCreateElement = document.createElement.bind(document);
    global.document.createElement = (tagName) => {
      if (tagName === 'canvas') {
        return {
          ...oldCreateElement('canvas'),
          toDataURL: jest.fn().mockImplementation(() => {
            throw Error('error');
          }),
          getContext: () => {},
        };
      }
      return oldCreateElement(tagName);
    };
    const img = new Image();
    img.src = url;
    const requestImage = jest.spyOn(module, 'requestImage').mockResolvedValue(img);
    module.fetchImageFileFromUrl(url).catch((error) => {
      expect(error.message).toEqual('error');
      requestImage.mockRestore();
      done();
    });
  });
  test('isOnlyAcceptImg function', () => {
    expect(module.isOnlyAcceptImg('image/*')).toBe(true);
    expect(module.isOnlyAcceptImg()).toBe(false);
  });

  test('getFileType function', (done) => {
    const event = {
      target: {
        result: [testFile],
      },
    };

    global.OldFileReader = global.FileReader;

    global.FileReader = class extends FileReader {
      constructor() {
        super();
        setTimeout(() => {
          this.onload(event);
        }, 100);
      }
    };
    FileReader.prototype.readAsArrayBuffer = jest.fn();
    const mock = jest.spyOn(module, 'getHexValue');
    mock.mockReturnValue('FFD8FFE0');
    module.getFileType(testFile).then((data) => {
      expect(data).toBe('JPEG/JPG');
      mock.mockRestore();
      global.FileReader = global.OldFileReader;
      delete global.OldFileReader;
      done();
    });
  });
  test('getFileType function in undefined case', (done) => {
    const event = {
      target: {
        result: [testFile],
      },
    };

    global.OldFileReader = global.FileReader;

    global.FileReader = class extends FileReader {
      constructor() {
        super();
        setTimeout(() => {
          this.onload(event);
        }, 100);
      }
    };
    FileReader.prototype.readAsArrayBuffer = jest.fn();
    const mock = jest.spyOn(module, 'getHexValue');
    mock.mockReturnValue('FFD8FFE4');
    module.getFileType(testFile).then((data) => {
      expect(data).toBe(undefined);
      mock.mockRestore();
      global.FileReader = global.OldFileReader;
      delete global.OldFileReader;
      done();
    });
  });

  test('should be renter value is `true`', () => {
    const isImageFile = module.isImageFile(testFile);
    expect(isImageFile).toBe(true);
  });

  test('getHexValue function should be renter the right result ', () => {
    const arrayBuffer = base64DecToArr(dataUrl).buffer;
    const event = {
      target: {
        result: arrayBuffer,
      },
    };
    const hexValue = module.getHexValue(event);
    expect(hexValue).toEqual('75AB5A8A');
  });

  test('fileToObject function should be return thr right result', () => {
    const object = module.fileToObject(testFile);
    expect(object instanceof File).toEqual(false);
    expect(object.percent).toEqual(0);
  });

  test('getEmptyFileObj function should be return thr right result', () => {
    const object = module.getEmptyFileObj(testFile);
    expect(object).toHaveProperty('status');
    expect(object).toHaveProperty('dataUrl');
  });
});
