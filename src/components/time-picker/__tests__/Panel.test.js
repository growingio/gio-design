import React from 'react';
import { mount, render } from 'enzyme';
import Panel from '../index';

describe('Testing Combobox', () => {
  //   it('should match alert base snapshot.', () => {
  //     const wrapper = render(<Panel />);
  //     expect(wrapper).toMatchSnapshot();
  //   });
  //  props test
  it('props test', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Panel defaultOpenValue={false} use12Hours isAM onAmPmChange={onClickMock} onChange={onClickMock} />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });
});
