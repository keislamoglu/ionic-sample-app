import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';
import {CaseFile} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';
import {getDateDiff} from '../helpers';
import {ExtensionTimeService} from './extension-time.service';
import {Observable, zip} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class CaseFileService extends BaseCrud<CaseFile> {
    protected dataSetName = 'case_files';

    constructor(private _extensionTimeService: ExtensionTimeService, protected storage: Storage) {
        super(storage);
    }

    getRemainingTime(caseFileId: string): Observable<number> {
        return zip(
            this.get(caseFileId),
            this._extensionTimeService.getByCaseFile(caseFileId)
        ).pipe(
            map(([caseFile, extensionTimes]) => {
                let remainingTime = 0;
                const now = new Date();
                const destDate = new Date(caseFile.conciliationStartDate);
                destDate.setDate(destDate.getDate() + 30); // discount from 30 days
                const dateDiff = getDateDiff(now, destDate);

                if (dateDiff > 0) {
                    remainingTime = dateDiff;
                } else {
                    const ext = ExtensionTimeService.getNotPassedOne(extensionTimes);
                    if (ext) {
                        remainingTime = getDateDiff(now, ExtensionTimeService.getDateWithDuration(ext));
                    }
                }

                return remainingTime;
            })
        );
    }
}
