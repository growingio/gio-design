import { mount } from 'enzyme';
import React from 'react';
// import { act } from 'react-dom/test-utils';
import Empty from '../empty';

describe('<Empty />', () => {
  it('should provider a default tips', () => {
    const wrapper = mount(<Empty />);

    expect(wrapper.find('.cascader-menu-empty-tip').text()).toEqual('暂无数据');
  });
});
