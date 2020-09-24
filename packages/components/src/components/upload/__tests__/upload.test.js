import React from 'react';
import { mount } from 'enzyme';
import { setup, clear } from '../tests/mock';
import { mountTest, mountSnapshot } from '../tests/mount';
import Upload from '..';

const uploadTypes = ['button', 'input', 'card', 'avatar', 'drag'];

describe('Testing Upload mount', () => {
  uploadTypes.forEach((type) => {
    mountTest(type);
    mountSnapshot(type);
  });
});

describe('Testing Upload actions', () => {
  beforeEach(() => setup());
  afterEach(() => clear());

  it('return promise in beforeUpload', (done) => {
    const wrapper = mount(
      <Upload
        action="http://upload.com"
        beforeUpload={() => new Promise((resolve) => setTimeout(() => resolve('success'), 100))}
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
});
