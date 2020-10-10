import React from 'react';
import { mount } from 'enzyme';
import Space from '../index';

describe('<Space>', () => {
  it('render correctly', () => {
    const wrapper = mount(<Space />);

    expect(wrapper.find('.gio-space')).toHaveLength(0);

    wrapper.setProps({
      children: ['test', <button>1</button>, <button>2</button>],
    });

    expect(wrapper.find('.gio-space .gio-space-item')).toHaveLength(3);
  });

  it('accept options', () => {
    const wrapper = mount(
      <Space>
        test
        <button>1</button>
        <button>2</button>
      </Space>
    );

    wrapper.setProps({ align: 'end' });
    expect(wrapper.find('.gio-space.gio-space-align-end')).toHaveLength(1);

    wrapper.setProps({ size: 'small' });
    expect(wrapper.find('.gio-space .gio-space-item').at(0).prop('style')).toHaveProperty('marginRight', 8);

    wrapper.setProps({ size: 12 });
    expect(wrapper.find('.gio-space .gio-space-item').at(0).prop('style')).toHaveProperty('marginRight', 12);

    wrapper.setProps({ direction: 'vertical' });
    expect(wrapper.find('.gio-space.gio-space-vertical')).toHaveLength(1);
  });
});
