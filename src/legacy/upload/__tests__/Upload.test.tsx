import React from 'react';
import { set } from 'lodash';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { fakeXhr } from 'nise';
import { DesignContext, DefaultContextProps } from '@gio-design/utils';
import { AreaUpload, ControlledFileList, DefaultListUpload } from '../demos/Upload.stories';
import { testFile, dataUrl, url as imgUrl } from './mock';
import * as utils from '../utils';
import enUS from '../../../locales/en-US';
import { sleep } from '../../../utils/test';
import Upload from '..';
import UploadList from '../UploadList';
import DragTrigger from '../triggers/DragTrigger';
import { STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';

let mockXhr: any = null;
let currentRequest: any = null;
const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

const mockFileList = [
  new File(['one'], 'one.png', { type: 'image/png' }),
  new File(['two'], 'two.jpg', { type: 'image/jpg' }),
  new File(['three'], 'three.png', { type: 'image/png' }),
];

const uploadedSuccess = 'uploaded success';
const uploadSuccess = 'upload success';
const deleteIcon = '#delete-outlined_svg__delete';

beforeEach(() => {
  mockXhr = fakeXhr.useFakeXMLHttpRequest();
  // eslint-disable-next-line no-return-assign
  mockXhr.onCreate = (request: any) => (currentRequest = request);
  jest.spyOn(utils, 'fetchImageFileFromUrl').mockResolvedValue({ originFile: testFile as any, dataUrl });
  jest.spyOn(utils, 'imageFile2DataUrl').mockResolvedValue(dataUrl);
});

afterEach(() => {
  mockXhr = null;
  currentRequest = null;
  jest.spyOn(utils, 'fetchImageFileFromUrl').mockRestore();
  jest.spyOn(utils, 'imageFile2DataUrl').mockRestore();
});

describe('Testing drag-trigger', () => {
  // Mock for rc-util raf
  window.requestAnimationFrame = ((callback: any) => {
    window.setTimeout(callback, 16);
  }) as any;
  window.cancelAnimationFrame = (id) => {
    window.clearTimeout(id);
  };

  it('basic drag-tigger', () => {
    render(<AreaUpload {...AreaUpload.args} />);
    expect(screen.getAllByText('点击上传或拖拽文件到此区域')).toHaveLength(1);
  });

  it('drag-trigger width single size', () => {
    const { container } = render(<AreaUpload {...set(AreaUpload.args, 'iconSize', 40)} />);
    expect(container.getElementsByClassName('gio-icon')).toHaveLength(0);
  });

  it('drag-trigger with array size', () => {
    set(AreaUpload.args, 'triggerProps', { className: 'gio-upload-drag-test' });
    render(<AreaUpload {...set(AreaUpload.args, 'iconSize', [80, 80])} />);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('file multiple upload', async (done) => {
    const { container } = render(<AreaUpload {...set(AreaUpload.args, 'directory', true)} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[1], { target: { files: mockFileList } });
    });
    act(() => {
      fireEvent.click(screen.getAllByRole('img')[1]);
    });
    await waitFor(() => expect(screen.queryByText('超过将无法上传', { exact: false })).toBeNull());
    done();
  });

  it('picture multiple upload', async (done) => {
    const { container } = render(<AreaUpload {...set(AreaUpload.args, 'directory', true)} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });
    act(() => {
      fireEvent.click(screen.getAllByRole('img')[1]);
    });
    await waitFor(() => expect(screen.queryByText('超过将无法上传', { exact: false })).toBeNull());
    done();
  });

  it('should render file upload list', async (done) => {
    const props = {
      type: 'drag',
      action: 'api',
      multiple: true,
      maxCount: 2,
    } as any;
    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });
    await waitFor(() => {
      expect(screen.getByText('one.png')).toBeTruthy();
    });
    act(() => {
      fireEvent.mouseEnter(container.getElementsByClassName('gio-upload-file-list-item')[0]);
      fireEvent.click(screen.getAllByLabelText('delete-outlined')[0]);
    });

    await waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('should render picture upload list', async (done) => {
    const { container } = render(<Upload type="drag" accept="image/*" action="api" multiple maxCount={2} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });
    await waitFor(() => {
      expect(screen.queryByText('one.png')).not.toBeNull();
    });

    act(() => {
      fireEvent.mouseEnter(container.getElementsByClassName('gio-upload-file-list-item')[0]);
      fireEvent.click(screen.getAllByLabelText('delete-outlined')[0]);
    });
    await waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('not show uploadList', async (done) => {
    const props = {
      multiple: true,
      maxCount: 5,
      showUploadList: false,
    };
    const { container } = render(<Upload type="drag" action="api" {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });
    await waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('render upload list with items === undefined', () => {
    render(<UploadList items={undefined} onRemove={() => null} />);
    expect(screen.queryByText('文件', { exact: false })).toBeNull();
  });

  it('just render dragTrigger with the test', () => {
    const props = {
      file: {
        status: 'none',
      },
      directory: true,
      items: undefined,
      triggerProps: { className: 'gio-upload-test' },
    } as any;
    render(<DragTrigger {...props} />);
  });

  it('prevent the multiple upload', async (done) => {
    const props = {
      multiple: true,
      maxCount: 10,
      type: 'drag',
      action: 'api',
      beforeUpload: () => false,
    } as any;
    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
      done();
    });
  });
});

describe('Testing Upload props', () => {
  it('props disabled', async () => {
    const { rerender, container } = render(<Upload />);
    act(() => {
      rerender(<Upload disabled />);
    });
    await waitFor(() => {
      expect(container.getElementsByClassName('gio-upload-disabled')).toHaveLength(1);
    });
  });

  it('should be render default image', () => {
    const props = {
      type: 'avatar',
    } as any;
    const { container } = render(<Upload {...props} />);
    expect(container.getElementsByClassName('gio-upload__avatar')).toHaveLength(1);
  });

  it('should be render successBorder', () => {
    const props = {
      placeholderImg: dataUrl,
      type: 'avatar',
      successBorder: true,
      openFileDialogOnClick: false,
    } as any;
    const { container } = render(<Upload {...props} />);
    expect(container.getElementsByClassName('gio-upload__avatar')).toHaveLength(1);
  });
});

describe('Testing Upload actions', () => {
  test('should call onStart function', (done) => {
    expect.assertions(1);
    const props = {
      action: 'api',
      onStart: (file: any) => {
        expect(file.status).toEqual(STATUS_UPLOADING);
        done();
      },
    };
    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [{ file: mockFile }] } });
    });
  });

  test('should call beforeUpload function', async (done) => {
    expect.assertions(2);

    const props = {
      action: 'api',
      beforeUpload: () =>
        new Promise((resolve) =>
          setTimeout(() => {
            const newMockFile = new File(['new file context'], 'new_file_name.png', { type: 'image/png' });
            resolve(newMockFile);
          })
        ),
      onSuccess: (response: any, file: any) => {
        expect(response).toEqual(uploadedSuccess);
        expect(file.name).toEqual('new_file_name.png');
        done();
      },
    } as any;

    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [{ file: mockFile }] } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadedSuccess);
  });

  test('should call handleProgress function', async (done) => {
    expect.assertions(1);

    const { container } = render(
      <Upload
        action="api"
        onProgress={(progressEvent: any) => {
          expect(progressEvent.type).toEqual('progress');
          done();
        }}
      />
    );
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [{ file: mockFile }] } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadedSuccess);
  });

  test('should call onSuccess function', async (done) => {
    expect.assertions(1);

    const props = {
      type: 'drag',
      action: 'api',
      directory: true,
      onSuccess: (response: any) => {
        expect(response).toEqual(uploadedSuccess);
        done();
      },
    } as any;

    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadedSuccess);
  });

  test('should call onSuccess function width multiple picture', async (done) => {
    const props = {
      action: 'api',
      type: 'drag',
      multiple: true,
      accept: 'image/*',
      onSuccess: (res: any) => {
        expect(res).toBe('uploaded successful');
        done();
      },
    } as any;
    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });

    await sleep(100);
    currentRequest.respond(200, {}, 'uploaded successful');
  });

  test('should happen HTTP Error', async (done) => {
    expect.assertions(1);

    const props = {
      action: 'api',
      type: 'drag',
      accept: 'image/*',
      onError: (event: any) => {
        expect(event.type).toEqual('error');
        done();
      },
    } as any;

    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [mockFile] } });
    });

    await sleep(50);
    currentRequest.error();
  });

  test('should happen HTTP Error with drag', async () => {
    const props = {
      action: 'api',
      type: 'drag',
      multiple: true,
      errorMessage: '上传失败了！',
    } as any;

    const { container } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });

    await sleep(50);
    currentRequest.error();
  });

  test('render errorMessage', async () => {
    const { container } = render(<Upload action="api" type="drag" />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [mockFile] } });
    });

    await sleep(50);
    currentRequest.error();
  });

  test('happen error width drag image', async () => {
    const { container } = render(<Upload action="api" type="drag" accept="image/*" multiple />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    });

    await sleep(50);
    currentRequest.error();
  });
});

