import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Empty from '../Empty';
import DashboardImage from './DashboardImage';

describe('Empty', () => {
  it('has default images', () => {
    expect(Empty.NO_DATA_IMAGE).not.toBeNull();
    expect(Empty.NO_RESULT_IMAGE).not.toBeNull();
  });

  it('renders with default props', () => {
    render(<Empty />);
    expect(screen.queryByTitle('No data image')).toBeTruthy();
    expect(screen.queryByText('No data')).toBeTruthy();
  });

  it('can render with small size', () => {
    const { container } = render(<Empty size="small" />);
    expect(container.getElementsByClassName('gio-empty--small')).toBeTruthy();
  });

  it('can render no result image', () => {
    render(<Empty image="no-result" description="No result" />);
    expect(screen.queryByTitle('No result image')).toBeTruthy();
    expect(screen.queryByText('No result')).toBeTruthy();
  });

  it('can render the call to action', () => {
    const handleAction = jest.fn();
    render(<Empty cta={{ text: 'Create', onClick: handleAction }} />);
    expect(screen.queryByText('Create')).toBeTruthy();
    fireEvent.click(screen.getByText('Create'));
    expect(handleAction).toHaveBeenCalled();
  });

  it('also can render custom image', () => {
    render(<Empty image={<DashboardImage />} />);
    expect(screen.queryByText('Dashboard image')).toBeTruthy();
  });
});
