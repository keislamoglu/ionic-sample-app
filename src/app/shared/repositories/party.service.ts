import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Party} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class PartyService extends BaseCrud<Party> {
    protected dataSetName = 'parties';

    getByCaseFile(id: string): Observable<Party[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === id))
        );
    }
}
