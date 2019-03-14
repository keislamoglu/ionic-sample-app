import {Component, OnInit} from '@angular/core';
import {CaseFile, CompetentAuthority} from '../shared/entity';
import {CaseFileService, CompetentAuthorityService, ModalService} from '../shared/services';
import {NavController} from '@ionic/angular';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {PersonEditModalComponent} from '../+persons/edit/person-edit-modal.component';
import {zip} from 'rxjs';

@Component({
    selector: 'case-file',
    templateUrl: './case-files.component.html'
})
export class CaseFilesComponent implements OnInit {
    caseFiles: CaseFile[] = [];
    competentAuthoritites: CompetentAuthority[] = [];

    constructor(private _caseFileService: CaseFileService,
                private _competentAuthorityService: CompetentAuthorityService,
                private _navController: NavController,
                private _modalService: ModalService) {
    }

    ngOnInit(): void {
        this._loadData();
    }

    newPerson() {
        this._modalService.present(PersonEditModalComponent);
    }

    async create() {
        const modal = await this._modalService.present(CaseFileEditModalComponent);
        await modal.onWillDismiss();
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`case-files/${id}`);
    }

    navToAllPersons() {
        this._navController.navigateForward('/persons');
    }

    getCompetentAuthority(competentAuthorityId: string) {
        return this.competentAuthoritites.find(t => t.id === competentAuthorityId);
    }

    private _loadData() {
        zip(
            this._competentAuthorityService.getAll(),
            this._caseFileService.getAll()
        ).subscribe(val => {
            [this.competentAuthoritites, this.caseFiles] = val;
        });
    }
}
