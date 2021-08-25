import { act } from 'react-dom/test-utils';
import { set } from 'lodash';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import SingleMenu from '../single-menu';

describe('<SingleMenu />', () => {
  it("should align to window's bottom", () => {
    const useRefSpy = jest.spyOn(React, 'useRef');
    set(window, 'innerHeight', 0);
    const dataSource = [{ label: 'a', value: 1, children: [{ label: 'b', value: 2 }] }];
    const parent = { getBoundingClientRect: () => ({ bottom: 11 }) };
    const props = {
      parentMenu: parent,
      dataSource,
    } as any;
    render(<SingleMenu {...props} />);

    act(() => {
      fireEvent.click(screen.getAllByRole('button')[0]);
    });

    expect(useRefSpy).toBeCalled();
  });

  it('should render a empty tips', () => {
    const dataSource = [{ label: 'a', value: 1 }];
    const { container } = render(<SingleMenu depth={0} keyword="b" dataSource={dataSource} />);

    expect(container.getElementsByClassName('cascader-menu-empty-tip')).toHaveLength(1);
  });
});
