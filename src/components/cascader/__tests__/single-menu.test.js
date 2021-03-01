import { act } from 'react-dom/test-utils';
// import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';

import SingleMenu from '../single-menu';

describe('<SingleMenu />', () => {
  it("should align to window's bottom", () => {
    const useRefSpy = jest.spyOn(React, 'useRef');
    window.innerHeight = 0;
    const dataSource = [{ label: 'a', value: 1, children: [{ label: 'b', value: 2 }] }];
    const parent = { getBoundingClientRect: () => ({ bottom: 11 }) };
    const wrapper = mount(<SingleMenu parentMenu={parent} dataSource={dataSource} />);

    act(() => {
      wrapper.find('.cascader-menu-item .cascader-menu-item-inner').at(0).simulate('click');
    });

    expect(useRefSpy).toBeCalled();
  });

  it('should render a empty tips', () => {
    const dataSource = [{ label: 'a', value: 1 }];
    const wrapper = mount(<SingleMenu depth={0} keyword="b" dataSource={dataSource} />);

    expect(wrapper.find('.cascader-menu-empty-tip')).toHaveLength(1);
  });
});
