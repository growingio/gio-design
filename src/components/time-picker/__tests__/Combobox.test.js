import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount, render } from 'enzyme';
import { Moment } from 'moment';
import Combobox from '../Combobox';

// 打印快照
describe('Testing Combobox', () => {
  it('should match alert base snapshot.', () => {
    const wrapper = render(<Combobox />);
    expect(wrapper).toMatchSnapshot();
  });
  //  props test
  it('props test', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Combobox
          defaultOpenValue={false}
          use12Hours
          isAM
          onAmPmChange={onClickMock}
          //   onChange={onClickMock}
          value={Moment}
        />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });

  it('props test2', () => {
    const onClickMock = jest.fn();
    expect(
      mount(
        <Combobox
          defaultOpenValue={false}
          use12Hours={false}
          isAM
          onAmPmChange={onClickMock}
        />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });
});
