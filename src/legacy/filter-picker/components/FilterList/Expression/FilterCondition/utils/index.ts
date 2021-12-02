import moment from 'moment';
import { listFormat } from '../../../../..';
import { TextObject } from '../../../../../FilterPicker';
import { attributeValue } from '../interfaces';

const parseStringValuesToText = (operation: string, value: string[], t: TextObject) => {
  /**
   * string: {
   *   '=': '等于',
   *   '!=': '不等于',
   *   in: '在,范围内',
   *   'not in': '不在,范围内',
   *   like: '包含',
   *   'not like': '不包含',
   *   hasValue: '有值',
   *   noValue: '无值',
   * }
   * STRING: {
   *   '=': '等于',
   *   '!=': '不等于',
   *   in: '在,范围内',
   *   'not in': '不在,范围内',
   *   like: '包含',
   *   'not like': '不包含',
   * }
   */
  switch (operation) {
    // 判断当op ： ”=“ 时，是否为无值状态，如果无值，返回’有值’
    case '=': {
      if (value[0] === ' ') {
        return t.noValue;
      }
      return `${t['=']} ${value[0]}`;
    }
    // 判断当op ： ”！=“ 时，是否为有值状态，如果有值，返回’无值‘
    case '!=': {
      if (value[0] === ' ') {
        return t.hasValue;
      }
      return `${t['!=']} ${value[0]}`;
    }

    case 'in':
      return t.in(listFormat(value, t.code));
    case 'not in':
      return t.notIn(listFormat(value, t.code));
    case 'like':
      return `${t.like} ${value[0]}`;
    case 'not like':
      return `${t.notLike} ${value[0]}`;
    case 'hasValue':
    case 'noValue':
      return `${t[operation]} ${value[0]}`;
    default:
      return value[0];
  }
};

const parseIntValuesToText = (operation: string, value: string[], t: TextObject) => {
  /**
   * int: {
   *   '=': '等于',
   *   '!=': '不等于',
   *   '>': '大于',
   *   '>=': '大于等于',
   *   '<': '小于',
   *   '<=': '小于等于',
   *   between: '在,与,之间',
   *   'not between': '不在,与,之间',
   *   noValue: '无值',
   *   hasValue: '有值',
   * }
   */
  switch (operation) {
    // 判断当op ： ”！=“ 时，是否为有值状态，如果有值，返回’有值‘
    case '!=': {
      if (value[0] === ' ') {
        return t.hasValue;
      }
      return `${t['!=']} ${value[0]}`;
    }
    // 判断当op ： ”=“ 时，是否为无值状态，如果无值，返回’无值‘
    case '=': {
      if (value[0] === ' ') {
        return t.noValue;
      }
      return `${t['=']} ${value[0]}`;
    }
    case '>':
    case '>=':
    case '<':
    case '<=':
      return `${t[operation]} ${value[0]}`;
    case 'between':
      return t.between(listFormat(value, t.code));
    case 'not between': {
      return t.notBetween(listFormat(value, t.code));
    }
    case 'hasValue':
    case 'noValue':
      return `${t[operation]} ${value[0]}`;
    default:
      return value[0];
  }
};

const parseDateValuesRelativeToText = (relativeTime: number[], t: TextObject) => {
  if (relativeTime.length === 1) {
    const day = relativeTime[0];
    if (day < 0) {
      // 过去 xxx 天前
      return t.beforeThePast(Math.abs(day));
    }
    // 未来 xxx 天后
    return t.afterTheNext(Math.abs(day));
  }
  if (relativeTime.includes(0)) {
    if (relativeTime[0]) {
      if (relativeTime[0] < 0) {
        // 过去 xxx 天前
        return t.withinThePast(Math.abs(relativeTime[0]));
      }
      // 未来 xxx 天之内
      return t.withinTheNext(Math.abs(relativeTime[0]));
    }
    if (relativeTime[1] < 0) {
      // 过去 xxx 天前
      return t.withinThePast(Math.abs(relativeTime[0]));
    }
    // 未来 xxx 天之内
    return t.withinTheNext(Math.abs(relativeTime[0]));
  }
  if (relativeTime[0] < 0) {
    // 过去 xxx 天至 xxx 天之内
    return t.withinThePast(`${Math.abs(relativeTime[0])} ${t.to} ${Math.abs(relativeTime[1])}`);
  }
  // 未来 xxx 天至 xxx 天之内
  return t.withinTheNext(`${Math.abs(relativeTime[0])} ${t.to} ${Math.abs(relativeTime[1])}`);
};

