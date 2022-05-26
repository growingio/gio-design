import React from 'react';
import { render } from '@testing-library/react';
import { PlusOutlined } from '@gio-design/icons';
import Button from '../Button';
import IconButton from '../IconButton';

describe('<Button />', () => {
  test('Should render different types of buttons', () => {
    const { getAllByTestId } = render(
      <>
        <Button type="primary">Primary</Button>
        <Button type="secondary">Secondary</Button>
        <Button type="text">Text</Button>
      </>
    );
    const buttons = getAllByTestId('button');
    expect(buttons[0]).toHaveClass('gio-button_primary');
    expect(buttons[1]).toHaveClass('gio-button_secondary');
    expect(buttons[2]).toHaveClass('gio-button_text');
  });

  test('Should render different sizes of buttons', () => {
    const { getAllByRole } = render(
      <>
        <Button size="normal">Normal</Button>
        <Button size="small">Small</Button>
      </>
    );
    const buttons = getAllByRole('button');
    expect(buttons[0]).toHaveClass('gio-button_normal');
    expect(buttons[1]).toHaveClass('gio-button_small');
  });

  test('Should render a disabled button', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
    expect(getByRole('button')).toHaveClass('gio-button_disabled');
  });

  test('Should render a loading button with disabled', () => {
    const { getByRole } = render(<Button loading>Loading</Button>);
    expect(getByRole('button')).toBeDisabled();
    expect(getByRole('button')).toHaveClass('gio-button_loading');
    expect(getByRole('img')).toHaveAttribute('aria-label', 'loading-two-tone');
  });

  test('Should render buttons with a prefix or suffix icon', () => {
    const { getAllByRole } = render(
      <>
        <Button prefix={<PlusOutlined />}>Prefix</Button>
        <Button suffix={<PlusOutlined />}>Suffix</Button>
      </>
    );
    const buttons = getAllByRole('button');
    expect(buttons[0].firstElementChild).toHaveClass('gio-button-prefix-icon');
    expect(buttons[1].firstElementChild).toHaveClass('gio-button-suffix-icon');
  });

  test('Should render a button with a active status', () => {
    const { getByRole } = render(<Button active>Active</Button>);
    expect(getByRole('button')).toHaveClass('gio-button_active');
  });

  test('Should render a submit button or reset button', () => {
    const { getByText } = render(
      <>
        <Button htmlType="submit">Submit</Button>
        <Button htmlType="reset">Reset</Button>
      </>
    );
    expect(getByText('Submit')).toHaveAttribute('type', 'submit');
    expect(getByText('Reset')).toHaveAttribute('type', 'reset');
  });
});

describe('<Button.IconButton />', () => {
  test('Should render a icon button', () => {
    const { getByRole } = render(
      <IconButton>
        <PlusOutlined />
      </IconButton>
    );

    expect(getByRole('button')).toHaveClass('gio-icon-button');
  });
});
