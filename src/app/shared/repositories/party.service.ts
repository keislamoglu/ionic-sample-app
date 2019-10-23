import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Party} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map, switchMap} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {PersonService} from './person.service';
import {fullName} from '../helpers';

@Injectable({providedIn: RepositoriesModule})
export class PartyService extends BaseCrud<Party> {
    protected dataSetName = 'parties';

    constructor(protected storage: Storage, private personService: PersonService) {
        super(storage);
    }

    getByCaseFile(id: string): Observable<Party[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.caseFileId === id))
        );
    }

    getPersonName(id: string): Observable<string> {
        return this.get(id).pipe(
            switchMap(party => this.personService.get(party.personId)),
            map(person => fullName(person))
        );
    }
}
