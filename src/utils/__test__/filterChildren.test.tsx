import React from 'react';
import filterChildren from '../filterChildren';

describe('filterChildren.ts', () => {
  it('basic', () => {
    const instance = (
      <div>
        <span />
        <p />
        <span />
      </div>
    );
    const result = filterChildren(instance.props.children, (child: React.ReactElement) => {
      if (child.type === 'p') return false;
      return true;
    }) as React.ReactElement[];
    result.forEach((item) => {
      expect(item.type).toBe('span');
    });
  });
});
