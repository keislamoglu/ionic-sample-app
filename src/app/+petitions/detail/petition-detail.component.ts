import {Component, OnInit} from '@angular/core';
import {PetitionEditModalComponent} from '../edit/petition-edit-modal.component';
import {Petition, ProsecutionOffice} from '../../shared/entity';
import {ActivatedRoute} from '@angular/router';
import {PetitionService, ProsecutionOfficeService} from '../../shared/services';
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
                private _route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.id = this._route.snapshot.paramMap.get('id');
        this._loadData();
    }

    exportToDocx() {
        // TODO: Export to docx statements
    }

    async edit() {
        const modal = await this._modalService.present(PetitionEditModalComponent, {id: this.id});
        modal.onWillDismiss();
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
