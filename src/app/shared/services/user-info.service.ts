import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {UserInfo} from '../entity';
import {BaseCrud} from './base-crud';
import {USER_INFOS} from '../../mock-data';

@Injectable({providedIn: ServicesModule})
export class UserInfoService extends BaseCrud<UserInfo> {
    protected dataSet: UserInfo[] = USER_INFOS;
}
