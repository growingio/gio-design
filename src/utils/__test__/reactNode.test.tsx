import React from 'react';
import { replaceElement, cloneElement } from '../reactNode';

describe('replaceElement()', () => {
  it('Should replace element', () => {
    const r = replaceElement('', <div key="key1" />, { key: 'key2', 'aria-label': 'test' }) as React.ReactElement;
    expect(r.type).toBe('div');
    const r2 = replaceElement(<div key="key1" />, '', { key: 'key2', 'aria-label': 'test' }) as React.ReactElement;
    expect(r2.key).toBe('key2');
    expect(r2.props['aria-label']).toBe('test');
    const r3 = replaceElement(<div key="key3" />, '', () => ({
      key: 'key2',
      'aria-label': 'test',
    })) as React.ReactElement;
    expect(r3.key).toBe('key2');
    expect(r3.props['aria-label']).toBe('test');
  });
});

describe('cloneElement', () => {
  it('Should clone element', () => {
    const r = cloneElement(<div key="key1" />, { key: 'key2', 'aria-label': 'test' });
    expect(r.type).toBe('div');
    expect(r.key).toBe('key2');
    expect(r.props['aria-label']).toBe('test');
  });
});
