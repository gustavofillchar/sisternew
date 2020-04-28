import {format} from 'date-fns';

export function getNowDateFormmated() {
  return format(Date.now(), 'yyyy-MM-dd HH:mm:ss');
}
