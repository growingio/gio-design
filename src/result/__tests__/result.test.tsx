import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import Result from ".."

describe('Testing Result ', () => {
  it('render result', () => {
    const { container, rerender } = render(<Result title="404" />);

    expect(container.querySelector('.gio-result-404')).toBeTruthy();
    rerender(<Result type="empty" />);
    expect(container.querySelector('.gio-result-empty')).toBeTruthy();
  });

  it('support size ', () => {
    const { container } = render(<Result size="small" />);

    expect(container.querySelector('.gio-result-small')).toBeTruthy();

  })
  it('support custom description and image ', () => {
    const { container } = render(<Result type="403" description={<span>Forbidden</span>} image={<img alt="403" src="" />} />);

    expect(container.querySelector('img[alt="403"]')).toBeTruthy();
  })
  it('support extra ', () => {
    const { container } = render(<Result type="403" extra={<a href="/">返回首页</a>} />);

    expect(container.querySelector('a')).toBeTruthy();
    expect(container.querySelector('a')).toHaveAttribute('href', '/');
  })
  it('support cta ', () => {
    const mockClick = jest.fn()
    const { container } = render(<Result type="403" cta={{ text: '返回首页', onClick: mockClick }} />);

    expect(container.querySelector('button')).toBeTruthy();
    expect(container.querySelector('button')).toHaveTextContent('返回首页');
    fireEvent.click(container.querySelector('button'));
    expect(mockClick).toHaveBeenCalled()
  });

  it('support children ', () => {
    const { container } = render(<Result type="403"><a href="/">返回首页</a></Result>);
    expect(container.querySelector('.gio-result__content')).toBeTruthy();
    expect(container.querySelector('a')).toBeTruthy();
    expect(container.querySelector('a')).toHaveAttribute('href', '/');
  })
})