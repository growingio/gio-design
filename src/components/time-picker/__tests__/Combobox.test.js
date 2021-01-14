import React from 'react';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { mount, render } from 'enzyme';
import Combobox from '../Combobox';
import { Moment } from 'moment';

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
          use12Hours={true}
          isAM
          onAmPmChange={onClickMock}
          //   onChange={onClickMock}
          value={Moment}
        />
      ).exists('.gio-time-picker-panel-combobox')
    ).toMatchSnapshot();
  });
});
