import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {AttorneyGeneralship} from '../entity';
import {BaseCrud} from './base-crud';
import {of} from 'rxjs';
import {ATTORNEY_GENERALSHIPS} from '../constants';

@Injectable({providedIn: RepositoriesModule})
export class AttorneyGeneralshipService extends BaseCrud<AttorneyGeneralship> {
    protected dataSetName: 'attorney_generalships';
    protected dataSet$ = of(ATTORNEY_GENERALSHIPS);
}
