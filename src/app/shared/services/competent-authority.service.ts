import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {CompetentAuthority, CompetentAuthorityType} from '../entity';
import {BaseCrud} from './base-crud';
import {COMPETENT_AUTHORITIES} from '../../mock-data';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: ServicesModule})
export class CompetentAuthorityService extends BaseCrud<CompetentAuthority> {
    protected dataSet: CompetentAuthority[] = COMPETENT_AUTHORITIES;

    getByType(type: CompetentAuthorityType): Observable<CompetentAuthority[]> {
        return of(this.dataSet.filter(t => t.type === type));
    }
}
