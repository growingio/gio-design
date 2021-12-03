import { DATE_FORMAT, experimentalQuickOptions } from '../constant';
import defaultLocaleText from '../locales/zh-CN';

describe('StaticPastTimePicker constant', () => {
  it('has date format', () => {
    expect(DATE_FORMAT).toBe('yyyy/MM/dd');
  });

  it('has experimental shortcut options', () => {
    expect(experimentalQuickOptions(defaultLocaleText)).toHaveLength(2);
    expect(experimentalQuickOptions(defaultLocaleText)[0]).toHaveLength(2);
    expect(experimentalQuickOptions(defaultLocaleText)[1]).toHaveLength(1);
    experimentalQuickOptions(defaultLocaleText).forEach((os) => {
      os.forEach((o) => {
        expect(o.value.startsWith('hour:')).toBeTruthy();
      });
    });
  });
});
