import { render, screen } from '@testing-library/react';
import React from 'react';
import Tabs from '..';

describe('Testing Tabs', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Tab key={1} label="tab1" value={1}>
          <div>content1</div>
        </Tabs.Tab>
        <Tabs.Tab key={2} label="tab2" value={2}>
          <div>content2</div>
        </Tabs.Tab>
      </Tabs>
    );
    expect(container.querySelector('.gio-tabs')).toBeInTheDocument();
    expect(container.querySelectorAll('.gio-tabs-tablist-button').length).toBe(2);
  });
});
