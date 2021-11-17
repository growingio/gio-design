import moment from 'moment';
import { attributeValue } from '../interfaces';

interface operationMapType {
  string: { [key: string]: string };
  int: { [key: string]: string };
  date: { [key: string]: string };
  STRING: { [key: string]: string };
}

const operationMap: operationMapType = {
  string: {
    '=': '等于',
    '!=': '不等于',
    in: '在,范围内',
    'not in': '不在,范围内',
    like: '包含',
    'not like': '不包含',
    hasValue: '有值',
    noValue: '无值',
  },
  STRING: {
    '=': '等于',
    '!=': '不等于',
    in: '在,范围内',
    'not in': '不在,范围内',
    like: '包含',
    'not like': '不包含',
  },
  int: {
    '=': '等于',
    '!=': '不等于',
    '>': '大于',
    '>=': '大于等于',
    '<': '小于',
    '<=': '小于等于',
    between: '在,与,之间',
    'not between': '不在,与,之间',
    noValue: '无值',
    hasValue: '有值',
  },
  date: {
    '=': '等于',
    '!=': '不等于',
    '>': '在,天之后',
    '>=': '在,天之后包括当天',
    '<': '在,天之前',
    '<=': '在,天之前包括当天',
    between: '在,与,之间',
    'not between': '不在,与,之间',
    relativeCurrent: '相对现在',
    relativeBetween: '相对区间',
    hasValue: '有值',
  },
};

const parseStringValuesToText = (opMap: { [key: string]: string }, operation: string, value: string[]) => {
  switch (operation) {
    // 判断当op ： ”=“ 时，是否为无值状态，如果无值，返回’有值’
    case '=': {
      if (value[0] === ' ') {
        return '无值';
      }
      return opMap[operation] + value[0];
    }
    // 判断当op ： ”！=“ 时，是否为有值状态，如果有值，返回’无值‘
    case '!=': {
      if (value[0] === ' ') {
        return '有值';
      }
      return opMap[operation] + value[0];
    }

    case 'in':
    case 'not in': {
      const textList = opMap[operation].split(',');
      return textList[0] + value.join(',') + textList[1];
    }
    default:
      return opMap[operation] + value[0];
  }
};

const parseIntValuesToText = (opMap: { [key: string]: string }, operation: string, value: string[]) => {
  switch (operation) {
    // 判断当op ： ”！=“ 时，是否为有值状态，如果有值，返回’有值‘
    case '!=': {
      if (value[0] === ' ') {
        return '有值';
      }
      return opMap[operation] + value[0];
    }
    // 判断当op ： ”=“ 时，是否为无值状态，如果无值，返回’无值‘
    case '=': {
      if (value[0] === ' ') {
        return '无值';
      }
      return opMap[operation] + value[0];
    }
    case 'between':
    case 'not between': {
      const textList = opMap[operation].split(',');
      // 返回 ------'在(value1)与(value2)之间'
      return textList[0] + value[0] + textList[1] + value[1] + textList[2];
    }
    default:
      return opMap[operation] + value[0];
  }
};

const parseDateValuesRelativeToText = (relativeTime: number[]) => {
  if (relativeTime.length === 1) {
    const day = relativeTime[0];
    if (day < 0) {
      return `过去${Math.abs(day)}天前`;
    }
    return `未来${Math.abs(day)}天后`;
  }
  if (relativeTime.includes(0)) {
    if (relativeTime[0]) {
      if (relativeTime[0] < 0) {
        return `过去${Math.abs(relativeTime[0])}天内`;
      }
      return `未来${Math.abs(relativeTime[0])}天内`;
    }
    if (relativeTime[1] < 0) {
      return `过去${Math.abs(relativeTime[1])}天内`;
    }
    return `未来${Math.abs(relativeTime[1])}天内`;
  }
  if (relativeTime[0] < 0) {
    return `过去${Math.abs(relativeTime[0])}-${Math.abs(relativeTime[1])}天内`;
  }
  return `未来${Math.abs(relativeTime[0])}-${Math.abs(relativeTime[1])}天内`;
};

const parseDateValuesToText = (opMap: { [key: string]: string }, operation: string, value: string[]) => {
  switch (operation) {
    case '!=': {
      if (value[0] === ' ') {
        return '有值';
      }
      return opMap[operation] + moment(parseInt(value[0], 10)).format('YYYY-MM-DD');
    }
    case '=': {
      if (value[0] === ' ') {
        return '无值';
      }
      return opMap[operation] + moment(parseInt(value[0], 10)).format('YYYY-MM-DD');
    }
    case '>':
    case '>=':
    case '<':
    case '<=': {
      const textList = opMap[operation].split(',');
      return textList[0] + moment(parseInt(value[0], 10)).format('YYYY-MM-DD') + textList[1];
    }
    // 判断，在。。。与。。。之间
    // 返回字符串 ---- ‘在（date1）与（data2）之间’
    case 'between':
    case 'not between': {
      const textList = opMap[operation].split(',');
      if (value[0].includes('abs')) {
        const abs = value?.[0].split(':')[1].split(',');
        return (
          textList[0] +
          moment(parseInt(abs[0], 10)).format('YYYY-MM-DD') +
          textList[1] +
          moment(parseInt(abs[1], 10)).format('YYYY-MM-DD') +
          textList[2]
        );
      }
      break;
    }
    case 'relativeTime': {
      const relativeTime = value[0]
        .split(':')[1]
        .split(',')
        .map((ele: string) => parseInt(ele, 10));
      return parseDateValuesRelativeToText(relativeTime);
    }
    default:
      return opMap[operation] + moment(value[0]).format('YYYY-MM-DD');
  }
  return '';
};

// 对NumberAttrSelect，StringAttrSelect，DateAttrSelect返回的values值进行转换,生成属性选择框的属性规则展示文本
export default function parseValuesToText(type: attributeValue, operation: string, value: string[]): string {
  const opMap = operationMap[type];
  if (value.length && !!value?.[0]) {
    if (type === 'string' || type === 'STRING') {
      // 字符串类型
      return parseStringValuesToText(opMap, operation, value);
    }
    if (type === 'int') {
      return parseIntValuesToText(opMap, operation, value);
    }
    if (type === 'date') {
      return parseDateValuesToText(opMap, operation, value);
    }
  }
  return '选择过滤条件';
}
