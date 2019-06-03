import {Injectable} from '@angular/core';
import {ClientUser, Person} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class PersonService extends BaseCrud<Person> {
    protected dataSetName = 'persons';

    static FullName(person: Person | ClientUser) {
        return [person.name, person.middlename, person.lastname].filter(t => t).join(' ');
    }
}
