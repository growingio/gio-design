import React, { useState, useContext, useEffect, useCallback } from 'react';
import Input from '../../../../../../../input'; // new
import { FilterPickerContext } from '../../../../../FilterPicker';
import { useCallbackOnShow } from '../FilterAttrOverlay';

interface NumberAttrSelectProps {
  attrSelect: string;
  attrChange: (v: any) => void;
  values: string[];
  type?: 'positivedecimal' | 'decimal' | 'positiveInteger';
  visible?: boolean;
}

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
  if (typeLowCase === 'positiveinteger') {
    return /^[1-9]\d*$/.test(`${v}`);
  }
  return v === '-' || /^(-|\+)?[1-9]\d*?$/.test(`${v}`) || /^[0]$/.test(`${v}`);
};

// checkRegExp 校验传入的初始值是否符合标准
const isValid = (type: NumberAttrSelectProps['type'], values: string[]) =>
  values?.[0] && values?.[0] !== ' ' && checkRegExp(type, values[0]);

function NumberAttrSelect(props: NumberAttrSelectProps) {
  const { textObject: t } = useContext(FilterPickerContext);
  const { attrSelect, attrChange, values, type, visible } = props;
  const defaultValue = type === 'positiveInteger' ? '1' : '0';
  const [value, setValue] = useState<number | string>(values?.[0] ? parseFloat(values?.[0]) : Number(defaultValue));
  const [value1, setValue1] = useState<number | string>(values?.[0] ? parseFloat(values?.[0]) : Number(defaultValue));
  const [value2, setValue2] = useState<number | string>(values?.[1] ? parseFloat(values?.[1]) : Number(defaultValue));

  // 初始化attrValue值
  const setAttrSelectValue = useCallback(
    (_values: string[]) => {
      // checkRegExp 校验传入的初始值是否符合标准
      const num = isValid(type, _values) ? _values?.[0] : defaultValue;
      setValue(parseFloat(_values?.[0]) || Number(defaultValue));
      setValue1(parseFloat(_values?.[0]) || defaultValue);
      setValue2(Number.isNaN(parseFloat(_values?.[1])) ? num : parseFloat(values?.[1]));
      if (attrSelect === 'between' || attrSelect === 'not between') {
        attrChange([num, values?.[1] || num]);
      } else {
        attrChange([num]);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [attrSelect, type]
  );

  // 初始化attrValue值
  useEffect(() => {
    setAttrSelectValue(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAttrSelectValue]);

  useCallbackOnShow(visible, () => {
    if (isValid(type, values)) {
      setAttrSelectValue(values);
    }
  });

  const setValue1Number = (val: React.ChangeEvent<HTMLInputElement>) => {
    const v = val.target.value;
    if (v && checkRegExp(type, v)) {
      setValue1(v);
      if (v !== '-') {
        attrChange([v, value2]);
      }
    } else if (!v) {
      setValue1(v);
      attrChange([defaultValue, value2]);
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
      attrChange([defaultValue]);
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
      attrChange([value1, defaultValue]);
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
