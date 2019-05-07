import {Injectable} from '@angular/core';
import {Address} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';

@Injectable({providedIn: RepositoriesModule})
export class AddressService extends BaseCrud<Address> {
    protected dataSetName = 'addresses';
}
