import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

/**
 * Functional Test Case of Button
 *
 * 1. 正确渲染 size='small' 的样式；
 * 2. 正确渲染 size='normal' 的样式；
 * 3. 正确渲染 type='primary' 的样式；
 * 4. 正确渲染 type='secondary' 的样式；
 * 5. 正确渲染 type='text' 的样式；
 * 6. 传入 prefix 时应该正确渲染 prefix 的样式；
 * 7. 传入 suffix 时应该正确渲染 suffix 的样式；
 * 8. 正确渲染 disabled=true 的样式；
 * 9. 当 loading=true 时，会在 prefix 的位置上出现载入中的图标（替换原有的 prefix）；
 * 10. 当 loading=true 时，应该是 disabled 状态；
 * 11. data-testid 的默认值应该是 'button'；
 * 12. type 的默认值应该是 primary；
 * 13. size 的默认值应该是 normal；
 * 14. loading 的默认值应该是 false；
 * 15. disabled 的默认值应该是 false；
 * 16. htmlType 的默认值应该是 button；
 */

const buttonTestId = 'button';

describe('<Button />', () => {
  it('can render a small button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByTestId(buttonTestId);
    expect(button).toHaveStyle({
      padding: '4px 12px',
      height: '36px',
    });
  });

  it('can render a normal button');

  it('can render a primary button');
  it('can render a secondary button');
  it('can render a text button');
  it('can render a button by prefix');
  it('can render a button by suffix');
  it('can render a disabled primary button');
  it('can render a disabled secondary button');
  it('can render a disabled text button');
  it('the correct style of a primary button should be rendered when hovering');
  it('the correct style of a secondary button should be rendered when hovering');
  it('the correct style of a text button should be rendered when hovering');
  it('there will be a loading style when loading');

  it('should be disabled when loading');

  it('the default value of `data-testid` prop should be equal to `button`');
  it('the default value of `type` prop should be equal to `primary`');
  it('the default value of `htmlType` prop should be equal to `button`');
  it('the default value of `size` prop should be equal to `normal`');
  it('the default value of `loading` prop should be equal to `false`');
  it('the default value of `disabled` prop should be equal to `false`');
});
