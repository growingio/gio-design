import React, { useContext, useEffect, useState } from 'react';
import { Input, Loading } from '../../../../../../../..';
import List from '../../../../../../../list-pro';
import { FilterPickerContext } from '../../../../../../FilterPicker';
import { attributeValue } from '../../interfaces';

interface ListAttrSelectProps {
  valueType: attributeValue;
  attrChange: (v: any) => void;
  curryDimensionValueRequest: (dimension: string, keyword: string) => Promise<any> | undefined;
  values: string[];
  exprKey: string;
  attrSelect: string;
}

type checkOptionsItem = {
  value: string;
  label: string;
};

let timer: any = null;

function ListAttrSelect(props: ListAttrSelectProps) {
  const { valueType, curryDimensionValueRequest, attrChange, values = [], exprKey, attrSelect } = props;
  const [inputValue, setInputValue] = useState<string>('');
  const [checkValue, setCheckValue] = useState<string[]>(values);
  const { textObject } = useContext(FilterPickerContext);
  // check-options
  const [checkOptions, setCheckOptions] = useState<checkOptionsItem[]>([]);
  // 存放本次自由输入的值
  const [inputCheckList, setInputCheckList] = useState<string[]>([]);
  // 副本，用来保存values的值，因为values里面包含一部分上次自由输入的值
  // 暂存values的值，用来区分本次自有输入和上次自由输入的值
  const [defaultList, setDefaultList] = useState<string[]>(values);
  const [loadingStatue, setLoadingStatue] = useState<boolean>(true);

  useEffect(() => {
    setCheckValue(values);
    setDefaultList(values);
    // setInputValue(values?.length ? values.join(',') : '');
  }, [values]);

  const changInputValue = (v: React.ChangeEvent<HTMLInputElement>) => {
    // 输入规则为：
    // 当正常输入时，作为搜索关键字，进行查询，返回搜索结果，用户进行选择
    // 当输入最后一个字符为英文逗号时，算自由输入，将用户输入的字符串直接作为选项，展示”自由输入：（string）“并为选中状态
    // 多个英文逗号分隔时，为多个自由输入，展示多条”自由输入：（string)“并选中
    // 当清空输入框内容时，如果有自由输入选项，自由输入选项保留，不清空，并始终保持选中状态，除非用户勾选取消
    const valueList = v.target.value.split(',');
    const filterValueList = valueList.filter((ele: string) => !!ele);
    // 本次输入的自由输入+当前编辑情况下曾经输入过的自由输入记录
    const checkList = Array.from(new Set([...filterValueList, ...inputCheckList]));

    // 当input输入字符串，存在英文逗号时，将字符串以英文逗号为分割点，
    if (valueList.length > 1 && valueList[valueList.length - 1] === '') {
      // 以逗号结尾时，前面的字符作为自由输入的结果
      const res = Array.from(new Set([...checkList, ...checkValue]));
      setInputCheckList(checkList);
      setCheckOptions(
        checkList.map((ele: string) => ({
          label: `${textObject.freeInput}${ele}`,
          value: ele,
        }))
      );
      setCheckValue(res);
      attrChange(res);
    } else {
      setLoadingStatue(true);
      const filterCheckedList: string[] = checkValue.filter((ele: string) => !checkList.includes(ele));

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        curryDimensionValueRequest?.(exprKey, valueList[valueList.length - 1] || '')?.then((res: string[]) => {
          if (res.length) {
            setCheckOptions([
              // 所有的自由输入选项
              ...inputCheckList
                .filter((ele: string) => checkList.includes(ele))
                .map((ele: string) => ({ label: `${textObject.freeInput}${ele}`, value: ele })),
              // 已选中的，过滤掉自由输入的选项
              ...Array.from(new Set([...filterCheckedList, ...res])).map((ele: string) => ({ label: ele, value: ele })),
            ]);
          } else {
            setCheckOptions([
              // 所有的自由输入选项
              ...inputCheckList
                .filter((ele: string) => checkList.includes(ele))
                .map((ele: string) => ({ label: `${textObject.freeInput}${ele}`, value: ele })),
            ]);
          }
          setLoadingStatue(false);
        });
      }, 500);
    }

    setInputValue(v.target.value);
  };

  const changeCheckValue = (checkedValue: checkOptionsItem) => {
    if (!checkValue.includes(checkedValue.value)) {
      setCheckValue([...checkValue, checkedValue.value]);
      attrChange([...checkValue, checkedValue.value]);
    } else {
      const filter = checkValue.filter((ele: string) => ele !== checkedValue.value);
      setCheckValue(filter);
      attrChange(filter);
    }
  };
  // 初始化check-options
  useEffect(() => {
    curryDimensionValueRequest?.(exprKey, '')?.then((res: string[]) => {
      res.length &&
        setCheckOptions(
          Array.from(new Set([...defaultList, ...res])).map((ele: string) => ({
            label: ele,
            value: ele,
          }))
        );
      setLoadingStatue(false);
    });
  }, [valueType, exprKey, attrSelect, curryDimensionValueRequest, defaultList]);

  switch (attrSelect) {
    case 'hasAll':
    case 'not hasAny':
      return (
        <div style={{ height: '330px' }}>
          <Input placeholder={textObject.pleaseEnter} value={inputValue} onChange={changInputValue} style={{width: '100%'}}/>
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
              isMultiple
              stateless
              value={checkValue}
              dataSource={checkOptions}
              width={293}
              height={270}
              onClick={changeCheckValue}
            />
          )}
        </div>
      );

    default:
      return null;
  }
}

export default ListAttrSelect;
