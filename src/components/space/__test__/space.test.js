import React from 'react';
import { mount, render } from 'enzyme';
import Space from '..';
import Button from '../../button';

describe('Testing Space.', () => {

    it('should render steady.', () => {
        const wrapper = render(
          <Space>
            Space
            <Button>点击</Button>
            {null}
            {undefined}
            {123}
          </Space>)
        
        expect(wrapper).toMatchSnapshot();
    })

    it('should can define split.', () => {
        const wrapper = mount(
          <Space>
            Space
            {123}
          </Space>
        )
        wrapper.setProps({split: '|'});
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    })

    it('should render other props.', () => {
        const wrapper = mount(
          <Space>
            Space
            {123}
          </Space>
        )
        wrapper.setProps({size: 8, direction: 'vertical', autoWrap: true});
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    })

    it('can accept a size array.', () => {
        const wrapper = mount(
          <Space>
            Space
          </Space>
        )
        wrapper.setProps({size: [12, 16]});
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    })

    it('do not contain anything', () => {
        const wrapper = render(
          <Space />
        )
        expect(wrapper).toMatchSnapshot();
    })
})