import React from 'react';
import { mount, render } from 'enzyme';
import Panel from '../index';

describe('Testing Combobox', () => {
  //   it('should match alert base snapshot.', () => {
  //     const wrapper = render(<Panel />);
  //     expect(wrapper).toMatchSnapshot();
  //   });
  //  props test
  it('props test1', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Panel defaultOpenValue={false} use12Hours isAM onAmPmChange={onClickMock} onChange={onClickMock} />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });

  it('props test2', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Panel defaultOpenValue={false} use12Hours isAM onAmPmChange={onClickMock} onChange={onClickMock} disabledHours={[1,2,3]} />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });

  it('props test3', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Panel defaultOpenValue={false} use12Hours isAM={false} onAmPmChange={onClickMock} onChange={onClickMock} disabledHours={[1,2,3]} />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });
});
