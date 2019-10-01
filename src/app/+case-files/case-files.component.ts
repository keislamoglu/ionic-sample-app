import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {forkJoin, of, zip} from 'rxjs';
import {CaseFile, CaseFileType} from '../shared/entity';
import {ModalService} from '../shared/services';
import {getGrouped} from '../shared/helpers';
import {AttorneyGeneralshipService, CaseFileService, CourtHouseService} from '../shared/repositories';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'case-file',
    templateUrl: './case-files.component.html',
    styleUrls: ['./case-files.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseFilesComponent implements OnInit {
    itemCountPerRow = 2;
    columnSize = 12 / this.itemCountPerRow;
    groupedCaseFiles: Array<CaseFile[]> = [];
    caseFiles: CaseFile[] = [];
    remainingTimes: Array<{ caseFileId: string, time: number }> = [];

    constructor(private _caseFileService: CaseFileService,
                private _courtHouseService: CourtHouseService,
                private _attorneyGeneralshipService: AttorneyGeneralshipService,
                private _navController: NavController,
                private _modalService: ModalService,
                private _changeDetectorRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this._loadData();
    }

    async create() {
        const modal = await this._modalService.present(CaseFileEditModalComponent);
        await modal.onWillDismiss();
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`case-files/${id}`);
    }

    getCompetentAuthority(caseFile: CaseFile) {
        if (caseFile.type === CaseFileType.Prosecution) {
            return this._courtHouseService.get(caseFile.courtHouseId);
        }

        if (caseFile.type === CaseFileType.Investigation) {
            return this._attorneyGeneralshipService.get(caseFile.attorneyGeneralshipId);
        }
    }

    getRemainingTime(caseFileId: string) {
        return this.remainingTimes.find(t => t.caseFileId === caseFileId).time;
    }

    private _loadData(refreshEvent?) {
        this._caseFileService.getAll().pipe(
            switchMap(caseFiles => {
                const remainingTimes = caseFiles.length > 0
                    ? forkJoin(caseFiles.map(caseFile => this._caseFileService.getRemainingTime(caseFile.id)))
                    : of([]);
                return zip(
                    of(caseFiles),
                    remainingTimes
                );
            })
        ).subscribe(val => {
            let times: number[];
            [this.caseFiles, times] = val;
            this.remainingTimes = times.map((time, index) => ({caseFileId: this.caseFiles[index].id, time}));
            const visualCaseFiles = [null, ...this.caseFiles];
            this.groupedCaseFiles = getGrouped(visualCaseFiles, this.itemCountPerRow);
            if (refreshEvent) {
                refreshEvent.target.complete();
            }
            this.markForCheck();
        });
    }

    private markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
