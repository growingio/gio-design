import zhCnFn from './zh-CN-fn';

export default {
  ariaLabelRows: '分页导航的行数选择器',
  ariaLabelTotal: '分页导航的数据总数',
  ariaLabelFirst: '转到第一页',
  ariaLabelPrevious: '转到上一页',
  ariaLabelPage: (page: number) => `转到第 ${page} 页`,
  ariaLabelNext: '转到下一页',
  ariaLabelLast: '转到最后一页',
  ariaLabelJumper: '分页导航的页码跳转器',
  ariaLabelNav: '分页导航',
  total: (total: number) => `总共 ${total} 条`,
  jumpTo: zhCnFn.jumpTo,
  rowsPerPage: zhCnFn.rowsPerPage,
};
