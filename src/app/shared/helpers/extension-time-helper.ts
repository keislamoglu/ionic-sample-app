import {CaseFile, ExtensionTime} from '../entity';
import {getDateDiff} from './date-helper';

export class ExtensionTimeHelper {
    static calculateRemainingTime(caseFile: CaseFile, extensions: ExtensionTime[]) {
        let remainingTime = 0;
        const now = new Date();
        const destDate = new Date(caseFile.conciliationStartDate);
        destDate.setDate(destDate.getDate() + 30); // discount from 30 days
        const dateDiff = getDateDiff(now, destDate);

        if (dateDiff > 0) {
            remainingTime = dateDiff;
        } else {
            const ext = this.getNotPassedOne(extensions);
            if (ext) {
                remainingTime = getDateDiff(now, this.getDurationAddedDate(ext));
            }
        }

        return remainingTime;
    }

    static getDurationAddedDate(extensionTime: ExtensionTime) {
        const date = new Date(extensionTime.date);
        date.setDate(date.getDate() + extensionTime.duration);
        return date;
    }

    static getNotPassedOne(extensionTimes: ExtensionTime[]) {
        const now = new Date();
        const [notPassed] = extensionTimes.filter(t => {
            return this.getDurationAddedDate(t).getTime() - now.getTime() > 0;
        });

        return notPassed || null;
    }
}
