import React from 'react';
import { mount, render } from 'enzyme';
import { TagOutlined } from '@gio-design/icons'
import Alert from '..'

describe('Alert snapshots.',() => {
    it('should match alert base snapshot.',() => {
        const wrapper = render(
          <Alert 
            type="success" 
            message="Success Text" 
          />
        )
        expect(wrapper).toMatchSnapshot();
    })

    it('icon by self.',() => {
      const wrapper = render(
        <Alert 
          icon={<TagOutlined />}
          showIcon
        />
      )
      expect(wrapper).toMatchSnapshot();
    })

    it('close function should be called when click the closeIcon.',() => {
        const onClickMock = jest.fn();
        const wrapper = mount(
          <Alert
            message="Info Text"
            description="Info Description Info Description Info Description Info Description"
            closeable
            onClose={onClickMock}
          />
        )
        wrapper.find('.gio-alert-closeIcon').simulate('click');
        expect(onClickMock).toBeCalled();
    })

    it('should show icons',() => {
        const wrapper = render(
          <div>
            <Alert type="info" message="Info Text" showIcon />
            <Alert type="success" message="Success Text" showIcon />
            <Alert type="warning" message="Warning Text" showIcon />
            <Alert type="error" message="Error Text" showIcon />
            <Alert type="info" message="Info Text" showIcon size="small" />
            <Alert type="success" message="Success Text" showIcon size="small" />
            <Alert type="warning" message="Warning Text" showIcon size="small" />
            <Alert type="error" message="Error Text" showIcon size="small" />
          </div>
        )
        expect(wrapper).toMatchSnapshot();
    })

    it('the colseText should be useful',() => {
        const wrapper = mount(
          <Alert
            type="success"
            message="Success Text"
            closeable
            colseText="Close Now"
          />
        )
        wrapper.find('.gio-alert-closeIcon').simulate('click');
        expect(wrapper.find('.gio-alert').hasClass('gio-alert-close')).toBeTruthy();
    })

    it('should be stable',() => {
      const wrapper = render(
        <div>
          <Alert description="Info Description" />
          <Alert type="success" description="Success Description" />
          <Alert
            type="warning"
            description="Warning Description"
          />
          <Alert type="error" description="Error Description" />
          <Alert description="Info Description" size="small" />
          <Alert type="success" description="Success Description" size="small" />
          <Alert
            type="warning"
            description="Warning Description"
            size="small"
          />
          <Alert
            type="error"
            description="Error Description"
            size="small"
          />
        </div>
      )
      expect(wrapper).toMatchSnapshot();
    })

})