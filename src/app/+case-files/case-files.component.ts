import {Component, OnInit} from '@angular/core';
import {CaseFile, CompetentAuthority} from '../shared/entity';
import {CaseFileService, CompetentAuthorityService, ModalService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {zip} from 'rxjs';

@Component({
    selector: 'case-file',
    templateUrl: './case-files.component.html'
})
export class CaseFilesComponent implements OnInit {
    caseFiles: CaseFile[] = [];
    competentAuthorities: CompetentAuthority[] = [];

    constructor(private _caseFileService: CaseFileService,
                private _competentAuthorityService: CompetentAuthorityService,
                private _navController: NavController,
                private _modalService: ModalService) {
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
        });
    }
}
