/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { render } from '@testing-library/react';
import { ArrowRightOutlined } from '@gio-design/icons';
import Breadcrumbs from '../Breadcrumbs';

describe('<Breadcrumbs />', () => {
  test('The separator should be rendered a inaccessible list-item', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        <span>Home</span>
        <span>Page</span>
      </Breadcrumbs>
    );
    expect(getAllByRole('listitem', { hidden: false })).toHaveLength(2);
    expect(getByRole('list')).toHaveTextContent('Home/Page');
  });

  test('Should filter the undefined, null and empty string of child', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        {''}
        <span>Home</span>
        {undefined}
        <span>Page</span>
        {null}
      </Breadcrumbs>
    );
    expect(getAllByRole('listitem', { hidden: false })).toHaveLength(2);
    expect(getByRole('list')).toHaveTextContent('Home/Page');
  });

  test('Should be possible to customize the separator', () => {
    const { getAllByTestId, getByLabelText } = render(
      <>
        <Breadcrumbs separator="->">
          <span>Home</span>
          <span>Page</span>
        </Breadcrumbs>

        <Breadcrumbs separator={<ArrowRightOutlined />}>
          <span>Home</span>
          <span>Page</span>
        </Breadcrumbs>
      </>
    );

    expect(getAllByTestId('breadcrumbs')[0]).toHaveTextContent('Home->Page');
    expect(getByLabelText('arrow-right-outlined')).toBeInTheDocument();
  });

  test('DOM hierarchy should be rendered nav -> ol -> li', () => {
    const { container } = render(
      <Breadcrumbs>
        <span>Home</span>
        <span>Page</span>
      </Breadcrumbs>
    );
    expect(container.querySelectorAll('nav > ol > li')).toHaveLength(3);
  });
});
