import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import moment from 'moment';
import { noop } from 'lodash';
import DatePicker from '..';
// import Button from '../../button/button';

const format = 'YYYY/MM/DD';
const VALUE = moment([2015, 5, 1]);
const disabledDate = () => false;

async function waitComponentRender(component, amount = 3000) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => component.update()));
}

describe('DatePicker ui test', () => {
  const DatePickerInstance = () => (
    <DatePicker value={VALUE} onChange={noop} onSelect={noop} format={format} showFooter disabledDate={disabledDate} />
  );

  it('should match snapshot', () => {
    const wrapper = render(DatePickerInstance());
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive props', () => {
    expect(() => {
      const wrapper = mount(DatePickerInstance());
      wrapper.setProps({ disabledDate: noop });
      wrapper.setProps({ format });
      wrapper.setProps({ showFooter: 'true' });
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should popup corretly', (done) => {
    const wrapper = mount(DatePickerInstance());
    wrapper.find('.gio-input__content').simulate('click');
    waitComponentRender(wrapper).then(() => {
      expect(wrapper.exists('.gio-input__content')).toBe(true);
      done();
    });
  });

  it('should render corretly', () => {
    const wrapper = mount(DatePickerInstance());
    const content = wrapper.find('.gio-input__content');
    expect(content.html().includes('2015/05/01'));
  });
});
