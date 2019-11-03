export function getDateDiff(from: Date, to: Date) {
    const diff = to.getTime() - from.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function printDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString();
}

export function printTime(dateStr: string) {
    const date = new Date(dateStr);
    return `${date.getHours()}:${date.getMinutes()}`;
}