const parseDateValuesToText = (operation: string, value: string[], t: TextObject) => {
  /**
   * date: {
   *   '=': '等于',
   *   '!=': '不等于',
   *   '>': '在,天之后',
   *   '>=': '在,天之后包括当天',
   *   '<': '在,天之前',
   *   '<=': '在,天之前包括当天',
   *   between: '在,与,之间',
   *   'not between': '不在,与,之间',
   *   relativeCurrent: '相对现在',
   *   relativeBetween: '相对区间',
   *   hasValue: '有值',
   * }
   */
  switch (operation) {
    case '!=': {
      if (value[0] === ' ') {
        return t.hasValue;
      }
      return `${t['!=']} ${moment(parseInt(value[0], 10)).format('YYYY-MM-DD')}`;
    }
    case '=': {
      if (value[0] === ' ') {
        return t.noValue;
      }
      return `${t['=']} ${moment(parseInt(value[0], 10)).format('YYYY-MM-DD')}`;
    }
    case '>':
      // 在 xxx 天之后
      return t.somedayAfter(moment(parseInt(value[0], 10)).format('YYYY-MM-DD'));
    case '>=':
      // 在 xxx 天之后包括当天
      return t.somedayAfterInclude(moment(parseInt(value[0], 10)).format('YYYY-MM-DD'));
    case '<':
      // 在 xxx 天之前
      return t.somedayAgo(moment(parseInt(value[0], 10)).format('YYYY-MM-DD'));
    // 在 xxx 天之前包括当天
    case '<=':
      return t.somedayAgoInclude(moment(parseInt(value[0], 10)).format('YYYY-MM-DD'));
    // 判断，在。。。与。。。之间
    // 返回字符串 ---- ‘在（date1）与（data2）之间’
    case 'between':
      if (value[0].includes('abs')) {
        const abs = value?.[0].split(':')[1].split(',');
        return t.between(
          listFormat(
            [moment(parseInt(abs[0], 10)).format('YYYY-MM-DD'), moment(parseInt(abs[1], 10)).format('YYYY-MM-DD')],
            t.code
          )
        );
      }
      return '';
    case 'not between': {
      if (value[0].includes('abs')) {
        const abs = value?.[0].split(':')[1].split(',');
        return t.notBetween(
          listFormat(
            [moment(parseInt(abs[0], 10)).format('YYYY-MM-DD'), moment(parseInt(abs[1], 10)).format('YYYY-MM-DD')],
            t.code
          )
        );
      }
      return '';
    }
    case 'relativeTime': {
      const relativeTime = value[0]
        .split(':')[1]
        .split(',')
        .map((ele: string) => parseInt(ele, 10));
      return parseDateValuesRelativeToText(relativeTime, t);
    }
    case 'hasValue':
      return `${t.hasValue} moment(value[0]).format('YYYY-MM-DD')`;
    default:
      return moment(value[0]).format('YYYY-MM-DD');
  }
};

// 对NumberAttrSelect，StringAttrSelect，DateAttrSelect返回的values值进行转换,生成属性选择框的属性规则展示文本
export default function parseValuesToText(
  type: attributeValue,
  operation: string,
  value: string[],
  t: TextObject
): string {
  if (value.length && !!value?.[0]) {
    if (type === 'string' || type === 'STRING') {
      // 字符串类型
      return parseStringValuesToText(operation, value, t);
    }
    if (type === 'int') {
      return parseIntValuesToText(operation, value, t);
    }
    if (type === 'date') {
      return parseDateValuesToText(operation, value, t);
    }
  }
  return t.selectFilter;
}
