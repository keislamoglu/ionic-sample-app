import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtensionTime} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class ExtensionTimeService extends BaseCrud<ExtensionTime> {
    protected dataSetName = 'extension_times';

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
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === caseFileId))
        );
    }
}
