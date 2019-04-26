import {Injectable} from '@angular/core';
import {CASE_FILES} from '../../mock-data';
import {CaseFile} from '../entity';
import {BaseCrud} from './base-crud';
import {RepositoriesModule} from './repositories.module';
import {of} from 'rxjs';

@Injectable({providedIn: RepositoriesModule})
export class CaseFileService extends BaseCrud<CaseFile> {
    protected dataSetName = 'case_files';
    // protected dataSet$ = of(CASE_FILES);
}
