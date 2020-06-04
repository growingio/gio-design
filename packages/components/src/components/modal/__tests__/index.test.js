import React from 'react';
import { shallow, mount } from 'enzyme';
import Modal from '..';

describe('Testing Modal', () => {
  it('should be able to render component', () => {
    const wrapper = shallow(<Modal visible={true} />);
    expect(wrapper.find('.gio-modal').length).toBe(1);
  });

  it('should be able to render text currently ', () => {
    const content = <div className='contentXX'>contentXX</div>;
    const wrapper = shallow(<Modal visible={true}>{content}</Modal>);
    expect(wrapper.find('.contentXX').length).toBe(1);
  });

  it('can be closed', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<Modal visible={true} closable={true} onCancel={onCancel} />);
    expect(wrapper.find('.ant-modal-content').length).toBe(1);
    expect(wrapper.find('.ant-modal-close-x').length).toBe(1);
    wrapper.find('.ant-modal-close-x').simulate('click');
    expect(onCancel).toBeCalled();
  });
});
