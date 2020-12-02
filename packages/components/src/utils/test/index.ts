/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import { act } from 'react-dom/test-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function waitForComponentToPaint(wrapper: any, amount = 500): Promise<void> {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}

export function waitAMoment(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}
