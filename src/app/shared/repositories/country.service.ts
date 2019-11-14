import {Injectable} from '@angular/core';
import {COUNTRIES} from '../constants';
import {Country} from '../entity';
import {BaseCrud} from './base-crud';
import {of} from 'rxjs';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class CountryService extends BaseCrud<Country> {
    protected dataSetName = 'cities';
    protected dataSet$ = of(COUNTRIES);
}
