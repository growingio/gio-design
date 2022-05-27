import React from 'react';
import { render } from '@testing-library/react';
import Card from '../Card';

describe('<Card />', () => {
  test('Should show elevation when raise', () => {
    const { getByTestId } = render(<Card />);
    expect(getByTestId('card')).toHaveClass('gio-card-clickable');
  });

  test('Should not show elevation when raise', () => {
    const { getByTestId } = render(<Card clickable={false} />);
    expect(getByTestId('card')).not.toHaveClass('gio-card-clickable');
  });

  test('Should render a disabled card', () => {
    const { getByTestId } = render(<Card disabled />);
    expect(getByTestId('card')).toHaveClass('gio-card-disabled');
  });

  test('Should render a card without padding', () => {
    const { getByTestId } = render(<Card fullWidthContent />);
    expect(getByTestId('card')).toHaveClass('gio-card-full-width-content');
  });

  test('Should render a card with box-shadow', () => {
    const { getByTestId } = render(<Card boxShadow />);
    expect(getByTestId('card')).toHaveClass('gio-card-box-shadow');
  });
});
