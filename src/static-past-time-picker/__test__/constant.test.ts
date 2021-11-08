import { DATE_FORMAT, experimentalQuickOptions } from '../constant';

describe('StaticPastTimePicker constant', () => {
  it('has date format', () => {
    expect(DATE_FORMAT).toBe('yyyy/MM/dd');
  });

  it('has experimental shortcut options', () => {
    expect(experimentalQuickOptions).toHaveLength(2);
    expect(experimentalQuickOptions[0]).toHaveLength(2);
    expect(experimentalQuickOptions[1]).toHaveLength(1);
    experimentalQuickOptions.forEach((os) => {
      os.forEach((o) => {
        expect(o.value.startsWith('hour:')).toBeTruthy();
      });
    });
  });
});
