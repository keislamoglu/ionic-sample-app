import {Injectable} from '@angular/core';
import {CITIES} from '../constants';
import {City} from '../entity';
import {BaseCrud} from './base-crud';
import {of} from 'rxjs';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class CityService extends BaseCrud<City> {
    protected dataSetName = 'cities';
    protected dataSet$ = of(CITIES);
}
