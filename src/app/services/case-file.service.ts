import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {BaseCrud} from './base-crud';
import {CASE_FILES} from '../mock-data/case-file.data';
import {CaseFile} from '../entity/case-file';

@Injectable({providedIn: ServicesModule})
export class CaseFileService extends BaseCrud<CaseFile> {
    protected dataSet: CaseFile[] = CASE_FILES;
}
