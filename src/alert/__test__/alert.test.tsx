import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SuccessOutlined } from '@gio-design/icons';
import Alert from '../Alert';

describe('<Alert />', () => {
  test('Should render type alert', () => {
    const { getByTestId } = render(
      <>
        <Alert message="This is an info alert" type="info" data-testid="info-root" />
        <Alert message="This is an error alert" type="error" data-testid="error-root" />
        <Alert message="This is a success alert" type="success" data-testid="success-root" />
        <Alert message="This is a warning alert" type="warning" data-testid="warning-root" />
      </>
    );
    expect(getByTestId('info-root')).toHaveClass('gio-alert-info');
    expect(getByTestId('error-root')).toHaveClass('gio-alert-error');
    expect(getByTestId('success-root')).toHaveClass('gio-alert-success');
    expect(getByTestId('warning-root')).toHaveClass('gio-alert-warning');
  });

  test('Should render description and message', () => {
    const { getByTestId } = render(<Alert message="Message" description="Description" data-testid="alert-root" />);
    expect(getByTestId('alert-root')).toHaveTextContent('Message');
    expect(getByTestId('alert-root')).toHaveTextContent('Description');
  });

  test('Should render type icons', () => {
    const { getByTestId } = render(
      <>
        <Alert showIcon type={'non-existed' as any} data-testid="non-existed-root" />
        <Alert showIcon message="This is an info alert" type="info" data-testid="info-root" />
        <Alert showIcon message="This is an error alert" type="error" data-testid="error-root" />
        <Alert showIcon message="This is a success alert" type="success" data-testid="success-root" />
        <Alert showIcon message="This is a warning alert" type="warning" data-testid="warning-root" />
      </>
    );
    expect(getByTestId('info-root').querySelector('.gio-alert-icon [aria-label="info-filled"]')).toBeInTheDocument();
    expect(getByTestId('error-root').querySelector('.gio-alert-icon [aria-label="error-filled"]')).toBeInTheDocument();
    expect(
      getByTestId('success-root').querySelector('.gio-alert-icon [aria-label="success-filled"]')
    ).toBeInTheDocument();
    expect(
      getByTestId('warning-root').querySelector('.gio-alert-icon [aria-label="warning-filled"]')
    ).toBeInTheDocument();
  });

  test('Should can set custom icon', () => {
    const { getByTestId } = render(
      <Alert
        message="Success"
        description="This is a success alert"
        type="success"
        showIcon
        data-testid="success-root"
        icon={<SuccessOutlined />}
      />
    );

    expect(
      getByTestId('success-root').querySelector('.gio-alert-icon [aria-label="success-outlined"]')
    ).toBeInTheDocument();
  });

  test('Should to be closed', () => {
    const onClose = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Alert
        message="Info"
        description="This is an info alert"
        type="info"
        closeable
        onClose={onClose}
        data-testid="root"
      />
    );
    const button = getByTestId('root').querySelector('.gio-alert-closeButton');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalled();
    expect(queryByTestId('root')).not.toBeInTheDocument();
  });
});
