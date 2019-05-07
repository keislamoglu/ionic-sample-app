import {Injectable} from '@angular/core';
import {User} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class UserService extends BaseCrud<User> {
    protected dataSetName = 'users';
}
