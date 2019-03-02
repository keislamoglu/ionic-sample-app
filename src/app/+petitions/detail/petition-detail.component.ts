import {Component, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from '../edit/petition-edit-modal.component';
import {Petition, ProsecutionOffice} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {DocxFileService, PetitionService, ProsecutionOfficeService} from '../../shared/services';
import {switchMap} from 'rxjs/operators';
import {ModalService} from '../../shared/services/modal.service';

@Component({
    templateUrl: './petition-detail.component.html'
})
export class PetitionDetailComponent implements OnInit {
    id: string;
    petition: Petition;
    prosecutionOffice: ProsecutionOffice;

    constructor(private _petitionService: PetitionService,
                private _prosecutionOfficeService: ProsecutionOfficeService,
                private _modalService: ModalService,
                private _route: ActivatedRoute,
                private _docxFileService: DocxFileService) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    openDocx() {
        this._docxFileService.open(this.petition.fileName);
    }

    async edit() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id: this.id});
        await modal.onWillDismiss();
        this._loadData();
    }

    private _loadData() {
        this._petitionService.get(this.id)
            .pipe(
                switchMap(petition => {
                    this.petition = petition;
                    return this._prosecutionOfficeService.get(petition.prosecutionOfficeId);
                })
            )
            .subscribe(prosecutionOffice => this.prosecutionOffice = prosecutionOffice);
    }
}
