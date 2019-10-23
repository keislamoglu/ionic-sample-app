import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Petition} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class PetitionService extends BaseCrud<Petition> {
    protected dataSetName = 'petitions';

    getByCaseFile(caseFileId: string): Observable<Petition[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === caseFileId))
        );
    }
}
