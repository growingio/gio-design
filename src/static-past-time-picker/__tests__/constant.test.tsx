import { experimentalQuickOptions } from '../constant';
import defaultLocaleText from '../locales/zh-CN';

describe('constant', () => {
  it('experimentalQuickOptions', () => {
    expect(experimentalQuickOptions({ okText: 'ok' } as typeof defaultLocaleText)[0].label).toBe(undefined);
  });
});
