import React from 'react';
import { mount, render } from 'enzyme';
import { setup, clear } from '../tests/mock';
import { mountTest, mountSnapshot } from '../tests/mount';
import { dataUrl, testFile } from './utils.test';
import * as utils from '../utils';
import { getMock } from './xhrRequest.test';
import Upload from '..';
const uploadTypes = ['button', 'input', 'card', 'avatar', 'drag'];

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
});
describe('Testing Upload actions', () => {
  beforeEach(() => setup());
  afterEach(() => clear());
  it('return promise in beforeUpload', (done) => {
    const wrapper = mount(
      <Upload
        action="http://upload.com"
        beforeUpload={() => new Promise((resolve) => setTimeout(() => resolve('success'), 201))}
        onSuccess={(res, file) => {
          if (file.status !== 'uploading') {
            done();
          }
        }}
        onError={(error, file) => {
          if (file.status !== 'uploading') {
            done();
          }
        }}
      />
    );
    wrapper.find('input').simulate('change', {
      target: {
        files: [{ file: 'foo.png' }],
      },
    });
  });
  test('handleInputUpload function when uploadType = url', () => {
    const wrapper = mount(<Upload type="input" />);
    wrapper.find('input[type="text"]').simulate('focus');
    wrapper.find('input[type="text"]').simulate('change', {
      target: {
        value:
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607050385386&di=3998f4831eff5f90e97c27cad63704c3&imgtype=0&src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi3%2F3883849635%2FTB2eWnVhDXYBeNkHFrdXXciuVXa_%2521%25213883849635.jpg_300x300.jpg',
      },
    });
    wrapper.find('input[type="text"]').simulate('keyDown', { key: 'Enter' });
  });
  test('handleInputUpload function when uploadType = file', () => {
    const props = {
      action: 'http://upload.com',
      data: { name: 'gio', age: '21', hobbies: ['eat', 'sleep'] },
      file: testFile,
    };
    const wrapper = mount(<Upload {...props} type="input" inputUploadType="file" />);
    const originFile = { testFile, dataUrl };
    const mock = jest.spyOn(utils, 'fetchImageFileFromUrl');
    mock.mockResolvedValue(originFile);
    XMLHttpRequest = jest.fn().mockImplementation(getMock(201));
    wrapper.find('input[type="text"]').simulate('focus');
    wrapper.find('input[type="text"]').simulate('keyDown', { key: 'Enter' });
  });
  test('handleInputUpload function when uploadType = file', () => {
    const props = {
      action: 'http://upload.com',
      data: { name: 'gio', age: '21', hobbies: ['eat', 'sleep'] },
      file: testFile,
    };
    const wrapper = mount(<Upload {...props} type="input" inputUploadType="file" />);
    const originFile = { testFile, dataUrl };
    const mock = jest.spyOn(utils, 'fetchImageFileFromUrl');
    mock.mockResolvedValue(originFile);
    XMLHttpRequest = jest.fn().mockImplementation(getMock(300));
    wrapper.find('input[type="text"]').simulate('focus');
    wrapper.find('input[type="text"]').simulate('keyDown', { key: 'Enter' });
  });
});
