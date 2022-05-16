import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import TextArea from '../TextArea';

describe('testing TextArea', () => {
  it('render textarea element', () => {
    const { container } = render(<TextArea />);
    expect(container.querySelector('textarea')).toBeTruthy();
    expect(container.querySelector('[data-testid="input-textarea"]')).toBeTruthy();
    expect(container.querySelector('textarea')).toHaveStyle({ 'resize': 'none' })
  });

  it('should support rows property', () => {
    const { container } = render(<TextArea rows={3} />);
    expect(container.querySelector('textarea[rows="3"]')).toBeTruthy();
  });
  it('can set style.resize  when not disabled', () => {
    const { container } = render(<TextArea rows={3} style={{ resize: 'both' }} />);
    expect(container.querySelector('textarea')).toHaveStyle({ 'resize': 'both' })
  });
  it('should not resize when disabled', () => {
    const { container } = render(<TextArea disabled rows={3} style={{ resize: 'both' }} />);
    expect(container.querySelector('.gio-textarea__disabled')).toBeTruthy();
    expect(container.querySelector('textarea')).toHaveStyle({ 'resize': 'none' })
  });
  it('should limit correctly when set maxLength', async () => {
    const Demo = () => {
      const [val, setVal] = React.useState('');
      return <TextArea maxLength={5} value={val} onChange={e => {
        setVal(e.target.value);
      }} />;
    };

    render(<Demo />);
    const input = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(input.maxLength).toBe(5)
    const text = 'loong';

    fireEvent.change(input, { target: { value: text } });
    await userEvent.type(input, `${text}!`)
    expect(input.value).toBe(text);
    expect(input.value.length).toBe(5);

  });
});
