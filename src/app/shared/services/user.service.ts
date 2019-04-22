import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {User} from '../entity';
import {BaseCrud} from './base-crud';
import {USERS} from '../../mock-data';

@Injectable({providedIn: ServicesModule})
export class UserService extends BaseCrud<User> {
    protected dataSet: User[] = USERS;
}
