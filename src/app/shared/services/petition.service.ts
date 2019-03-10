import {BaseCrud} from './base-crud';
import {Petition} from '../entity';
import {PETITIONS} from '../../mock-data';
import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: ServicesModule})
export class PetitionService extends BaseCrud<Petition> {
    protected dataSet: Petition[] = PETITIONS;

    getByParty(partyId: string): Observable<Petition[]> {
        return of(this.dataSet.filter(t => t.partyId === partyId ));
    }
}
