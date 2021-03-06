import {Component, OnInit} from '@angular/core';
import {ModalService} from '../shared/services';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ExtensionTimeEditModalComponent} from './edit/extension-time-edit-modal.component';
import {CaseFile, ExtensionTime} from '../shared/entity';
import {ExtensionTimeHelper, getDateDiff} from '../shared/helpers';
import {CaseFileService, ExtensionTimeService} from '../shared/repositories';

@Component({
    templateUrl: './extension-times.component.html'
})
export class ExtensionTimesComponent implements OnInit {
    caseFileId: string;
    extensionTimes: ExtensionTime[] = [];
    caseFile: CaseFile;

    constructor(private _extensionTimeService: ExtensionTimeService,
                private _caseFileService: CaseFileService,
                private _route: ActivatedRoute,
                private _navController: NavController,
                private _modalService: ModalService) {
    }

    ngOnInit(): void {
        this.caseFileId = this._route.snapshot.paramMap.get('caseFileId');
        this._caseFileService.get(this.caseFileId).subscribe(caseFile => this.caseFile = caseFile);
        this._loadData();
    }

    navToDetail(id: string) {
        this._navController.navigateForward(`extension-times/${id}`);
    }

    async create() {
        const modal = await this._modalService.present(ExtensionTimeEditModalComponent, {
            caseFileId: this.caseFileId
        });
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._extensionTimeService.getByCaseFile(this.caseFileId).subscribe(extensionTimes => {
            this.extensionTimes = extensionTimes;
        });
    }

    remaining(extensionTime: ExtensionTime) {
        return getDateDiff(new Date(), ExtensionTimeHelper.getDurationAddedDate(extensionTime));
    }
}
