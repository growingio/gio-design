import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, render } from 'enzyme';
import moment from 'moment';
import { noop } from 'lodash';
import DateRangePicker from '../dateRangePicker';
import Button from '../../button/button';

const format = 'YYYY/MM/DD';
const VALUE = [moment([2015, 5, 1]), moment([2015, 5, 2])]
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
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should popup corretly', (done) => {
    const wrapper = mount(DateRangePickerInstance());
    wrapper.find('.gio-input-content').at(0).simulate('click');
    waitComponentRender(wrapper).then(() => {
      expect(wrapper.exists('.gio-input-content')).toBe(true);
      done();
    });
  });

  it('should render corretly', () => {
    const wrapper = mount(DateRangePickerInstance());
    const content = wrapper.find('.gio-input-content').at(0);
    expect(content.html().includes('2015/05/01'));
  });

});

describe('DatePicker action Test', () => {



  it('should trigger onChange', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <DateRangePicker
        value={VALUE}
        onChange={onChange}
        format={format}
        showFooter
        disabledDate={disabledDate}
      />
    );
    act(() => {
      wrapper.find('.gio-input-content').at(0).simulate('click');
    })
    waitComponentRender(wrapper).then(() => {
      act(() => {
        wrapper.find('.gio-date-picker-selected-start-date').at(0).simulate('click');
      });
      act(() => {
        wrapper.find('.gio-date-picker-selected-end-date').at(0).simulate('click');
      });
      expect(onChange).toHaveBeenCalled();
    });
  });


  /*
  it('should trigger onConfirm', () => {
    const onConfirm = jest.fn();
    const renderFooter = () => (
      <>
        <Button type="secondary" size="middle" onClick={noop}>
          取消
        </Button>
        <Button size="middle" className='confirmButton' onClick={onConfirm}>
          确定
        </Button>
      </>
    );
    const wrapper = mount(
      <DateRangePicker
        value={VALUE}
        onSelect={noop}
        onChange={noop}
        format={format}
        showFooter
        renderFooter={renderFooter}
        disabledDate={disabledDate}
      />
    );
    act(() => {
      wrapper.find('.gio-input-content').at(0).simulate('click');
    })
    waitComponentRender(wrapper).then(() => {
      act(() => {
        wrapper.find('.confirmButton').at(0).simulate('click');
      })
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it('should trigger onCancel', () => {
    const onCancel = jest.fn();
    const renderFooter = () => (
      <>
        <Button type="secondary" size="middle" onClick={onCancel}>
          取消
        </Button>
        <Button size="middle" onClick={noop}>
          确定
        </Button>
      </>
    );
    const wrapper = mount(
      <DateRangePicker
        value={VALUE}
        onSelect={noop}
        onChange={noop}
        format={format}
        showFooter
        renderFooter={renderFooter}
        disabledDate={disabledDate}
      />
    );
    act(() => {
      wrapper.find('.gio-input-content').at(0).simulate('click');
    })
    waitComponentRender(wrapper).then(() => {
      act(() => {
        wrapper.find('.gio-btn-secondary').at(0).simulate('click');
      })
      expect(onCancel).toHaveBeenCalled();
    });
  });
  */
});

