import moment from 'moment';

export default {
  nextDate: (date, delta) => moment.utc(date).add(delta, 'day').toISOString().substr(0, 10),
  difference: (date1, date2) => moment.utc(date1).diff(moment.utc(date2), 'days')
};
