import React from 'react';
import { mount, render } from 'enzyme';
import { FilterOutlined } from '@gio-design/icons'
import Button from '..';

describe('Testing button',() => {

  it('should have two chars',() => {
    const wrapper = mount(
      <Button htmlType="submit">
        <span>提交</span>
      </Button>
    )
    expect(wrapper.exists('.gio-btn-two-chinese-chars')).toBe(false);
  })

  it('test',() => {
    const wrapper = mount(
      <Button>
        点击
      </Button>
    )
    wrapper.setProps({icon:<FilterOutlined />})
    expect(wrapper.find('.gio-btn').text()).toBe("点击");
  })

  it('add.',() => {
    const num = 132;
    const wrapper = render(
      <div>
        <Button>
          点击
          {1234}
          按钮
        </Button>
        <Button>
          {12}
          {null}
          ok
        </Button>
        <Button>
          点击
          <span>按钮</span>
          {123456}
        </Button>
        <Button>
          {num}
        </Button>
      </div>
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('buttons.',() => {
      const wrapper = render(
        <div>
          <Button size="large">主要按钮</Button>
          <Button type="text" disabled>文本按钮</Button>
          <Button>{true}</Button>
          <Button type="secondary" size="large">次要按钮</Button>
          <Button type="assist" size="middle">辅助按钮</Button>
          <Button type="text" size="small" ghost>深色背景</Button>
          <Button block type="primary">块按钮</Button>
        </div>
      )
      expect(wrapper).toMatchSnapshot();
  })

  it('button have icon and children.',() => {
    const wrapper = render(
      <div>
        <Button icon={<FilterOutlined />} size="large" type="assist">
          <span>过滤条件</span>
        </Button>
        <Button type="primary" disabled>
          <div>禁用</div>
          禁用
          <div>禁用</div>
        </Button>
      </div>
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('without text.',() => {
    const wrapper = render(
      <div>
        <Button loading={false} icon={<FilterOutlined />} />
        <Button loading icon={<FilterOutlined />} />
      </div>
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('button in loading.',() => {
    const wrapper = mount(
      <Button>{123}</Button>
    )
    wrapper.setProps({loading:true});
    wrapper.update();
    expect(wrapper.exists('.gio-btn-loading')).toBe(true);
  })

  it('can be click.',() => {
      const onClickMock = jest.fn();
      const wrapper = mount(
        <Button type="primary" loading={false} onClick={onClickMock}>
          点击!
        </Button>
      )
      wrapper.find('.gio-btn').simulate('click');
      expect(onClickMock).toBeCalled();
  })

  it('can not be click.',() => {
    const onClickMock = jest.fn();
    const wrapper = mount(
      <Button type="primary" loading onClick={onClickMock}>
        点击!
      </Button>
    )
    wrapper.find('.gio-btn').simulate('click');
    expect(onClickMock).not.toBeCalled();
  })

  it('should have space.',() => {
    const wrapper = mount(
      <Button>
        点击
      </Button>
    )
    wrapper.update();
    expect(wrapper.find('.gio-btn').text()).toBe("点 击")
  })

  it('set ref.',() => {
    const changeMock = jest.fn();
    const wrapper = mount(
      <Button type="primary" ref={changeMock}>
        登录
      </Button>
    )
    wrapper.find('.gio-btn').simulate('change');
    expect(changeMock).toBeCalled();
  })

})