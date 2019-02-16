import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {Person} from '../entity/person';
import {BaseCrud} from './base-crud';
import {PERSONS} from '../mock-data/person.data';

@Injectable({providedIn: ServicesModule})
export class PersonService extends BaseCrud<Person> {
    protected dataSet: Person[] = PERSONS;
}
