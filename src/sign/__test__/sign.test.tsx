import React from 'react';
import { render } from '@testing-library/react';
import Sign, { TPlacement } from '../Sign';
import { getOffsetByPlacement } from '../SignNumber';

describe('<Sign />', () => {
  test('Should render a sign with count', () => {
    const { getByTestId } = render(<Sign count={10} magnitude={100} />);
    expect(getByTestId('sign')).toHaveTextContent('10');
  });

  test('Should render a default sigh', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { getByTestId } = render(<Sign />);
    expect(getByTestId('sign')).toHaveTextContent('0');
  });

  test('Should render a sign with max count', () => {
    const { getByTestId } = render(<Sign count={20} magnitude={10} />);
    expect(getByTestId('sign')).toHaveTextContent('9+');
  });

  test('Should render an offset sign', () => {
    const { getByTestId } = render(<Sign count={9} magnitude={10} offset={[10, 10]} />);
    expect(getByTestId('sign')).toHaveStyle({ right: '-10px', top: '-10px' });
  });

  test('Should render a sign with placement', () => {
    const { getByTestId } = render(
      <Sign count={10} magnitude={100} placement="leftTop">
        <div />
      </Sign>
    );
    expect(getByTestId('sign')).toHaveClass('gio-sign--left-top');
  });

  test('Should render a hide sign', () => {
    const { getByTestId } = render(<Sign count={10} magnitude={100} visible={false} />);
    expect(getByTestId('sign')).toHaveClass('gio-sign--hide');
  });

  test('Should render a hide sigh if count is zero', () => {
    const { getByTestId } = render(<Sign count={0} magnitude={100} />);
    expect(getByTestId('sign')).toHaveClass('gio-sign--hide');
  });

  test('Should render a sign with count if count is zero', () => {
    const { getByTestId } = render(<Sign count={0} magnitude={100} showZero />);
    expect(getByTestId('sign')).not.toHaveClass('gio-sign--hide');
  });
});

test('getOffsetByPlacement()', () => {
  const offset: [number, number] = [0, 0];
  expect(getOffsetByPlacement('top', offset)).toEqual({
    left: `calc(50% + ${offset[0]}px)`,
    top: `-${offset[1]}px`,
  });
  expect(getOffsetByPlacement('right', offset)).toEqual({
    right: `-${offset[0]}px`,
    top: `calc(50% - ${offset[1]}px)`,
  });
  expect(getOffsetByPlacement('bottom', offset)).toEqual({
    left: `calc(50% + ${offset[0]}px)`,
    bottom: `${offset[1]}px`,
  });
  expect(getOffsetByPlacement('left', offset)).toEqual({
    left: `${offset[0]}px`,
    top: `calc(50% - ${offset[1]}px)`,
  });
  expect(getOffsetByPlacement('leftTop', offset)).toEqual({
    left: `${offset[0]}px`,
    top: `-${offset[1]}px`,
  });
  expect(getOffsetByPlacement('leftBottom', offset)).toEqual({
    left: `${offset[0]}px`,
    bottom: `${offset[1]}px`,
  });
  expect(getOffsetByPlacement('rightTop', offset)).toEqual({
    right: `-${offset[0]}px`,
    top: `-${offset[1]}px`,
  });
  expect(getOffsetByPlacement('rightBottom', offset)).toEqual({
    right: `-${offset[0]}px`,
    bottom: `${offset[1]}px`,
  });
  expect(getOffsetByPlacement('fake' as unknown as TPlacement, offset)).toEqual({});
});
