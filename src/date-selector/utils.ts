import format from 'date-fns/format';
import { DATE_FORMAT } from './constant';

export function formatDate(date: Date, formatString?: string) {
  return format(date, formatString ?? DATE_FORMAT);
}

export default {
  formatDate,
};
