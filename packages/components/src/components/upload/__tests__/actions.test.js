import React from 'react';
import { mount, render } from 'enzyme';
import Actions from '../Actions';

const testFile = new File(['abc'], 'test.doc', { type: 'doc' });
describe('Testing Actions', () => {
  it('should be stable', () => {
    const wrapper = render(
      <Actions
        file={testFile}
        onRemove={(file) => {
          console.log(file.status);
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    const newFile = new File(['abcd'], 'new.doc', { type: 'doc' });
    expect(() => {
      const wrapper = mount(<Actions file={testFile} />);
      wrapper.setProps({ file: newFile });
      wrapper.setProps({
        onRemove: (file) => {
          console.log(`${file.name}已删除`);
        },
      });
      wrapper.unmount();
    }).not.toThrow();
  });
});

describe('Testing Actions Events', () => {
  it('should remove when click', () => {
    const onRemove = jest.fn();
    const wrapper = mount(<Actions file={testFile} onRemove={onRemove} />);
    expect(wrapper.find('.gio-upload__actions-icon'));
    wrapper.find('svg').simulate('click');
    expect(onRemove).toBeCalled();
  });
  it('should stop default events', () => {
    global.document.getElementsByClassName = () => [
      {
        contains: () => false,
      },
    ];
    const onRemove = jest.fn();
    const handleStopPropagation = jest.fn();
    testFile.status = 'success';
    const wrapper = mount(<Actions file={testFile} onRemove={onRemove} />);
    wrapper.find('.gio-upload__actions').simulate('click');
    // expect(handleStopPropagation).toBeCalled();
  });
});
