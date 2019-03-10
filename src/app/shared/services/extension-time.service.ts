import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {BaseCrud} from './base-crud';
import {ExtensionTime} from '../entity';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: ServicesModule})
export class ExtensionTimeService extends BaseCrud<ExtensionTime> {
    protected dataSet: ExtensionTime[] = [];

    static getNotPassedOne(extensionTimes: ExtensionTime[]): ExtensionTime | null {
        const now = new Date();
        const notPassed = extensionTimes.filter(t => {
            return ExtensionTimeService.getDateWithDuration(t).getTime() - now.getTime() > 0;
        })[0];

        return notPassed || null;
    }

    static getDateWithDuration(extensionTime: ExtensionTime): Date {
        const date = new Date(extensionTime.date);
        date.setDate(date.getDate() + extensionTime.duration);
        return date;
    }

    getByCaseFile(caseFileId: string): Observable<ExtensionTime[]> {
        return of(this.dataSet.filter(t => t.caseFileId === caseFileId));
    }
}
