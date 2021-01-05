import React from 'react';
import { mount, render } from 'enzyme';
import Preview, { PreviewForNotImage } from '../Preview';

const testFile = new File(['abc'], 'test.doc', { type: 'doc' });
describe('Testing Preview', () => {
  it('should be stable', () => {
    const wrapper = render(<Preview file={testFile} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const wrapper = mount(<Preview />);
      wrapper.setProps({ file: testFile });
      wrapper.setProps({ size: 14 });
      wrapper.unmount();
    }).not.toThrow();
  });
});

describe('Testing PreviewForNotImage', () => {
  it('should render doc icon', () => {
    const wrapper = render(<PreviewForNotImage file={testFile} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render pdf icon', () => {
    const testFile = new File(['abc'], 'test.pdf', { type: 'pdf' });
    const wrapper = render(<PreviewForNotImage file={testFile} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render xls icon', () => {
    const testFile = new File(['abc'], 'test.xls', { type: 'xls' });
    const wrapper = render(<PreviewForNotImage file={testFile} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render csv icon', () => {
    const testFile = new File(['abc'], 'test.csv', { type: 'csv' });
    const wrapper = render(<PreviewForNotImage file={testFile} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const newFile = new File(['abc'], 'test.txt', { type: 'txt' });
      const wrapper = mount(<PreviewForNotImage file={testFile} />);
      wrapper.setProps({ file: newFile });
      wrapper.unmount();
    }).not.toThrow();
  });
});
