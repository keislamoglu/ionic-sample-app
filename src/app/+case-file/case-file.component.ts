import {Component, OnInit} from '@angular/core';
import {CaseFile} from '../entity/case-file';
import {CaseFileService} from '../services';
import {ModalController} from '@ionic/angular';
import {CaseFileCreateModalComponent} from './create/case-file-create-modal.component';

@Component({
    selector: 'case-file',
    templateUrl: './case-file.component.html',
    styleUrls: ['./case-file.component.scss']
})
export class CaseFileComponent implements OnInit {
    caseFiles: CaseFile[] = [];

    constructor(private _caseFileService: CaseFileService, private _modalController: ModalController) {
    }

    ngOnInit(): void {
        this._caseFileService.getFiles().subscribe(caseFiles => this.caseFiles = caseFiles);
    }

    create() {
        this.presentModal();
    }

    async presentModal() {
        const modal = await this._modalController.create({
            component: CaseFileCreateModalComponent,
        });
        return await modal.present();
    }
}
