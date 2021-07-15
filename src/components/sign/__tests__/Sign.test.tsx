import React from 'react';
import { render } from '@testing-library/react';
import { Default, DotSign } from '../Sign.stories';
import Sign from '../index';

describe('Testing sign', () => {
  it('basic sign', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.getElementsByClassName('gio-sign')).toHaveLength(4);
  });

  it('dot sign', () => {
    const { container } = render(<DotSign {...DotSign.args} />);
    expect(container.getElementsByClassName('gio-sign__dot')).toHaveLength(4);
  });

  it('number sign', () => {
    const { container } = render(
      <Sign count={99} magnitude={100} variant="number" placement="rightBottom">
        <span>正常</span>
      </Sign>
    );
    expect(container.getElementsByClassName('gio-sign__number')).toHaveLength(1);
  });

  it('number sign width different placement', () => {
    const { container } = render(
      <>
        <Sign count={99} magnitude={100} variant="number" placement="top">
          <span>正常</span>
        </Sign>
        <Sign count={99} magnitude={100} variant="number" placement="right">
          <span>正常</span>
        </Sign>
        <Sign count={99} magnitude={100} variant="number" placement="bottom">
          <span>正常</span>
        </Sign>
        <Sign count={99} magnitude={100} variant="number" placement="left">
          <span>正常</span>
        </Sign>
        <Sign count={99} magnitude={100} variant="number" placement="leftTop">
          <span>正常</span>
        </Sign>
      </>
    );
    expect(container.getElementsByClassName('gio-sign__number')).toHaveLength(5);
  });

  it('number sign width error placement', () => {
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Sign count={99} magnitude={100} variant="number" status="warning" placement="error">
        <span>已禁用</span>
      </Sign>
    );
    expect(container.getElementsByClassName('gio-sign__number')).toHaveLength(1);
  });
});
