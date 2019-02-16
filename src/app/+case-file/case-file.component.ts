import {Component, OnInit} from '@angular/core';
import {CaseFile} from '../entity/case-file';
import {CaseFileService} from '../services';
import {ModalController} from '@ionic/angular';
import {CaseFileEditModalComponent} from './edit/case-file-edit-modal.component';
import {ModalOptions} from '@ionic/core';

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
        this._caseFileService.getAll().subscribe(caseFiles => this.caseFiles = caseFiles);
    }

    create() {
        this.presentModal();
    }

    edit(id: string) {
        this.presentModal(id);
    }

    private async presentModal(id?: string) {
        const opts: ModalOptions = {
            component: CaseFileEditModalComponent,
            componentProps: id ? { id } : void 0,
        };
        const modal = await this._modalController.create(opts);
        return await modal.present();
    }
}
