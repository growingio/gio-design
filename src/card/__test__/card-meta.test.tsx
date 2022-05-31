import React from 'react';
import { render } from '@testing-library/react';
import CardMeta from '../CardMeta';

describe('<Card.Meta />', () => {
  test('Should render a title and description', () => {
    const { getByTitle } = render(<CardMeta title="title" description="description" />);
    expect(getByTitle('title')).toHaveTextContent('title');
    expect(getByTitle('description')).toHaveTextContent('description');
  });

  test('Should render an image', () => {
    const { getAllByRole, getByAltText } = render(
      <>
        <CardMeta image="/fake.jpeg" />
        <CardMeta image={<img src="/fake.jpeg" alt="This is a fake img" />} />
      </>
    );
    expect(getAllByRole('img')[0]).toBeInTheDocument();
    expect(getByAltText('This is a fake img')).toBeInTheDocument();
  });

  test('Should render action', () => {
    const { getByRole } = render(<CardMeta title="title" action={<button type="button">More</button>} />);
    expect(getByRole('button')).toHaveTextContent('More');
  });
});
