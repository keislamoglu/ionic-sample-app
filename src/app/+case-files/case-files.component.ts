import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CaseFile, CompetentAuthority} from '../shared/entity';
import {CaseFileService, CompetentAuthorityService, ModalService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {zip} from 'rxjs';
import {getGrouped} from '../shared/helpers';

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
    competentAuthorities: CompetentAuthority[] = [];

    constructor(private _caseFileService: CaseFileService,
                private _competentAuthorityService: CompetentAuthorityService,
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

    getCompetentAuthority(competentAuthorityId: string) {
        return this.competentAuthorities.find(t => t.id === competentAuthorityId);
    }

    private _loadData() {
        zip(
            this._competentAuthorityService.getAll(),
            this._caseFileService.getAll()
        ).subscribe(val => {
            [this.competentAuthorities, this.caseFiles] = val;
            const visualCaseFiles = [null, ...this.caseFiles];
            this.groupedCaseFiles = getGrouped(visualCaseFiles, this.itemCountPerRow);
            this._changeDetectorRef.markForCheck();
        });
    }
}
