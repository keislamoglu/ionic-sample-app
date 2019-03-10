import {NavController} from '@ionic/angular';
import {Component, OnInit} from '@angular/core';
import {CaseFileService, CompetentAuthorityService, ExtensionTimeService} from '../../shared/services';
import {CaseFile, CompetentAuthority} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {CaseFileEditModalComponent} from '../edit/case-file-edit-modal.component';
import {ModalService} from '../../shared/services/modal.service';
import {switchMap} from 'rxjs/operators';
import {getDateDiff} from '../../shared/helpers';

@Component({
    templateUrl: './case-file-detail.component.html',
})
export class CaseFileDetailComponent implements OnInit {
    id: string;
    caseFile: CaseFile;
    competentAuthority: CompetentAuthority;
    remainingTime = 0;

    constructor(
        private _route: ActivatedRoute,
        private _caseFileService: CaseFileService,
        private _competentAuthorityService: CompetentAuthorityService,
        private _extensionTimeService: ExtensionTimeService,
        private _navController: NavController,
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
        await modal.onWillDismiss();
        this._loadData();
    }

    calculateRemainingTime() {
        this.remainingTime = 0;
        if (!this.caseFile) {
            return;
        }
        const now = new Date();
        const targetDate = new Date(this.caseFile.conciliationStartDate);
        targetDate.setDate(targetDate.getDate() + 30); // Discount from 30 days;
        const dateDiff = getDateDiff(now, targetDate);
        if (dateDiff > 0) {
            this.remainingTime = dateDiff;
            return;
        }

        this._extensionTimeService.getByCaseFile(this.id).subscribe(extensionTimes => {
            const ext = ExtensionTimeService.getNotPassedOne(extensionTimes);
            if (ext) {
                this.remainingTime = getDateDiff(now, ExtensionTimeService.getDateWithDuration(ext));
            }
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
