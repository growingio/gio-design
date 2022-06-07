import { getFlattenOptions } from '../util';

describe('test util', () => {
  const selectionOptions = [
    {
      label: `List Item 1`,
      value: '1',
      disabled: false,
      groupId: '1',
      groupName: 'group1',
    },
    {
      label: `List Item 3`,
      value: '3',
      disabled: false,
      groupId: '1',
      groupName: 'group1',
    },
    {
      label: `List Item 2`,
      value: '2',
      disabled: false,
      groupId: '2',
      groupName: 'group2',
    },
  ];

  it('getFlattenOptions', () => {
    const flattenOptions = getFlattenOptions(selectionOptions, true);
    const withOutSelection = getFlattenOptions(selectionOptions);
    expect(withOutSelection).toBeTruthy();
    expect(flattenOptions).toBeTruthy();
  });
});
