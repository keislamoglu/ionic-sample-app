import {BaseCrud} from './base-crud';
import {City} from '../entity';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {CITIES} from '../../mock-data';

@Injectable({providedIn: ServicesModule})
export class CityService extends BaseCrud<City> {
    protected dataSet: City[] = CITIES;
}
