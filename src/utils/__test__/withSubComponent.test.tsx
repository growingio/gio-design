import React from 'react';
import withSubComponent from '../withSubComponent';

describe('withSubComponent.ts', () => {
  it('Should be with sub components', () => {
    const FC: React.FC = () => null;
    const SubComponent: React.FC = () => null;
    const result = withSubComponent(FC, { SubComponent });
    expect(result).toBe(FC);
    expect(result.SubComponent).toBe(SubComponent);
  });
});
