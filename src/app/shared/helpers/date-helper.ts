import * as moment from 'moment';

export function getDateDiff(from: Date, to: Date) {
    const diff = to.getTime() - from.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function printDate(dateStr: string) {
    return moment(dateStr).format('L');
}

export function printTime(dateStr: string) {
    return moment(dateStr).format('LT');
}
