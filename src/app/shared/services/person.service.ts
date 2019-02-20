import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {Person} from '../entity';
import {BaseCrud} from './base-crud';
import {PERSONS} from '../../mock-data';

@Injectable({providedIn: ServicesModule})
export class PersonService extends BaseCrud<Person> {
    protected dataSet: Person[] = PERSONS;
}
