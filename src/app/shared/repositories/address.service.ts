import {Injectable} from '@angular/core';
import {Address} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {ADDRESSES} from '../../mock-data';
import {of} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class AddressService extends BaseCrud<Address> {
    protected dataSetName = 'addresses';
    protected dataSet$ = of(ADDRESSES);
}
