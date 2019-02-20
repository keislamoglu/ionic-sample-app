import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {ProsecutionOffice} from '../entity';
import {BaseCrud} from './base-crud';
import {PROSECUTION_OFFICES} from "../../mock-data";

@Injectable({providedIn: ServicesModule})
export class ProsecutionOfficeService extends BaseCrud<ProsecutionOffice> {
    protected dataSet: ProsecutionOffice[] = PROSECUTION_OFFICES;
}
