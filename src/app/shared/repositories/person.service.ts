import {Injectable} from '@angular/core';
import {PERSONS} from '../../mock-data';
import {Person} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {of} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class PersonService extends BaseCrud<Person> {
    protected dataSetName = 'persons';
    protected dataSet$ = of(PERSONS);

    static FullName(person: Person) {
        return [person.name, person.middlename, person.lastname].filter(t => t).join(' ');
    }
}
