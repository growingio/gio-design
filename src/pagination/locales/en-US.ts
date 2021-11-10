import enUsFn from './en-US-fn';

export default {
  ariaLabelRows: 'Row selector for pagination navigation',
  ariaLabelTotal: 'Total number of data for pagination navigation',
  ariaLabelFirst: 'Go to first page',
  ariaLabelPrevious: 'Go to previous page',
  ariaLabelPage: (page: number) => `Go to page ${page}`,
  ariaLabelNext: 'Go to next page',
  ariaLabelLast: 'Go to last page',
  ariaLabelJumper: 'Page jumper for pagination navigation',
  ariaLabelNav: 'pagination navigation',
  total: (total: number) => `Total ${total} item(s)`,
  jumpTo: enUsFn.jumpTo,
  rowsPerPage: enUsFn.rowsPerPage,
};
