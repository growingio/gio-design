/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import { waitFor } from '@testing-library/react';
import moment from 'moment';
import { noop } from 'lodash';
import DateRangePicker from '../dateRangePicker';

const format = 'YYYY/MM/DD';
const VALUE = [moment([2015, 5, 1]), moment([2015, 5, 2])];
const disabledDate = () => false;

async function waitComponentRender(component, amount = 3000) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => component.update()));
}

describe('DateRangePicker ui test', () => {
  const DateRangePickerInstance = () => (
    <DateRangePicker
      value={VALUE}
      onChange={noop}
      onSelect={noop}
      disabledDate={disabledDate}
      format={format}
      showFooter
    />
  );

  it('should match snapshot', () => {
    const wrapper = render(DateRangePickerInstance());
    expect(wrapper).toMatchSnapshot();
  });

  it('should receive props', () => {
    expect(() => {
      const wrapper = mount(DateRangePickerInstance());
      wrapper.setProps({ disabledDate: noop });
      wrapper.setProps({ format });
      wrapper.setProps({ showFooter: 'true' });
      wrapper.setProps({ renderExtraFooter: () => <div>extrafooter</div> });
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should popup corretly', (done) => {
    const wrapper = mount(DateRangePickerInstance());
    wrapper.find('.gio-input__content').at(0).simulate('click');
    waitComponentRender(wrapper).then(() => {
      expect(wrapper.exists('.gio-input__content')).toBe(true);
      done();
    });
  });

  it('should render corretly', () => {
    const wrapper = mount(DateRangePickerInstance());
    const content = wrapper.find('.gio-input__content').at(0);
    expect(content.html().includes('2015/05/01'));
  });

  it('should render extrafooter', async () => {
    const wrapper = mount(DateRangePickerInstance());
    wrapper.setProps({ renderExtraFooter: () => <div>extrafooter</div> });

    act(() => {
      wrapper.setProps({ renderExtraFooter: () => <div>extrafooter</div> });
      wrapper.find('.gio-input__content').at(0).simulate('click');
    });

    waitComponentRender(wrapper).then(() => {
      const extraFooter = wrapper.find('.gio-date-picker-extra-footer');
      expect(extraFooter.html().includes('extrafooter'));
    });
  });
});
