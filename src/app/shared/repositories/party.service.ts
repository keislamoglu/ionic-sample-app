import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {PARTIES} from '../../mock-data';
import {Party} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class PartyService extends BaseCrud<Party> {
    protected dataSetName = 'parties';
    protected dataSet$ = of(PARTIES);

    getByCaseFile(id: string): Observable<Party[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === id))
        );
    }
}