describe('test input upload', () => {
  test('test inputUploadType is an url', () => {
    const props = {
      action: 'api',
      type: 'input',
      inputUploadType: 'url',
    } as any;

    render(<Upload {...props} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });
  });

  test('test inputUploadType is a file', async (done) => {
    expect.assertions(2);

    const props = {
      action: 'api',
      type: 'input',
      inputUploadType: 'file',
      data: 'data',
      name: 'input-upload',
      headers: 'post',
      withCredentials: true,
      onSuccess: (response: any, file: any) => {
        expect(response).toEqual(uploadSuccess);
        expect(file.status).toEqual(STATUS_SUCCESS);
        done();
      },
    } as any;

    render(<Upload {...props} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadSuccess);
  });

  test('test inputUploadType is a file ---- when data and action is a function', async (done) => {
    const props = {
      onSuccess: () => {
        done();
      },
    } as any;

    render(
      <Upload action={() => 'api'} type="input" inputUploadType="file" data={() => ({ data: 'data' })} {...props} />
    );
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadSuccess);
  });

  test('test inputUploadType is a file ---- should happen onError function', async (done) => {
    expect.assertions(1);

    const props = {
      action: 'api',
      type: 'input',
      inputUploadType: 'file',
      onError: (event: any) => {
        expect(event.type).toEqual('error');
        done();
      },
    } as any;

    render(<Upload {...props} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });

    await sleep(50);
    currentRequest.error();
  });

  test('happen error without onError', async () => {
    render(
      <Upload
        data={() => {
          throw new Error('error');
        }}
        type="input"
        inputUploadType="file"
      />
    );
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });
  });

  test('test inputUploadType is a file ---- should happen catch', async (done) => {
    const props = {
      data: () => {
        throw new Error('error');
      },
      type: 'input',
      inputUploadType: 'file',
      onError: () => {
        done();
      },
    } as any;

    render(<Upload {...props} />);

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });
  });

  test('test inputUploadType is a file ---- should happen catch', async (done) => {
    const props = {
      action: 'api',
      type: 'input',
      inputUploadType: 'file',
      onSuccess: () => {
        imageFile2DataUrl.mockRestore();
        done();
      },
    } as any;

    const imageFile2DataUrl = jest.spyOn(utils, 'imageFile2DataUrl').mockImplementation(() => {
      throw new Error('error');
    });

    render(<Upload {...props} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'url' } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });

    await sleep(50);
    currentRequest.respond(200, {}, uploadSuccess);
  });

  test('onRemove', async (done) => {
    const onRemove = jest.fn();
    const props = {
      api: 'api',
      type: 'input',
      inputUploadType: 'url',
      onRemove,
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
        });
        act(() => {
          fireEvent.click(container.getElementsByClassName('gio-upload__input-preview')[0]);
        });
        await waitFor(() => {
          expect(onRemove).toHaveBeenCalled();
        });
        done();
      },
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: imgUrl } });
      fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });
    });
  });
});

