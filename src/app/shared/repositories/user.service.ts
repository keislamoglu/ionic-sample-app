import {Injectable} from '@angular/core';
import {User} from '../entity';
import {BaseCrud} from './base-crud';
import {USERS} from '../../mock-data';
import {RepositoriesModule} from './repositories.module';
import {of} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class UserService extends BaseCrud<User> {
    protected dataSetName = 'users';
    protected dataSet$ = of(USERS);
}
