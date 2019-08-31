import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExtensionTime} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class ExtensionTimeService extends BaseCrud<ExtensionTime> {
    protected dataSetName = 'extension_times';

    getByCaseFile(caseFileId: string): Observable<ExtensionTime[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === caseFileId))
        );
    }
}
