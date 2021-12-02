import React, { useEffect, useState, useContext } from 'react';
import Input from '../../../../../../../../input'; // new
import List from '../../../../../../../list-pro';
import Loading from '../../../../../../../../loading'; // new
import { attributeValue } from '../../interfaces';
import InOrNotIn from './InOrNotIn';
import { FilterPickerContext } from '../../../../../../FilterPicker';

interface StringAttrSelectProps {
  // 维度类型
  valueType: attributeValue;
  attrSelect: string;
  // 当属性值变化时回调函数
  attrChange: (v: any) => void;
  // 根据属性值获取对应维度，第一个参数是属性值，第二个参数是搜索关键字
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any> | undefined;
  values: string[];
  exprKey: string;
}

type listOptionsItem = {
  value: string;
  label: string;
};

let timer: any = null;

function StringAttrSelect(props: StringAttrSelectProps) {
  const { textObject: t } = useContext(FilterPickerContext);
  const { attrSelect, valueType, curryDimensionValueRequest, attrChange, values = [], exprKey } = props;
  const [inputValue, setInputValue] = useState<string>(values.join(','));
  const [listOptions, setListOptions] = useState<listOptionsItem[]>([]);
  const [listValue, setListValue] = useState<string>(values.join(','));
  const [loadingStatue, setLoadingStatue] = useState<boolean>(true);
  // let timer: number | any = null;
  useEffect(() => {
    setInputValue(values?.length ? values[0] : '');
    setListValue(values?.[0]);
  }, [values]);

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = v.target;
    setLoadingStatue(true);
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      curryDimensionValueRequest?.(exprKey, value)?.then((res: string[]) => {
        if (res.length) {
          setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
        } else {
          setListOptions([]);
        }
        setLoadingStatue(false);
      });
    }, 500);
    attrChange([v.target.value]);
    setInputValue(v.target.value);
  };

  const changeListValue = (option: listOptionsItem) => {
    if (inputValue === option.label) {
      setInputValue('');
      setListValue('');
      attrChange([' ']);
    } else {
      setInputValue(option.label);
      setListValue(option.label);
      attrChange([option.label]);
    }
  };

  useEffect(() => {
    curryDimensionValueRequest?.(exprKey, '')?.then((res: string[]) => {
      if (res.length) {
        setListOptions(res.map((ele: string) => ({ label: ele, value: ele })));
      } else {
        setListOptions([]);
      }
      setLoadingStatue(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueType, exprKey, attrSelect]);

  switch (attrSelect) {
    case 'in':
    case 'not in':
      return (
        <InOrNotIn
          attrSelect={attrSelect}
          attrChange={attrChange}
          valueType={valueType}
          curryDimensionValueRequest={curryDimensionValueRequest}
          values={values}
          exprKey={exprKey}
        />
      );
    case 'hasValue':
    case 'noValue':
      return null;
    default:
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <Input placeholder={t.pleaseEnter} style={{ width: '100%' }} value={inputValue} onChange={changInputValue} />
          {loadingStatue ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loading />
            </div>
          ) : (
            <List
              stateless
              value={listValue}
              dataSource={listOptions}
              width="100%"
              height={280}
              onClick={changeListValue}
            />
          )}
        </div>
      );
  }
}

export default StringAttrSelect;
