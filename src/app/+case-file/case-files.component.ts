import {Component, OnInit} from '@angular/core';
import {CaseFile} from '../entity/case-file';
import {CaseFileService} from '../services';
import {ModalController, NavController} from '@ionic/angular';
import {CaseFileModalComponent} from './case-file/case-file-modal.component';
import {ModalOptions} from '@ionic/core';

@Component({
    selector: 'case-file',
    templateUrl: './case-files.component.html',
    styleUrls: ['./case-files.component.scss']
})
export class CaseFilesComponent implements OnInit {
    caseFiles: CaseFile[] = [];

    constructor(private _caseFileService: CaseFileService,
                private _modalController: ModalController,
                private _navController: NavController) {
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

    navPersons() {
        this._navController.navigateForward('/persons');
    }

    navPetitions() {
        this._navController.navigateForward('/petitions');
    }

    private async presentModal(id?: string) {
        const opts: ModalOptions = {
            component: CaseFileModalComponent,
            componentProps: id ? {id} : void 0,
        };
        const modal = await this._modalController.create(opts);
        return await modal.present();
    }
}
