import {Component, Input} from '@angular/core';
import {ModalController, NavParams} from '@ionic/angular';
import {CaseFileService} from '../../services';

@Component({
    selector: 'case-file-create-modal',
    templateUrl: './case-file-create-modal.component.html',
    styleUrls: ['./case-file-create-modal.component.scss']
})
export class CaseFileCreateModalComponent {
    fileNo: string;

    constructor(private modalController: ModalController, private _caseFileService: CaseFileService) {
    }

    dismiss() {
        this.modalController.dismiss();
    }

    save() {
        this._caseFileService.addFile({fileNo: this.fileNo}).subscribe(() => {
            this.dismiss();
        });
    }
}
