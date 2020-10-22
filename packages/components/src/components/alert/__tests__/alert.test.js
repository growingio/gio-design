import React from 'react';
import { mount, render } from 'enzyme';
import Alert from '..'

describe('Alert snapshots.',() => {
    it('should match alert base snapshot.',() => {
        const wrapper = render(
          <Alert type="success" message="Success Text" />
        )
        expect(wrapper).toMatchSnapshot();
    })

    it('should match various styles alert snapshot.',() => {
        const wrapper = render(
          <div>
            <Alert message="Info Text" description="Info Description Info Description Info Description Info Description" />
            <Alert
              type="success"
              message="Success Text"
              description="Success Description Success Description Success Description"
            />
            <Alert
              type="warning"
              message="Warning Text"
              description="Warning Description Warning Description Warning Description Warning Description"
            />
            <Alert
              type="error"
              message="Error Text"
              description="Error Description Error Description Error Description Error Description"
            />
            <Alert
              message="Info Text"
              description="Info Description Info Description Info Description Info Description"
              size="small"
            />
            <Alert
              type="success"
              message="Success Text"
              description="Success Description Success Description Success Description"
              size="small"
            />
            <Alert
              type="warning"
              message="Warning Text"
              description="Warning Description Warning Description Warning Description Warning Description"
              size="small"
            />
            <Alert
              type="error"
              message="Error Text"
              description="Error Description Error Description Error Description Error Description"
              size="small"
            />
          </div>
        );
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

    it('alert should be closed when click the closeIcon.',() => {
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
        expect(wrapper.find('.gio-alert').hasClass('gio-alert-close')).toBeTruthy();
    })

    it('should show icons',() => {
        const wrapper = render(
          <div>
            <Alert message="Info Text" showIcon />
            <Alert type="success" message="Success Text" showIcon />
            <Alert type="warning" message="Warning Text" showIcon />
            <Alert type="error" message="Error Text" showIcon />
            <Alert message="Info Text" showIcon size="small" />
            <Alert type="success" message="Success Text" showIcon size="small" />
            <Alert type="warning" message="Warning Text" showIcon size="small" />
            <Alert type="error" message="Error Text" showIcon size="small" />
          </div>
        )
        expect(wrapper.find('.gio-alert-icon')).toBeDefined();
    })

    it('the colseText replace closeIcon should be useful',() => {
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
})