describe('Testing card upload', () => {
  test('should call onRemove function ---- return false', async (done) => {
    const onRemove = jest.fn(() => false);
    (testFile as any).status = STATUS_SUCCESS;
    const props = {
      action: 'api',
      type: 'card',
      onRemove,
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
          fireEvent.click(container.querySelector(deleteIcon));
        });
        await waitFor(() => {
          expect(onRemove).toHaveBeenCalled();
        });
        done();
      },
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [testFile] } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });

  test('should call onRemove function --- return true', async (done) => {
    const removeMock = jest.fn(() => true);
    const props = {
      type: 'card',
      action: 'api',
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
          fireEvent.click(container.querySelector(deleteIcon));
        });
        await waitFor(() => {
          expect(removeMock).toHaveBeenCalled();
        });
        done();
      },
      onRemove: removeMock,
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [testFile] } });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });

  test('should onRemove function -- return true', async (done) => {
    const onRemove = jest.fn(() => true);
    (testFile as any).dataUrl = dataUrl;
    const props = {
      action: 'api',
      file: testFile,
      type: 'card',
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
          fireEvent.click(container.querySelector(deleteIcon));
        });
        await waitFor(() => {
          expect(onRemove).toHaveBeenCalled();
        });
        await sleep(50);
        delete (testFile as any).dataUrl;
        done();
      },
      onRemove,
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [testFile] } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });

  test('call onRemove function ---- return true', async (done) => {
    (testFile as any).dataUrl = dataUrl;
    const props = {
      action: 'api',
      file: testFile,
      type: 'card',
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
          fireEvent.click(container.querySelector(deleteIcon));
        });
        await sleep(50);
        delete (testFile as any).dataUrl;
        done();
      },
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: [testFile] } });
    });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });
});

