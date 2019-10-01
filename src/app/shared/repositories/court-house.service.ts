import {BaseCrud} from './base-crud';
import {CourtHouse} from '../entity';
import {Injectable} from '@angular/core';
import {RepositoriesModule} from './repositories.module';
import {of} from 'rxjs';
import {COURT_HOUSES} from '../constants';

@Injectable({providedIn: RepositoriesModule})
export class CourtHouseService extends BaseCrud<CourtHouse> {
    protected dataSetName: 'court_houses';
    protected dataSet$ = of(COURT_HOUSES);
}
