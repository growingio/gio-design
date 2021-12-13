import React, { useContext, useEffect, useState } from 'react';
import Input from '../../../../../../../../../input'; // new
import Select from '../../../../../../../../../select'; // new
import { FilterPickerContext } from '../../../../../../../FilterPicker';

interface RelativeBetweenProps {
  onChange: (v: string) => void;
  attrSelect: string;
  values: string[];
}
function RelativeBetween(props: RelativeBetweenProps) {
  const { onChange, attrSelect, values } = props;
  const [nowOrFutureValue, setValue] = useState('-1');
  const [value1, setValue1] = useState<number>(1);
  const [value2, setValue2] = useState<number>(1);
  const { textObject: t } = useContext(FilterPickerContext);
  // 解析初始values值
  useEffect(() => {
    if (values.length && typeof values[0] === 'string') {
      const relativeTime = values[0].split(':')[1].split(',');
      if (parseInt(relativeTime[0], 10) < 0) {
        setValue('-1');
      } else {
        setValue('1');
      }
      setValue1(Math.abs(parseInt(relativeTime[0], 10)));
      setValue2(Math.abs(parseInt(relativeTime[1], 10)) || 1);
    }
  }, [values]);
  const createAttrValue = (v1: number, v2: number, nowOrFuture: string) => {
    let time = '';
    if (nowOrFuture === '-1') {
      time = `relativeTime:-${v1},-${v2}`;
    } else {
      time = `relativeTime:${v1},${v2}`;
    }
    onChange(time);
  };
  const setInputValue1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number.parseInt(event.target.value, 10);
    if (v && /^\d+$/.test(`${v}`)) {
      setValue1(v);
      createAttrValue(v, value2, nowOrFutureValue);
    } else if (!v) {
      setValue1(v);
      createAttrValue(0, value2, nowOrFutureValue);
    }
  };
  const setInputValue2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number.parseInt(event.target.value, 10);
    if (v && /^\d+$/.test(`${v}`)) {
      setValue2(v);
      createAttrValue(value1, v, nowOrFutureValue);
    } else if (!v) {
      setValue2(v);
      createAttrValue(value1, 0, nowOrFutureValue);
    }
  };

  const selectChange = (v: string) => {
    setValue(v);
    createAttrValue(value1, value2, v);
  };

  useEffect(() => {
    // values值的初始化设置
    if (!values.length) {
      createAttrValue(value1, value2, nowOrFutureValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrSelect]);

  if (t.code === 'en-US') {
    return (
      <>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Select
            value={nowOrFutureValue}
            options={[
              {
                value: '-1',
                label: `${t.within} ${t.past}`,
              },
              {
                value: '1',
                label: `${t.within} ${t.future}`,
              },
            ]}
            onChange={selectChange}
            style={{ marginRight: '4px' }}
            getContainer={(node) => node.parentNode as HTMLDivElement}
          />
          <Input.InputNumber
            value={value1}
            onChange={setInputValue1}
            style={{ width: '150px', margin: '0 4px' }}
            min={1}
          />
          <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>{t.to}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Input.InputNumber
            value={value2}
            onChange={setInputValue2}
            style={{ width: '150px', margin: '0 4px 0 0' }}
            min={1}
          />
          <div style={{ whiteSpace: 'nowrap', margin: '16px 4px' }}>{`${t.day}`}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Select
          value={nowOrFutureValue}
          options={[
            {
              value: '-1',
              label: t.past,
            },
            {
              value: '1',
              label: t.future,
            },
          ]}
          onChange={selectChange}
          style={{ marginRight: '4px' }}
          getContainer={(node) => node.parentNode as HTMLDivElement}
        />
        <Input.InputNumber
          value={value1}
          onChange={setInputValue1}
          style={{ width: '150px', margin: '0 4px' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>{t.to}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <Input.InputNumber
          value={value2}
          onChange={setInputValue2}
          style={{ width: '150px', margin: '0 4px 0 0' }}
          min={1}
        />
        <div style={{ whiteSpace: 'nowrap', margin: '16px 4px' }}>{`${t.day} ${t.within}`}</div>
      </div>
    </>
  );
}

export default RelativeBetween;
