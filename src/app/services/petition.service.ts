import {BaseCrud} from './base-crud';
import {Petition} from '../entity/petition';
import {PETITIONS} from '../mock-data/petition.data';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';

@Injectable({providedIn: ServicesModule})
export class PetitionService extends BaseCrud<Petition> {
    protected dataSet: Petition[] = PETITIONS;
}
