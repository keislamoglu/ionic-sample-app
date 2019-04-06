import {BaseCrud} from './base-crud';
import {Address} from '../entity';
import {ADDRESSES} from '../../mock-data';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';

@Injectable({providedIn: ServicesModule})
export class AddressService extends BaseCrud<Address> {
    protected dataSet: Address[] = ADDRESSES;
}
