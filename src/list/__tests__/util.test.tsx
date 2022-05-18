import React from 'react';

import { getResultValue, generateString, selectStatus, collectOption, collectOptions, convertNodeToOption, isMultipe, isCascader, isVaildFunctionCallBack, generateSelectParent } from '../util';
import Item from '../Item';
import List, { Selection } from '..';

describe('Testing List utils', () => {
  it('isMultipe,isCascader,isVaildFunctionCallBack', () => {
    expect(isMultipe('multiple')).toBe(true);
    expect(isCascader('cascader')).toBe(true);

    expect(isVaildFunctionCallBack({ value: '1' }, () => <span>A</span>)).toStrictEqual(<span>A</span>)
  })
  it('test getResultValue', () => {
    expect(getResultValue([1, 2], 1)).toStrictEqual([2]);

    expect(getResultValue(['1', '2'], '3')).toStrictEqual(['1', '2', '3'])

    expect(getResultValue([1, 2], 3)).toStrictEqual([1, 2]);
  })
  it('test selectStatus', () => {
    expect(selectStatus(null, 1)).toBe(false);

    expect(selectStatus('1', ['1', '2'])).toBe(true);

    expect(selectStatus('3', ['1', '2'])).toBe(false);
    expect(selectStatus('3', '1')).toBe(false);
    expect(selectStatus('1', '1')).toBe(true)
  });

  it('test generateString', () => {
    expect(generateString('1', [{ value: '1', items: [{ value: '1' }] }, { value: '2', items: [{ value: '2' }] }])).toBe('1.2.1.1');

    expect(generateString('1')).toBe('1');
    expect(generateString()).toBe('');

  });
  it('test collectOption', () => {
    expect(collectOption('test')).toBe(undefined);
    expect(collectOption(<Item label="1" value="1" suffix="B" prefix="A" />)).toStrictEqual({ label: '1', value: '1', prefix: 'A', suffix: 'B' })
  });
  it('test collectOptions', () => {
    expect(collectOptions(<Selection value="1">
      <List value="1">
        <Item label="1" value="1" suffix="B" prefix="A" />
        <Item label="2" value="2" suffix="B" prefix="A" />
      </List></Selection>))
      .toStrictEqual([
        { label: '1', value: '1', prefix: 'A', suffix: 'B' },
        { label: '2', value: '2', prefix: 'A', suffix: 'B' }
      ]);

    expect(collectOptions(<Selection value="1" options={[
      { label: '1', value: '1', prefix: 'A', suffix: 'B' },
      { label: '2', value: '2', prefix: 'A', suffix: 'B' }
    ]} />))
      .toStrictEqual([
        { label: '1', value: '1', prefix: 'A', suffix: 'B' },
        { label: '2', value: '2', prefix: 'A', suffix: 'B' }
      ]);

    expect(collectOptions(
      <List value="1" options={[
        { label: '1', value: '1', prefix: 'A', suffix: 'B' },
        { label: '2', value: '2', prefix: 'A', suffix: 'B' }
      ]} />))
      .toStrictEqual([
        { label: '1', value: '1', prefix: 'A', suffix: 'B' },
        { label: '2', value: '2', prefix: 'A', suffix: 'B' }
      ]);
  });

  it('convertNodeToOption', () => {
    expect(convertNodeToOption(<Item label="1" value="1" suffix={<span>B</span>} prefix={<span>A</span>} />)).toStrictEqual({ label: '1', value: '1', prefix: <span>A</span>, suffix: <span>B</span> })
  });
  it('generateSelectParent', () => {
    expect(generateSelectParent('1', '1', [{ value: 'A', label: 'A' }])).toStrictEqual([{ label: 'A', value: 'A', items: [{ label: '1', value: '1' }] }])
  })
})