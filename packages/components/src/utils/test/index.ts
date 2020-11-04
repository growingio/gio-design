import { act } from 'react-dom/test-utils';

export async function waitForComponentToPaint(wrapper: any, amount = 500) {
  await act(async () => new Promise((resolve) => setTimeout(resolve, amount)).then(() => wrapper.update()));
}
