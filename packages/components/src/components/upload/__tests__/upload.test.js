import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import { setup, clear } from '../tests/mock';
import { mountTest, mountSnapshot } from '../tests/mount';
import Upload from '..';

const uploadTypes = ['button', 'input', 'card', 'avatar', 'drag'];

const mockImage = {
  target: {
    files: [{ file: 'foo.png' }],
  },
};

describe('Testing Upload', () => {
  uploadTypes.forEach((type) => {
    mountTest(type);
    mountSnapshot(type);
  });

  beforeEach(() => setup());
  afterEach(() => clear());

  it('return promise in beforeUpload', async (done) => {
    const props = {
      action: '/upload',
      beforeUpload: () =>
        new Promise((resolve) =>
          setTimeout(() => {
            resolve('success');
          }, 100)
        ),
      onSuccess: (res, file) => {
        if (file.status !== 'uploading') {
          done();
        }
      },
      onError: (error, file) => {
        if (file.status !== 'uploading') {
          done();
        }
      },
    };

    let wrapper;
    await act(async () => {
      wrapper = mount(<Upload {...props} />);
      wrapper.find('input').simulate('change', mockImage);
    });
  });
});
