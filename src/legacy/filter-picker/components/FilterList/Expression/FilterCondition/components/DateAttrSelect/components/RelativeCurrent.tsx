import React, { useEffect, useState } from 'react';
import Input from '../../../../../../../../../input'; // new
import Select from '../../../../../../../../../select'; // new

interface RelativeCurrentProps {
  onChange: (v: string) => void;
  attrSelect: string;
  values: string[];
}

function RelativeCurrent(props: RelativeCurrentProps) {
  const { onChange, attrSelect, values } = props;
  const [nowOrFuturevalue, setValue] = useState('-1');
  const [inOrOutValue, setAfterValue] = useState('-1');
  const [days, setDays] = useState<number>(1);
  const SelectOptions = [
    {
      value: '-1',
      label: '过去',
    },
    {
      value: '1',
      label: '未来',
    },
  ];
  const beforeSelectOptions = [
    {
      value: '-1',
      label: '之内',
    },
    {
      value: '1',
      label: '之前',
    },
  ];
  const afterSelectOptions = [
    {
      value: '-1',
      label: '之内',
    },
    {
      value: '1',
      label: '之后',
    },
  ];
  // 解析初始值
  useEffect(() => {
    if (values.length && typeof values[0] === 'string') {
      const relativeTime = values[0].split(':')[1].split(',');
      if (parseInt(relativeTime[0], 10) < 0) {
        setValue('-1');
      } else {
        setValue('1');
      }
      if (relativeTime.includes('0')) {
        setAfterValue('-1');
      } else {
        setAfterValue('1');
      }
      if (parseInt(relativeTime[0], 10)) {
        setDays(Math.abs(parseInt(relativeTime[0], 10)));
      } else {
        setDays(Math.abs(parseInt(relativeTime[1], 10)));
      }
    }
  }, [values]);
  const createAttrValue = (dayValue: number, value: string, afterValue: string) => {
    // 在此处，返回的数据有两种格式
    // 当选择过去| 未来 + 之内，则返回relativeTime：（number):（number）
    // 当选择过去| 未来 + 之前| 之后，则返回relativeTime: (number)
    let t = '';
    if (afterValue === '-1') {
      t = value === '-1' ? `-${dayValue},0` : `0,${dayValue}`;
    } else {
      t = value === '-1' ? `-${dayValue}` : `${dayValue}`;
    }
    onChange(`relativeTime:${t}`);
  };

  useEffect(() => {
    // values值的初始设置
    if (!values.length) {
      createAttrValue(days, nowOrFuturevalue, inOrOutValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrSelect]);
  const selectChange = (v: string) => {
    v && setValue(v);
    v && createAttrValue(days, v, inOrOutValue);
  };
  const selectAfterChange = (v: string) => {
    v && setAfterValue(v);
    v && createAttrValue(days, nowOrFuturevalue, v);
  };

  const setDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number.parseInt(event.target.value, 10);
    if (v && /^[1-9]\d*$/.test(`${v}`)) {
      setDays(v);
      createAttrValue(v, nowOrFuturevalue, inOrOutValue);
    } else if (!v) {
      setDays(v);
      createAttrValue(0, nowOrFuturevalue, inOrOutValue);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Select
        value={nowOrFuturevalue}
        options={SelectOptions}
        onChange={selectChange}
        style={{ marginRight: '4px', width: '90px' }}
      />
      <Input.InputNumber value={days} onChange={setDaysChange} style={{ width: '80px', margin: '0 4px' }} min={1} />
      <div style={{ whiteSpace: 'nowrap', margin: '0 4px' }}>天</div>
      {nowOrFuturevalue === '-1' ? (
        <Select
          key="beforeSelect"
          value={inOrOutValue}
          options={beforeSelectOptions}
          onChange={selectAfterChange}
          style={{ marginLeft: '4px', width: '85px' }}
        />
      ) : (
        <Select
          key="afterSelect"
          value={inOrOutValue}
          options={afterSelectOptions}
          onChange={selectAfterChange}
          style={{ marginLeft: '4px', width: '85px' }}
        />
      )}
    </div>
  );
}

export default RelativeCurrent;
