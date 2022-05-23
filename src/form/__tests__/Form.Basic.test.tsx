import { render, screen } from '@testing-library/react';
import { FormInstance } from 'rc-field-form';
import React from 'react';
import Form from '..';
import { toArray } from '../util'

describe('Form', () => {

  it('support size', () => {
    const { container } = render(<Form size='small'>
      <Form.Item>{() => null}</Form.Item>
    </Form>)

    expect(container.querySelector('.gio-form-small')).toBeTruthy()
  })

  it('support layout', () => {
    const { container } = render(<Form layout="vertical">
      <Form.Item>{() => null}</Form.Item>
    </Form>)

    expect(container.querySelector('.gio-form-vertical')).toBeTruthy()
  });

  it('support colon when horizontal layout ', () => {
    const { container } = render(<Form colon layout="horizontal">
      <Form.Item label="name" name="name">{() => null}</Form.Item>
    </Form>)
    expect(container.querySelector('.gio-form-horizontal')).toBeTruthy();
    expect(container.querySelector('label[title="name"]')).toHaveTextContent('name：')
  })
  test('item label', () => {
    const { container, rerender } = render(<Form requiredMark="optional">
      <Form.Item labelWidth="200px" requiredMark="optional" label="name" title='title' name="name">{() => null}</Form.Item>
      <Form.Item required label="name" name="name" htmlFor='title'>{() => null}</Form.Item>
    </Form>)
    const labels = container.querySelectorAll('label')
    expect(labels[0]).toHaveAttribute('title', 'title');
    expect(labels[0]).toHaveAttribute('for', 'name');
    expect(labels[0].querySelector('.gio-field-label-marker')).toHaveTextContent(/选填/)

    expect(labels[1]).toHaveAttribute('title', 'name');
    expect(labels[1]).toHaveAttribute('for', 'title');

    rerender(<Form requiredMark >
      <Form.Item marker="$" required label="name" title='title' name="name">{() => null}</Form.Item>
      <Form.Item required label="name" name="name" htmlFor='title'>{() => null}</Form.Item>
    </Form>);
    expect(labels[0].querySelector('.gio-field-label-marker')).toHaveTextContent('$')
    expect(labels[1].querySelector('.gio-field-label-marker')).toHaveTextContent('*')
  })
  it('item control feedback', () => {
    const { container } = render(<Form >
      <Form.Item inputWidth="100%" feedbackType="error" feedback="名称不能为空" label="name" feedbackIcon={<span>-_-</span>} title='title' name="name">
        <input />
      </Form.Item>
    </Form>);
    // screen.debug()
    expect(container.querySelector('.gio-field-children-icon')).toBeTruthy();
    expect(screen.queryByText('名称不能为空')).toBeTruthy();
  })
  test('ref', () => {
    const formRef = React.createRef<FormInstance>();
    render(<Form requiredMark ref={formRef}>
      <Form.Item label="text" >
        text
      </Form.Item>
    </Form>);
    expect(formRef.current).toHaveProperty('resetFields');
    expect(formRef.current).toHaveProperty('submit')
  });

  test('render items', () => {
    const { container } = render(<Form>
      <Form.Item name="text" label="text" >
        text
      </Form.Item>
      <Form.Item name="null">
        {null}
      </Form.Item>
      <Form.Item name="false">
        {false}
      </Form.Item>
      <Form.Item name="1">
        {1}
      </Form.Item>
    </Form>);
    expect(container.querySelectorAll('.gio-field').length).toBe(4)
  });
  it('render items with help', () => {
    const { container } = render(
      <Form>
        <Form.Item help="good">
          <input />
        </Form.Item>
      </Form>,
    );
    expect(container.querySelector('.gio-field-has-help')).toBeTruthy();
    expect(container.querySelector('.gio-field-help')).toHaveTextContent('good');
  });

});


describe('form/util', () => {
  it('toArray', () => {
    expect(toArray(false)).toStrictEqual([]);
    expect(toArray([1])).toStrictEqual([1]);
    expect(toArray(undefined)).toStrictEqual([]);
    expect(toArray('A')).toStrictEqual(["A"])
  })
})