/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Upload, { IUploadFile } from '..';
import { IUploadProps } from '../interface';
import { setup, teardown } from './mock';

describe('Test Upload', () => {
  beforeEach(() => {
    setup();
  });
  afterEach(() => {
    teardown();
  });
  it('render correctly', () => {
    const { container } = render(<Upload />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(screen.findByText('上传文件')).toBeTruthy();
  });

  it('card mode', () => {
    const { container } = render(<Upload type="card" />);
    // screen.debug();
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__card')).toBeTruthy();
  });
  it('drag mode', () => {
    const { container } = render(<Upload type="drag" accept="image/*" multiple={false} />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__drag')).toBeTruthy();
  });
  it('avatar mode', () => {
    const { container } = render(<Upload type="avatar" accept="image/*" />);
    expect(container.querySelector('.gio-upload')).toBeInTheDocument();
    expect(container.querySelector('.gio-upload__avatar')).toBeTruthy();
  });
  it('controlled file', () => {
    const { container } = render(
      <Upload
        file={{
          dataUrl: 'http://upload.com/zzz.txt',
          name: 'zzz.txt',
          status: 'success',
          uid: '3',
          size: 1111111,
          type: 'txt',
        }}
        type="drag"
      />
    );
    expect(container.querySelector('.gio-upload__preview-file')).toBeInTheDocument();
  });
  it('controlled file list', () => {
    const { container } = render(
      <Upload
        fileList={
          [
            {
              name: 'xxx.png',
              status: 'success',
              uid: '-1',
              url: 'http://upload.com/xxx.png',
            },
            {
              name: 'yyy.png',
              status: 'success',
              uid: '-11',
              url: 'http://upload.com/yyy.png',
            },
          ] as IUploadFile<any>[]
        }
        accept="image/*"
        maxCount={10}
        multiple
        type="drag"
      />
    );
    expect(container.querySelector('.gio-upload-file-list')).toBeInTheDocument();
    expect(container.querySelectorAll('.gio-upload-file-list-item')).toHaveLength(2);
  });

  it('return promise in beforeUpload', (done) => {
    const data = jest.fn();
    const props = {
      action: 'http://upload.com',
      beforeUpload: () =>
        new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 100);
        }),
      data,
      onChange: (file: IUploadFile<any>) => {
        if (file.status !== 'uploading') {
          expect(data).toHaveBeenCalled();
          done();
        }
      },
    };
    act(() => {
      const { container } = render(<Upload {...props} />);

      fireEvent.change(container.querySelector('input'), {
        target: {
          files: [{ file: 'foo.png' }],
        },
      });
    });
  });
  it('should not upload when fileList count >= maxCount', () => {
    const onBeforeUpload = jest.fn();
    const props: IUploadProps = {
      action: 'http://upload.com',
      defaultFileList: [
        {
          name: 'xxx.png',
          status: 'success',
          uid: '-1',
          url: 'http://upload.com/xxx.png',
        },
      ] as IUploadFile<any>[],
      maxCount: 2,
      type: 'drag',
      multiple: true,
      beforeUpload: onBeforeUpload,
    };
    const { container } = render(<Upload {...props} />);
    fireEvent.change(container.querySelector('input'), {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
    expect(container.querySelector('.gio-upload')).toHaveClass('gio-upload--disabled');
    fireEvent.change(container.querySelector('input'), {
      target: {
        files: [{ file: 'bar.png' }],
      },
    });
    expect(onBeforeUpload).toHaveBeenCalledTimes(1);
  });
  it('should disabled when defaultFileList count >= maxCount', () => {
    const props: IUploadProps = {
      action: 'http://upload.com',
      defaultFileList: [
        {
          name: 'xxx.png',
          status: 'success',
          uid: '-1',
          url: 'http://upload.com/xxx.png',
        },
        {
          name: 'yyy.png',
          status: 'success',
          uid: '-11',
          url: 'http://upload.com/yyy.png',
        },
        {
          name: 'zzz.png',
          status: 'success',
          uid: '-111',
          url: 'http://upload.com/zzz.png',
        },
      ] as IUploadFile<any>[],
      maxCount: 2,
      type: 'drag',
      multiple: true,
    };
    const { container } = render(<Upload {...props} />);
    expect(container.querySelector('.gio-upload')).toHaveClass('gio-upload--disabled');
  });
});
