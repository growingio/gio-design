import React from 'react';
import { render } from '@testing-library/react';
import { Default as BatchActions } from '../batchActions.stories';

describe.skip('Render BatchActions with default args', () => {
  it('should render actions', () => {
    const wrapper = render(<BatchActions />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render batchActions', () => {
    const onClose = jest.fn();
    const wrapper = render(<BatchActions count={1} onClose={onClose} />);
    expect(wrapper).toMatchSnapshot();
  });
});
