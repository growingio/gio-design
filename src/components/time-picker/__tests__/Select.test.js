import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount, render } from 'enzyme';
import Select from '../Select';
import Picker from '../index';

const options = [0, 1, 2, 3];

// 打印快照
describe('Testing select', () => {
  //   it('should match alert base snapshot.', () => {
  //     const onClickMock = jest.fn();

  //     const wrapper = render(
  //       <Select type="hour" onSelect={onClickMock} onMouseEnter={onClickMock} onEsc={onClickMock} options={options} />
  //     );
  //     expect(wrapper).toMatchSnapshot();
  //   });
  //   // 测试组件是否正常渲染
  //   it('should render a DOM', () => {
  //     const wrapper = mount(<Select className="test-cls" />);
  //     expect(wrapper.find('.gio-time-picker')).toHaveLength(1);
  //   });
  it('should render a DOM', () => {
    const wrapper = mount(<Picker className="test-cls" />);
    expect(wrapper.find('.gio-time-picker')).toHaveLength(1);
  });
  //
  //   it('select test ', () => {
  //     const wrapper = mount(<Picker className="test-cls" />);

  //     wrapper.find('.gio-time-picker-input').simulate('click');

  //     const arr = document.querySelectorAll('.gio-time-picker-panel-select');
  //     arr.find('li').first().simulate('click');
  //     wrapper.find('.gio-time-picker-input').simulate('click');
  //     expect(wrapper.find('.gio-time-picker-input').text()).toBe('00:00');
  //   });

  //   it('select test ', () => {
  //     const wrapper = mount(<Select options={options} />);
  //     // wrapper.find('ul').find('li').simulate('click');
  //     expect(wrapper.find('li'))
  //   });
});