describe('Testing drag upload', () => {
  test('support drag file with hover style', async () => {
    jest.useFakeTimers();
    const props = {
      action: 'api',
      type: 'drag',
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.dragOver(container.getElementsByClassName('gio-upload__drag')[0], {
        dataTransfer: { files: [{ file: 'foo.png' }] },
      });
    });

    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      rerender(<Upload {...props} />);
    });

    await waitFor(() => {
      expect(container.getElementsByClassName('gio-upload__drag--hover')).toBeTruthy();
    });
    jest.useRealTimers();
  });

  test('support darg file with image style', async (done) => {
    const props = {
      action: 'api',
      type: 'drag',
      accept: 'image/*',
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
        });
        await waitFor(() => {
          expect(container.getElementsByClassName('gio-upload__actions-container')).toHaveLength(1);
        });
        done();
      },
    } as any;

    const { container, rerender } = render(<Upload {...props} />);

    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: { files: [testFile] },
      });
    });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });

  test('support darg file with file style', async (done) => {
    const props = {
      action: 'api',
      type: 'drag',
      onSuccess: async () => {
        await sleep(50);
        act(() => {
          rerender(<Upload {...props} />);
        });
        act(() => {
          fireEvent.click(container.getElementsByClassName('gio-upload__actions-file')[0]);
          fireEvent.click(container.getElementsByClassName('drag-file-preview-text')[0]);
        });
        await waitFor(() => {
          expect(container.getElementsByClassName('gio-upload__preview-file')).toHaveLength(1);
        });
        done();
      },
    } as any;

    const { container, rerender } = render(<Upload {...props} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], {
        target: { files: [new File(['content'], 'filename.doc')] },
      });
    });

    await sleep(50);
    currentRequest.respond(200, {}, JSON.stringify({ success: true }));
  });

  it('upload width default file list', () => {
    render(<DefaultListUpload {...DefaultListUpload.args} />);
    expect(screen.getByText('xxx.pdf')).toBeTruthy();
  });

  it('defaultFileList length > maxCount', () => {
    render(<Upload type="drag" multiple defaultFileList={mockFileList as any} />);
    expect(screen.getByText('one.png')).toBeTruthy();
    expect(screen.queryByText('two.jpg')).toBeNull();
  });

  it('testing fileList prop', async () => {
    const list = [
      {
        uid: 'u-12138',
        name: 'xxx.png',
        type: 'image/png',
      },
      {
        uid: 'u-12139',
        name: 'yyy.png',
        type: 'image/png',
      },
      {
        uid: 'u-12140',
        name: 'zzz.html',
        type: 'text/html',
      },
    ];
    const { container } = render(<ControlledFileList {...ControlledFileList.args} />);
    act(() => {
      fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: list } });
    });

    await waitFor(() => {
      expect(screen.queryByText('xxx.png')).toBeNull();
      expect(screen.getByText('yyy.png')).toBeTruthy();
    });

    await sleep(50);
    act(() => {
      currentRequest.respond(200, {}, uploadedSuccess);
    });
  });
});

describe('multiple language', () => {
  it('button trigger', () => {
    render(
      <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
        <Upload type="button" />
      </DesignContext.Provider>
    );
  });

  it('drag trigger', () => {
    render(
      <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
        <Upload type="drag" />
      </DesignContext.Provider>
    );
    expect(screen.getByText('Click or drag file to this area to upload')).toBeTruthy();
  });

  it('file list', () => {
    render(
      <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
        <DefaultListUpload {...DefaultListUpload.args} />
      </DesignContext.Provider>
    );
    expect(screen.getByText('FileUploaded Successfully!')).toBeTruthy();
  });

  it('controlled file', () => {
    render(
      <DesignContext.Provider value={{ ...DefaultContextProps, locale: enUS }}>
        <Upload
          type="drag"
          file={
            {
              uid: '3',
              name: 'zzz.txt',
              status: 'success',
              dataUrl: 'https://www.xxx.com/zzz.txt',
            } as any
          }
        />
      </DesignContext.Provider>
    );
    expect(screen.getByText('Uploaded Successfully!')).toBeTruthy();
  });
});
