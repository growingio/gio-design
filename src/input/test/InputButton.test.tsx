import React from 'react';
import { render } from '@testing-library/react';
import InputButton from '../InputButton';

describe('InputButton', () => {
  test('should have loading class', () => {
    const { container } = render(<InputButton loading />);
    expect(container.querySelector('.gio-input-btn__loading')).not.toBeNull();
  });
});
