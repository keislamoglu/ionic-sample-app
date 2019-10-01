import {Injectable} from '@angular/core';
import {Person} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class PersonService extends BaseCrud<Person> {
    protected dataSetName = 'persons';
}
