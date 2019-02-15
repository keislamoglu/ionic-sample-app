import {Injectable} from '@angular/core';
import {ServicesModule} from './services.module';
import {Observable, of} from 'rxjs';
import {CaseFile} from '../entity/case-file';
import {CASE_FILES} from '../mock-data/case-file.data';

@Injectable({providedIn: ServicesModule})
export class CaseFileService {
    getFiles(): Observable<CaseFile[]> {
        return of(CASE_FILES);
    }

    addFile(param: { fileNo: string }): Observable<void> {
        CASE_FILES.push({id: '4', fileNo: param.fileNo});
        return of(void 0);
    }
}
