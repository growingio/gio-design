import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggles from '../index';

describe('Testing Toggles', () => {
  it('should return "false" when change on defaultChecked Toggles.', () => {
    const onChange = jest.fn();
    const props = {
      inactiveValue: false,
      activeValue: true,
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<Toggles defaultChecked={false} inactiveColor="red" {...props} onChange={onChange} />);
    fireEvent.click(container.getElementsByClassName('gio-toggles')[0]);
  });

  it('should return "false" when change on defaultChecked Toggles.', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggles defaultChecked suffixContent onChange={onChange} />);
    fireEvent.click(container.getElementsByClassName('gio-toggles')[0]);
    expect(container.getElementsByClassName('gio-toggles')).toBeTruthy();
  });

  it('toggles with suffixContent', () => {
    const { container } = render(<Toggles defaultChecked suffixContent />);
    expect(container.getElementsByClassName('gio-toggles-suffixContent')).toBeTruthy();
  });

  it('disabled equal to false', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggles disabled={false} checked onChange={onChange} />);
    fireEvent.click(container.getElementsByClassName('gio-toggles-checked')[0]);
    expect(container.getElementsByClassName('gio-toggles-checked')).toBeTruthy();
  });

  it('checked not equal to undefined', () => {
    const onChange = jest.fn();
    const { container } = render(<Toggles disabled checked onChange={onChange} />);
    fireEvent.click(container.getElementsByClassName('gio-toggles-checked')[0]);
    expect(container.getElementsByClassName('gio-toggles-checked')).toBeTruthy();
  });

  it('toggles component should be disabled', () => {
    const { container } = render(<Toggles disabled />);
    expect(container.getElementsByClassName('gio-toggles-disables')).toBeTruthy();
  });

  it('when users click the toggles component, it should be executed event function', () => {
    const onClick = jest.fn();
    const { container } = render(<Toggles checked onClick={onClick} />);
    fireEvent.click(container.getElementsByClassName('gio-toggles')[0]);
    expect(container.getElementsByClassName('gio-toggles')).toBeTruthy();
  });
});
