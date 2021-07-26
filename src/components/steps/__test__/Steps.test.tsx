import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DefaultSteps, ClickableSteps, NotDescSteps, CustomStateSteps } from '../Steps.stories'
import Steps, { Step } from '..';

describe('Steps', () => {
  const stepItemClassName = 'gio-steps__item';
  const stepItemActiveClassName = 'gio-steps__item_active';

  it('render default', () => {
    const { container } = render(<DefaultSteps {...DefaultSteps.args} />)
    expect(container.getElementsByClassName(stepItemClassName)).toHaveLength(4)
  })

  it('render clickable', () => {
    const { getAllByRole, container } = render(<ClickableSteps {...ClickableSteps.args} />)
    const items = container.getElementsByClassName(stepItemClassName)
    expect(
      items[0].classList.contains(stepItemActiveClassName)
    ).toBe(true)

    expect(getAllByRole('button')).toHaveLength(3)

    fireEvent.click(getAllByRole('button')[0])

    expect(
      items[1].classList.contains(stepItemActiveClassName)
    ).toBe(true)

  })

  it('render not description', () => {
    const { container } = render(<NotDescSteps {...NotDescSteps.args} />)
    expect(
      container.getElementsByClassName('gio-steps__item-content-description')
    ).toHaveLength(0)
  })

  it('render custom state', () => {
    const { container, getByText } = render(<CustomStateSteps {...CustomStateSteps.args} />)
    fireEvent.click(getByText('下一步'))
    fireEvent.click(getByText('上一步'))
    expect(
      container
        .getElementsByClassName(stepItemActiveClassName)[0]
        .classList.contains('gio-steps__item_finished')
    ).toBe(true)
  })

  it('render null children', () => {
    const { container } = render(<Steps>{null}</Steps>)
    expect(
      container.getElementsByClassName(stepItemClassName)
    ).toHaveLength(0)
  })

  it('render with `current` prop equal -1', () => {
    const { getAllByText } = render(<Steps current={-1}>
      <Step key="1" title="title1" />
      <Step key="2" title="title2" />
    </Steps>)
    expect(getAllByText(/title/)).toHaveLength(2)
  })

  it('render step', () => {
    const { getByText } = render(<Step title="Title" />)
    expect(getByText('Title')).toBeTruthy()
  })
})
