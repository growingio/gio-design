import React, { useEffect, useState, useContext } from 'react';
import Input from '../../../../../../../input'; // new
import { FilterPickerContext } from '../../../../../FilterPicker';

interface NumberAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
  type?: 'positivedecimal' | 'decimal';
}
function NumberAttrSelect(props: NumberAttrSelectProps) {
  const { textObject: t } = useContext(FilterPickerContext);
  const { attrSelect, attrChange, values, type } = props;
  const [value, setValue] = useState<number | string>(values?.[0] ? parseFloat(values?.[0]) : 0);
  const [value1, setValue1] = useState<number | string>(values?.[0] ? parseFloat(values?.[0]) : 0);
  const [value2, setValue2] = useState<number | string>(values?.[1] ? parseFloat(values?.[1]) : 0);

  // 初始化attrValue值
  useEffect(() => {
    const num = values?.[0] && values?.[0] !== ' ' ? values?.[0] : '0';
    setValue(parseFloat(values?.[0]) || 0);
    setValue1(parseFloat(values?.[0]) || '0');
    setValue2(Number.isNaN(parseFloat(values?.[1])) ? num : parseFloat(values?.[1]));
    if (attrSelect === 'between' || attrSelect === 'not between') {
      attrChange([num, values?.[1] || num]);
    } else {
      attrChange([num]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attrSelect]);

  const checkRegExp = (numType: string | undefined, v: string) => {
    const typeLowCase = numType?.toLowerCase();
    // if (typeLowCase === 'integer') {
    //   return /^(-|\+)?\d?$/.test(`${v}`);
    // }
    if (typeLowCase === 'positivedecimal') {
      return /^[1-9]\d*(\.)?(\d+)?$/.test(`${v}`) || /^[0]$/.test(`${v}`) || /^[0](\.)(\d+)?$/.test(`${v}`);
    }

    if (typeLowCase === 'decimal') {
      return (
        v === '-' ||
        /^((-[1-9]\d*(\.)?(\d+)?)|(0+(\.)?(0+)?))$/.test(`${v}`) ||
        /^[1-9]\d*(\.)?(\d+)?$/.test(`${v}`) ||
        /^(-[0])$/.test(`${v}`) ||
        /^-[0](\.)(\d+)?$/.test(`${v}`) ||
        /^[1-9]\d*(\.)?(\d+)?$/.test(`${v}`) ||
        /^[0]$/.test(`${v}`) ||
        /^[0](\.)(\d+)?$/.test(`${v}`)
      );
    }
    return v === '-' || /^(-|\+)?[1-9]\d*?$/.test(`${v}`) || /^[0]$/.test(`${v}`);
  };

  const setValue1Number = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if (v && checkRegExp(type, v)) {
      setValue1(v);
      if (v !== '-') {
        attrChange([v, value2]);
      }
    } else if (!v) {
      setValue1(v);
      attrChange(['0', value2]);
    }
  };

  // 设置数值
  const setNumberValue = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if (v && checkRegExp(type, v)) {
      setValue(v);
      attrChange([v]);
    } else if (!v) {
      setValue(v);
      attrChange(['0']);
    }
  };
  // 设置区间方法
  const setBetweenNumberValue = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if (v && checkRegExp(type, v)) {
      setValue2(v);
      attrChange([value1, v]);
    } else if (!v) {
      setValue2(v);
      attrChange([value1, '0']);
    }
  };

  switch (attrSelect) {
    case 'between':
    case 'not between':
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input value={value1} onChange={setValue1Number} />
          <div style={{ margin: '0 16px' }}>{t.and}</div>
          <Input value={value2} onChange={setBetweenNumberValue} />
        </div>
      );
    case 'hasValue':
    case 'noValue':
      return null;
    default:
      return <Input value={value} style={{ width: '100%' }} onChange={setNumberValue} />;
  }
}

export default NumberAttrSelect;
