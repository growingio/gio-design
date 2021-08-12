import React from 'react';
import { set } from 'lodash';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import { fakeXhr } from 'nise';
import { act } from 'react-dom/test-utils';
import { AreaUpload } from '../Upload.stories';
import { mountTest, mountSnapshot } from '../tests/mount';
import { testFile, dataUrl, url as imgUrl } from '../tests/mock';
import * as utils from '../utils';
import { sleep } from '../../../utils/test';
import Upload from '..';
import UploadList from '../UploadList';
import DragTrigger from '../triggers/DragTrigger';
import { STATUS_SUCCESS, STATUS_UPLOADING } from '../interface';

const uploadTypes = ['button', 'input', 'card', 'avatar', 'drag'];

let mockXhr = null;
let currentRequest = null;
const mockFile = new File(['foo'], 'foo.png', {
  type: 'image/png',
});

const mockFileList = [
  new File(['one'], 'one.png', { type: 'image/png' }),
  new File(['two'], 'two.jpg', { type: 'image/jpg' }),
  new File(['three'], 'three.png', { type: 'image/png' }),
];

describe('Testing drag-trigger', () => {
  // Mock for rc-util raf
  window.requestAnimationFrame = (callback) => {
    window.setTimeout(callback, 16);
  };
  window.cancelAnimationFrame = (id) => {
    window.clearTimeout(id);
  };

  it('basic drag-tigger', () => {
    render(<AreaUpload {...AreaUpload.args} />);
    expect(screen.getAllByText('点击上传或拖拽文件到此区域')).toHaveLength(2);
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
    fireEvent.change(container.getElementsByTagName('input')[1], { target: { files: mockFileList } });
    await fireEvent.click(screen.getAllByRole('img')[1]);
    waitFor(() => expect(screen.queryByText('超过将无法上传', { exact: false })).toBeNull());
    done();
  });

  it('picture multiple upload', async (done) => {
    const { container } = render(<AreaUpload {...set(AreaUpload.args, 'directory', true)} />);
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    await fireEvent.click(screen.getAllByRole('img')[1]);
    waitFor(() => expect(screen.queryByText('超过将无法上传', { exact: false })).toBeNull());
    done();
  });

  it('should render file upload list', async (done) => {
    const props = {
      type: 'drag',
      action: 'api',
      multiple: true,
      maxCount: 2,
    };
    const { container } = render(<Upload {...props} />);
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    await expect(screen.getByText('one.png')).toBeTruthy();
    await fireEvent.mouseEnter(container.getElementsByClassName('gio-upload-file-list-item')[0]);
    await fireEvent.click(screen.getAllByLabelText('delete-outlined')[0]);
    waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('should render picture upload list', async (done) => {
    const { container } = render(<Upload type="drag" accept="image/*" action="api" multiple maxCount={2} />);
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    await expect(screen.getByText('one.png')).toBeTruthy();
    await fireEvent.mouseEnter(container.getElementsByClassName('gio-upload-file-list-item')[0]);
    await fireEvent.click(screen.getAllByLabelText('delete-outlined')[0]);
    waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('not show uploadList', async (done) => {
    const props = {
      multiple: true,
      maxCount: 5,
      showUploadList: false,
    };
    const { container } = render(<Upload type="drag" action="api" {...props} />);
    fireEvent.change(container.getElementsByTagName('input')[0], { target: { files: mockFileList } });
    waitFor(() => expect(screen.queryByText('one.png')).toBeNull());
    done();
  });

  it('render upload list with items === undefined', () => {
    render(<UploadList items={undefined} onRemove={() => null} />);
    expect(screen.queryByText('文件', { exact: false })).toBeNull();
  });

  it('just render dragTrigger with the test', () => {
    render(
      <DragTrigger
        file={{ status: 'none' }}
        directory
        items={undefined}
        triggerProps={{ className: 'gio-upload-test' }}
      />
    );
  });
});

describe('Testing Upload mount', () => {
  uploadTypes.forEach((type) => {
    mountTest(type);
    mountSnapshot(type);
  });
});
describe('Testing Upload props', () => {
  const getUpload = () => <Upload />;
  it('props disabled', () => {
    const wrapper = mount(getUpload());
    wrapper.setProps({ disabled: true });
    expect(wrapper.exists('.gio-upload-disabled')).toBe(true);
  });

  it('should be render default image', () => {
    const props = {
      placeholderImg: dataUrl,
      type: 'avatar',
    };
    const wrapper = shallow(<Upload {...props} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should be render successBorder', () => {
    const props = {
      placeholderImg: dataUrl,
      type: 'avatar',
      successBorder: true,
      openFileDialogOnClick: false,
    };
    const wrapper = shallow(<Upload {...props} />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
describe('Testing Upload actions', () => {
  beforeEach(() => {
    mockXhr = fakeXhr.useFakeXMLHttpRequest();
    mockXhr.onCreate = (request) => (currentRequest = request);
    jest.spyOn(utils, 'fetchImageFileFromUrl').mockResolvedValue({ originFile: testFile, dataUrl });
    jest.spyOn(utils, 'imageFile2DataUrl').mockResolvedValue(dataUrl);
  });

  afterEach(() => {
    mockXhr.restore();
    currentRequest = null;
    jest.spyOn(utils, 'fetchImageFileFromUrl').mockRestore();
    jest.spyOn(utils, 'imageFile2DataUrl').mockRestore();
  });

  test('should call onStart function', (done) => {
    expect.assertions(1);
    const props = {
      action: 'api',
      onStart: ({ status }) => {
        expect(status).toEqual(STATUS_UPLOADING);
        done();
      },
    };
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: [{ file: mockFile }] } });
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
      onSuccess: (response, { name }) => {
        expect(response).toEqual('uploaded success');
        expect(name).toEqual('undefined');
        done();
      },
    };

    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: [{ file: mockFile }] } });

    await sleep(50);
    currentRequest.respond(200, {}, 'uploaded success');
  });

  test('should call handleProgress function', async (done) => {
    expect.assertions(1);

    const props = {
      action: 'api',
      onProgress: (progressEvent) => {
        expect(progressEvent.type).toEqual('progress');
        done();
      },
    };

    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: [{ file: mockFile }] } });

    await sleep(50);
    currentRequest.respond(200, {}, 'uploaded success');
  });

  test('should call onSuccess function', async (done) => {
    expect.assertions(1);

    const props = {
      action: 'api',
      type: 'drag',
      directory: true,
      onSuccess: (response) => {
        expect(response).toEqual('uploaded success');
        done();
      },
    };

    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: mockFileList } });

    await sleep(50);
    currentRequest.respond(200, {}, 'uploaded success');
  });

  test('should call onSuccess function width multiple picture', async (done) => {
    const props = {
      action: 'api',
      type: 'drag',
      multiple: true,
      accept: 'image/*',
      onSuccess: (res) => {
        expect(res).toBe('uploaded successful');
        done();
      },
    };
    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: mockFileList } });

    await sleep(100);
    currentRequest.respond(200, {}, 'uploaded successful');
  });

  test('should happen HTTP Error', async (done) => {
    expect.assertions(1);

    const props = {
      action: 'api',
      onError: (event) => {
        expect(event.type).toEqual('error');
        done();
      },
    };

    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: [mockFile] } });

    await sleep(50);
    currentRequest.error();
  });

  test('should happen HTTP Error with drag', async () => {
    const props = {
      action: 'api',
      type: 'drag',
      multiple: true,
    };

    const wrapper = mount(<Upload {...props} />);
    wrapper.find('input').simulate('change', { target: { files: mockFileList } });

    await sleep(50);
    currentRequest.error();
  });

  describe('test input upload', () => {
    test('test inputUploadType is an url', () => {
      const props = {
        action: 'api',
        type: 'input',
        inputUploadType: 'url',
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });
    });

    test('test inputUploadType is a file', async (done) => {
      expect.assertions(2);

      const props = {
        action: 'api',
        type: 'input',
        inputUploadType: 'file',
        onSuccess: (response, file) => {
          expect(response).toEqual('upload success');
          expect(file.status).toEqual(STATUS_SUCCESS);
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });

      await sleep(50);
      currentRequest.respond(200, {}, 'upload success');
    });

    test('test inputUploadType is a file ---- when data and action is a function', async (done) => {
      const props = {
        action: () => 'api',
        data: () => ({ data: 'data' }),
        type: 'input',
        inputUploadType: 'file',
        onSuccess: () => {
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });

      await sleep(50);
      currentRequest.respond(200, {}, 'upload success');
    });

    test('test inputUploadType is a file ---- should happen onError function', async (done) => {
      expect.assertions(1);

      const props = {
        action: 'api',
        type: 'input',
        inputUploadType: 'file',
        onError: (event) => {
          expect(event.type).toEqual('error');
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });

      await sleep(50);
      currentRequest.error();
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
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });
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
      };

      const imageFile2DataUrl = jest.spyOn(utils, 'imageFile2DataUrl').mockImplementation(() => {
        throw new Error('error');
      });

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: 'url',
          },
        })
        .simulate('keyDown', { key: 'Enter' });

      await sleep(50);
      currentRequest.respond(200, {}, 'upload success');
    });

    test('onRemove', (done) => {
      const onRemove = jest.fn();
      const props = {
        api: 'api',
        type: 'input',
        inputUploadType: 'url',
        onRemove,
        onSuccess: async () => {
          await sleep(50);
          wrapper.update();
          wrapper.find('.gio-upload__input-preview').simulate('click');
          expect(onRemove).toHaveBeenCalled();
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper
        .find('input[type="text"]')
        .simulate('change', {
          target: {
            value: imgUrl,
          },
        })
        .simulate('keyDown', { key: 'Enter' });
    });

    test('should call onRemove function ---- return false', async (done) => {
      const onRemove = jest.fn(() => false);
      testFile.status = STATUS_SUCCESS;
      const props = {
        action: 'api',
        type: 'card',
        onSuccess: async () => {
          wrapper.update();
          wrapper.find('.gio-upload__actions-icon-delete').at(0).simulate('click');
          expect(onRemove).toHaveBeenCalled();
          done();
        },
        onRemove,
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('input').simulate('change', { target: { files: [testFile] } });
      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });

    test('should call onRemove function ---- return true', async (done) => {
      const onRemove = jest.fn(() => true);
      const props = {
        action: 'api',
        type: 'card',
        onSuccess: async () => {
          wrapper.update();
          wrapper.find('.gio-upload__actions-icon-delete').at(0).simulate('click');
          expect(onRemove).toHaveBeenCalled();
          done();
        },
        onRemove,
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('input').simulate('change', { target: { files: [testFile] } });
      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });

    test('should call onRemove function ---- return true', async (done) => {
      const onRemove = jest.fn(() => true);
      testFile.dataUrl = dataUrl;
      const props = {
        action: 'api',
        file: testFile,
        type: 'card',
        onSuccess: async () => {
          wrapper.update();
          wrapper.find('.gio-upload__actions-icon-delete').at(0).simulate('click');
          expect(onRemove).toHaveBeenCalled();
          await sleep(50);
          delete testFile.dataUrl;
          done();
        },
        onRemove,
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('input').simulate('change', { target: { files: [testFile] } });
      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });

    test('should call onRemove function ---- return true', async (done) => {
      testFile.dataUrl = dataUrl;
      const props = {
        action: 'api',
        file: testFile,
        type: 'card',
        onSuccess: async () => {
          wrapper.update();
          wrapper.find('.gio-upload__actions-icon-delete').at(0).simulate('click');
          await sleep(50);
          delete testFile.dataUrl;
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('input').simulate('change', { target: { files: [testFile] } });
      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });

    test('support drag file with hover style', () => {
      jest.useFakeTimers();
      const props = {
        action: 'api',
        type: 'drag',
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('.gio-upload__drag').simulate('dragover', {
        dataTransfer: {
          files: [{ file: 'foo.png' }],
        },
      });
      act(() => {
        jest.runAllTimers();
      });
      wrapper.update();

      expect(wrapper.find('.gio-upload__drag').hasClass('gio-upload__drag--hover')).toEqual(true);
      jest.useRealTimers();
    });

    test('support darg file with image style', async (done) => {
      const props = {
        action: 'api',
        type: 'drag',
        accept: 'image/*',
        onSuccess: () => {
          wrapper.update();
          expect(wrapper.find('img.gio-upload__preview')).toHaveLength(1);
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('.gio-upload__drag').simulate('drop', {
        dataTransfer: {
          files: [testFile],
        },
      });

      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });

    test('support darg file with file style', async (done) => {
      const props = {
        action: 'api',
        type: 'drag',
        onSuccess: () => {
          wrapper.update();
          expect(wrapper.find('.gio-upload__preview-file')).toHaveLength(1);
          done();
        },
      };

      const wrapper = mount(<Upload {...props} />);
      wrapper.find('.gio-upload__drag').simulate('drop', {
        dataTransfer: {
          files: [new File(['content'], 'filename.doc')],
        },
      });

      await sleep(50);
      currentRequest.respond(200, {}, JSON.stringify({ success: true }));
    });
  });
});
