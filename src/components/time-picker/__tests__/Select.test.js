import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { noop } from 'lodash';
import { clickInput, clickSelectItem, matchValue, matchAll, escapeSelected } from './util';
import Picker from '../index';
import Select from '../Select';
import TimePicker from '../TimePicker';
import { sleep } from '../../../utils/test';

// 打印快照
describe('Testing select', () => {
  it('should render a DOM', () => {
    const wrapper = mount(<Picker className="test-cls" />);
    expect(wrapper.find('.gio-time-picker')).toHaveLength(1);
  });

  it('should render null', () => {
    expect(
      mount(
        <Select
          prefixCls="gio-time-picker-select"
          options={[]}
          type="ampm"
          onSelect={noop}
          onMouseEnter={noop}
          onEsc={noop}
        />
      )
    ).toMatchSnapshot();
  });

  it('disable', () => {
    expect(
      mount(
        <Select
          prefixCls="gio-time-picker-select"
          options={[{ disabled: true, value: 'test1' }, { value: 'test2' }]}
          selectedIndex={1}
          type="ampm"
          onSelect={noop}
          onMouseEnter={noop}
          onEsc={noop}
        />
      )
    ).toMatchSnapshot();
  });
  it('should render a DOM', () => {
    const wrapper = mount(<Picker className="test-cls" />);
    expect(wrapper.find('.gio-time-picker')).toHaveLength(1);
  });

  it('should call onSelect function whit enter key', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Select
        prefixCls="gio-time-picker-select"
        options={[{ value: 'test1' }, { value: 'test2' }]}
        selectedIndex={1}
        type="ampm"
        onSelect={onSelect}
        onMouseEnter={() => {}}
        onEsc={() => {}}
      />
    );
    wrapper.find('.gio-time-picker-select-select li').at(0).simulate('keydown', { keyCode: 13 });
    expect(onSelect).toHaveBeenCalled();
  });
});

describe('Select', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    return mount(
      <TimePicker format={format} showSecond={showSecond} defaultValue={moment('01:02:04', format)} {...props} />
    );
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('select panel', () => {
    it('select panel reacts to mouseenter and mouseleave correctly', async () => {
      const picker = renderPicker({ use12Hours: true });
      clickInput(picker);

      const re = /(^|\s+)gio-time-picker-panel-select-active(\s+|$)/;

      expect(re.test(picker.find('.gio-time-picker-panel-select').at(0).instance().className)).toBeFalsy();

      picker.find('.gio-time-picker-panel-select').at(0).simulate('mouseEnter');
      expect(re.test(picker.find('.gio-time-picker-panel-select').at(0).instance().className)).toBeTruthy();

      picker.find('.gio-time-picker-panel-select').at(0).simulate('mouseLeave');
      expect(re.test(picker.find('.gio-time-picker-panel-select').at(0).instance().className)).toBeFalsy();

      picker.find('.gio-time-picker-panel-select').at(1).simulate('mouseEnter');

      picker.find('.gio-time-picker-panel-select').at(2).simulate('mouseEnter');

      picker.find('.gio-time-picker-panel-select').at(3).simulate('mouseEnter');
    });

    it('shows only numbers according to step props', async () => {
      const picker = renderPicker({
        hourStep: 5,
        minuteStep: 15,
        secondStep: 21,
      });
      clickInput(picker);

      const selectors = picker.find('.gio-time-picker-panel-select');

      const hourSelector = selectors.at(0);
      const minuteSelector = selectors.at(1);
      const secondSelector = selectors.at(2);

      const hours = hourSelector.find('li').map((node) => node.text());
      expect(hours).toEqual(['00', '05', '10', '15', '20']);

      const minutes = minuteSelector.find('li').map((node) => node.text());
      expect(minutes).toEqual(['00', '15', '30', '45']);

      const seconds = secondSelector.find('li').map((node) => node.text());
      expect(seconds).toEqual(['00', '21', '42']);
    });
  });

  describe('select number', () => {
    it('select number correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();

      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      expect(picker.find('.gio-time-picker-panel-select').length).toBe(3);
    });
  });

  describe('select in 12 hours mode', () => {
    it('renders correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(14).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });

      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchValue(picker, '2:00 pm');

      expect(picker.find('.gio-time-picker-panel-select').length).toBe(3);
    });

    it('renders 12am correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(0).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      expect(picker.find('.gio-time-picker-panel-select').length).toBe(3);
    });

    it('renders 5am correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(0).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchValue(picker, '12:00 am');
      clickSelectItem(picker, 0, 3);

      matchValue(picker, '3:00 am');
    });

    it('renders 12am/pm correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(0).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });

      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchValue(picker, '12:00 am');

      clickSelectItem(picker, 2, 1);
      matchValue(picker, '12:00 pm');

      clickSelectItem(picker, 2, 0);
      matchValue(picker, '12:00 am');
    });

    it('renders uppercase AM correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(0).minute(0).second(0),
        showSecond: false,
        format: 'h:mm A',
      });

      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchValue(picker, '12:00 AM');

      clickSelectItem(picker, 2, 1);
      matchValue(picker, '12:00 PM');

      clickSelectItem(picker, 2, 0);
      matchValue(picker, '12:00 AM');
    });
  });

  it('escape closes popup', async () => {
    const picker = renderPicker();

    expect(picker.state().open).toBeFalsy();
    clickInput(picker);
    expect(picker.state().open).toBeTruthy();

    clickSelectItem(picker, 1, 1);
    escapeSelected(picker);

    expect(picker.state().open).toBeFalsy();
  });
});

it('onScroll', async () => {
  const options = new Array(100).fill(0).map((_, index) => ({ value: `test${index}`, label: `test${index}` }));
  const wrapper = mount(
    <Select
      prefixCls="gio-time-picker-select"
      options={options}
      selectedIndex={88}
      type="ampm"
      onSelect={() => {}}
      onMouseEnter={() => {}}
      onEsc={() => {}}
    />
  );
  await sleep(50);
  wrapper.instance().scrollToSelected(100);
  await sleep(50);
  expect(wrapper.render).toMatchSnapshot();
});
