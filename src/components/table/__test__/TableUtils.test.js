import { translateInnerColumns } from '../utils';

describe('Testing Table Utils', () => {
  test('translateInnerColumns function', () => {
    const translatedColumns = translateInnerColumns([
      {
        title: '测试dataIndex为数组的情况',
        dataIndex: ['a', 'b', 'c'],
      },
      {
        title: '测试dataIndex和key均为空的情况',
      },
      {
        title: '测试有children的情况',
        children: [
          {
            key: 'children',
            title: '我是children',
          },
        ],
      },
    ]);
    expect(translatedColumns[0].key).toBe('a-b-c');
    expect(translatedColumns[1].key).toBeUndefined();
    expect(translatedColumns[2].children[0].key).toBe('children');
  });
});
