import {NavController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {AlertService, ModalService} from '../../shared/services';
import {CaseFile, CompetentAuthority} from '../../shared/entity';
import {CaseFileService, CompetentAuthorityService, ExtensionTimeService} from '../../shared/repositories';
import {CaseFileEditModalComponent} from '../edit/case-file-edit-modal.component';

@Component({
    templateUrl: './case-file-detail.component.html',
})
export class CaseFileDetailComponent implements OnInit {
    id: string;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    remainingTime = 0;
    processing = false;

    constructor(
        private _route: ActivatedRoute,
        private _caseFileService: CaseFileService,
        private _competentAuthorityService: CompetentAuthorityService,
        private _extensionTimeService: ExtensionTimeService,
        private _navController: NavController,
        private _alertService: AlertService,
        private _modalService: ModalService) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    navToParties(): void {
        this._navController.navigateForward(`/case-files/${this.id}/parties`);
    }

    navToExtensionTimes() {
        this._navController.navigateForward(`/case-files/${this.id}/extension-times`);
    }

    async edit() {
        const modal = await this._modalService.present(CaseFileEditModalComponent, {id: this.id});
        const res = await modal.onWillDismiss();
        if (res.data.removed) {
            return this._navController.back();
        }
        this._loadData();
    }

    calculateRemainingTime() {
        if (this.caseFile) {
            this._caseFileService.getRemainingTime(this.caseFile.id).subscribe(remainingTime => {
                this.remainingTime = remainingTime;
            });
        }
    }

    agreementReachedChange({detail: {checked}}) {
        this.caseFile.agreementReached = checked;
        this.processing = true;
        this._caseFileService.update(this.caseFile.id, this.caseFile).subscribe({
            error: () => this._alertService.message({
                message: 'Bir sorun oluştu',
                title: 'Hata'
            }),
            complete: () => this.processing = false
        });
    }

    private _loadData() {
        this._caseFileService.get(this.id).pipe(
            switchMap(caseFile => {
                this.caseFile = caseFile;
                this.calculateRemainingTime();
                return this._competentAuthorityService.get(caseFile.competentAuthorityId);
            }),
        ).subscribe(competentAuthority => this.competentAuthority = competentAuthority);
    }
}
