import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {COMPETENT_AUTHORITIES} from '../../mock-data';
import {CompetentAuthority, CompetentAuthorityType} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {map} from 'rxjs/operators';

@Injectable({providedIn: RepositoriesModule})
export class CompetentAuthorityService extends BaseCrud<CompetentAuthority> {
    protected dataSetName = 'competent_authorities';
    protected dataSet$ = of(COMPETENT_AUTHORITIES);

    getByType(type: CompetentAuthorityType): Observable<CompetentAuthority[]> {
        return this.getAll().pipe(
            map(dataSet => dataSet.filter(t => t.type === type))
        );
    }
}
