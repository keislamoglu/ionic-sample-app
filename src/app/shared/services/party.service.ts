import {BaseCrud} from './base-crud';
import { Injectable } from '@angular/core';
import { Party } from '../entity';
import { ServicesModule } from './services.module';
import { of, Observable } from 'rxjs';
import {PARTIES} from '../../mock-data';

@Injectable({providedIn: ServicesModule})
export class PartyService extends BaseCrud<Party> {
    protected dataSet: Party[] = PARTIES;

    getByCaseFile(id: string): Observable<Party[]> {
        return of(this.dataSet.filter(t => t.caseFileId === id));
    }
}
