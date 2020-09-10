import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import DatePicker from '..';
import moment from 'moment';
import Calendar from 'rc-calendar';
import { noop } from 'lodash';

const format = 'YYYY/MM/DD';
const VALUE = moment([2015, 5, 1]);
const disabledDate = (value) => {
  const date = moment();
  date.hour(0);
  date.minute(0);
  date.second(0);
  return value.isBefore(date); // can not select days before today
};

async function waitComponentRender(component, amount = 3000) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => component.update()));
}

describe('DatePicker', () => {
  const DatePickerInstance = () => (
    <DatePicker
      value={VALUE}
      onChange={noop}
      onSelect={noop}
      format={format}
      showFooter={true}
      disabledDate={disabledDate}
    />
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
    wrapper.find('.gio-input-content').simulate('click');
    waitComponentRender(wrapper).then(() => {
      expect(wrapper.exists('.gio-input-content')).toBe(true);
      done();
    });
  });

  it('should render corretly', () => {
    const wrapper = mount(DatePickerInstance());
    const content = wrapper.find('.gio-input-content');
    expect(content.html().includes('2015/05/01'));
  });
});
